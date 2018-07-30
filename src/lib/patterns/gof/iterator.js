var Iterator;
export { Iterator };


Iterator = (function () {
  "use strict";

  var
    moduleReference,

    symbolExists = function () {
      return window.hasOwnProperty("Symbol") &&
        window.Symbol.hasOwnProperty("iterator");
    },

    isIterable = function (object) {
      if (object) {
        if (symbolExists() && object[window.Symbol.iterator] ==
          Array.prototype[window.Symbol.iterator]) {
          return true;
        } else {
          if (typeof object == "string" ||
            // convertible to Array by .from method
            typeof object == "object" &&
            object.hasOwnProperty("length")) {
            return true;
          }
        }
      }

        return false;
    },

    setAccessors = function (object) {
      var
        length = Object.keys(object).length,

        accessors = function (length) {
          return {
            get: function () {
              return length;
            },
            set: function () {
              length = Object.keys(object).length;
            }
          };
        };

      Object.defineProperties(object, {
        length: accessors(length)
      });

      // if (symbolExists()) {
      //     Object.defineProperties(object, {
      //         // js iterator protocol
      //         [window.Symbol.iterator]: {
      //             value: function () {
      //                 var
      //                     _iterator = _Iterable.Proxy.new(object);

      //                 return {
      //                     next: function () {
      //                         return {
      //                             value: _iterator.next(),
      //                             done: !_iterator.hasNext()
      //                         };
      //                     }
      //                 };
      //             }
      //         }
      //     });
      // }
    },

    parse = function (collection) {
      var
        newObject = {};

      Object.assign(newObject, collection);
      setAccessors(newObject);

      return newObject;
    },

    toIterable = function (collection) {
      if (!isIterable(collection)) {
        setAccessors(collection);
      }
    };

  Object.defineProperties(window, {
    Iterator: {
      value: {}
    }
  });

  moduleReference = window.Iterator;

  Object.defineProperties(moduleReference, {
    symbolExists: {
      value: function () {
        return symbolExists();
      }
    },

    isIterable: {
      value: function (object) {
        return isIterable(object);
      }
    },

    parse: {
      value: function (collection) {
        return parse(collection);
      }
    },

    toIterable: {
      value: function (collection) {
        toIterable(collection);
      }
    }
  });

  return moduleReference;

}());

import './iterator/proxy.js';
