// var
//     Flyweight;


(function ($) {
  "use strict";

  Object.defineProperties($.prototype, {

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
