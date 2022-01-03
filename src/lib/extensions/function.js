// var
//     Flyweight;


(function ($) {
  "use strict";

  Object.defineProperties($.prototype, {

    buildConstructor: {
      value: function (args) {
        // this won't be more necessary with Ecam Script 6
        if (!(args instanceof Array)) {
          args = Array.from(args);
        }

        // "bind" is a instance method of Function. It creates a new
        // function for be called after.
        // Apply calls the bind method
        return $.prototype.bind.apply(this, [null].concat(args)
                                          .flatten());
      }
    },

    mixInFrom: {
      
      value: function (classReferences) {

        var
          self = this,
          // mixins make sense when interface statement doesn’t exist in weakly typed languages
          classCollection = Array.from(arguments),

          copyPropertiesFrom = function (reference) {
            var
              defaultProperties = ["length", "name", "arguments", "caller", "prototype"];

            if (reference instanceof Function) {
              // caller it to predefine static members
              reference();
              reference.call(self.prototype);
            }
            Object.getOwnPropertyNames(reference).forEach(function (p) {
              if (!defaultProperties.includes(p) &&
                !self.hasOwnProperty(p)) {
                self[p] = reference[p];
              }
            });
          };

        classCollection.forEach(function (c) {
          copyPropertiesFrom(c);
          if (c.hasOwnProperty("new") &&
            typeof c.new == "function") {
            copyPropertiesFrom(c.new);
          }
        });
      }
    }

  });

}(Function));
