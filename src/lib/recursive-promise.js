// Follows JavaScript style guide

// IIFE
var RecursivePromise;
export { RecursivePromise };


RecursivePromise = (function () {
  "use strict";

  var
    // private static members. They are static because they are out constructor (closure)
    ConstructorReference;

  // constructor
  window.RecursivePromise = function RecursivePromise(options, resolver) {
    var
      _responseData,
      _accomplish,
      _then,
      _reject,
      status,
      promise,
      currentTimeout,
      start,
      self = this,

      resolveArguments = function () {
        if (!options || typeof options == "function") {
          resolver = options;
          options = {};
        }

        if (typeof options.defer != 'number') {
          options.defer = 0;
        }
      },

      accomplish = function (data) {
        status = "fulfilled";
        _responseData = data;
      },

      restart = start = function () {
        currentTimeout = window.setTimeout(
          function () {
            // returns the control for the user
            if (typeof resolver == 'function') {
              resolver.call(self, accomplish);
            }
            switch (status) {
              case "fulfilled": {
                _accomplish(_responseData);
              } break;
              default: {
                restart(resolver, options);
              }
            }
          }, options.defer
        );
      },

      prepare = function () {
        // Asynchronous processment
        promise = new window.Promise(
          function (accomplish, reject) {
            // pass to call from other place
            _accomplish = accomplish;
            _reject = reject;
          }
        );

        promise.then(
          function (data) {
            _then(data);
          },
          function (data) {
            _then(data);
          }
        );
      };

    // public methods
    // for to do magic method, but needs to know who call to mix or extends, or...
    this["promise"] = function () {
      // to work with async functions
      return promise;
    };

    this.accomplish = function (data) {
      accomplish(data);
      return self;
    };

    this.reject = function (data, defer) {
      if (!defer || typeof defer != 'number') {
        defer = 0;
      }

      setTimeout(function () {
        clearTimeout(currentTimeout);
        _reject(data);
      }, defer);

      return self;
    };

    this.watch = function (callback) {
      _then = callback;
      start();
      return self;
    };

    this.catchException = function (callback) {
      if (typeof callback != "function") {
        callback = function () { };
      }

      promise.catch(callback);

      return self;
    };

    if (this instanceof ConstructorReference) {
      resolveArguments();
      prepare();
    }

  };

  ConstructorReference = window.RecursivePromise;

  // static public members(properties)
  Object.defineProperties(ConstructorReference, {
    // proxy constructor
    new: {
      value: function (options, resolver) {
        return new ConstructorReference(options, resolver);
      }
    }
  });

  ConstructorReference.new.prototype.constructor = ConstructorReference;

  return ConstructorReference;

}());
