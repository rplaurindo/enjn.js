var Structure;
export { Structure };

import { Search } from './search.js';


Structure = (function () {
  "use strict";

  var
    ConstructorReference,
    staticPropertyDescriptors = {
      enumerable: true
    };

  window.Structure = function Structure (body) {

    this.assignTo = function (constant, final) {
      var
        context,
        strategy,
        contextPropertyDescriptors,
        verbose = false,
        propertyDescriptors = {
          enumerable: true
        },

        resolveArguments = function () {
          if (typeof final != "boolean") {
            final = false;
          }
        },

        // create or mount the namespace. If there is path and object type is an Object, but it doesn't exists, it will be created, else it will be mounted.
        composePath = function (originalConstant, name, path) {
          var
            context = originalConstant,

            callback = function (v) {
              if (!context[v]) {
                context[v] = {};
              }

              context = context[v];
            },

            isAnAccessor = function (name, path) {
              return (name == "get" || name == "set") &&
                path.length;
            };

          if ((path.length &&
            !isAnAccessor(name, path)) ||
            name != "get" && name != "set") {

            path.forEach(callback);
          }

          return context;
        },

        informeIf = function (verbose) {
          if (verbose) {
            console.warn("Property \"" + name +
              "\" of class \"" +
              Object.className(context) +
              "\" can't be redefined because " +
              "it's configured as read-only.");
          }
        },

        hasAnyAccessor = function (contextBody) {
          return Object.implementsMethod(contextBody, "get") ||
            Object.implementsMethod(contextBody, "set");
        },

        callback = function (contextBody, name, path) {

          if (!Object.belongsToClass(contextBody, Object) ||
            // otherwise it will arrive there still
            Object.empty(contextBody) ||
            hasAnyAccessor(contextBody)) {

            context = composePath(constant, name, path);

            if (Object.belongsToClass(contextBody, Object)) {
              if (hasAnyAccessor(contextBody)) {
                // doesn't make sense has a setter and writable true
                propertyDescriptors.get = contextBody.get || function () { };
                propertyDescriptors.set = contextBody.set || function () { };
              } else {
                if (Object.empty(contextBody)) {
                  propertyDescriptors.value = {};
                }
              }
            } else {
              if (typeof contextBody == "function") {
                delete propertyDescriptors.enumerable;

                if (!final) {
                  propertyDescriptors.writable = true;
                }
              }

              propertyDescriptors.value = contextBody;
            }

            try {
              contextPropertyDescriptors = Object.getOwnPropertyDescriptor(context, name);
              if (!contextPropertyDescriptors ||
                  (contextPropertyDescriptors.hasOwnProperty("writable") &&
                  contextPropertyDescriptors.writable)) {
                Object.defineProperty(context, name, propertyDescriptors);
              }
            } catch (e) {
              informeIf(verbose);
            }

            // restart propertyDescriptors
            propertyDescriptors = {
              enumerable: true
            };
          }

        };

      resolveArguments();

      strategy = Search.Context.new(Search.Graphs.BFS.Object.new(body));
      strategy.research(callback);

      if (final) {
        Object.seal(constant);
        Object.seal(constant.prototype);
      }

    };

  };

  ConstructorReference = window.Structure;

  Object.defineProperties(ConstructorReference, {
    new: {
      value: function (body) {
        return new ConstructorReference(body);
      },
      staticPropertyDescriptors
    }
  });

  ConstructorReference.new.prototype.constructor = ConstructorReference;

  return ConstructorReference;

}());
