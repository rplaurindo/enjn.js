import { Iterator } from '../patterns/gof/iterator.js';


(function ($) {
  "use strict";

  $.defineProperties($, {

    areEquivalents: {
      value: function (object1, object2) {
        var
          object1Attributes,
          object2Attributes,
          object1Methods,
          object2Methods,
          object1AttributeValue,
          object2AttributeValue,
          iterator,
          amount = 0,
          primitiveTypes =
            /(number|string|boolean|null|undefined|symbol)/,

          callback = function (attribute) {
            object1AttributeValue = object1[attribute];
            object2AttributeValue = object2[attribute];

            if ($.belongToSameClass(object1AttributeValue,
                object2AttributeValue)) {
              if (typeof object1AttributeValue == "object") {
                // recursivity
                if ($.areEquivalents(object1AttributeValue,
                  object2AttributeValue)) {
                  amount += 1;
                }
              } else if (object1AttributeValue == object2AttributeValue) {
                amount += 1;
              }
            }
          };

        if (object1 === object2) {
          return true;
        } else if ($.belongToSameClass(object1, object2)) {
          if (typeof object1 == "object") {
            if (object1 instanceof Node) {
              if (object1.isEqualNode(object2)) {
                return true;
              }
            } else {
              object1Attributes = $.properties(object1);
              object2Attributes = $.properties(object2);
              object1Methods = $.methods(object1);
              object2Methods = $.methods(object2);

              // if doesn't have attributes
              if (!object1Attributes.length) {
                if (object1Methods.length == object2Methods.length &&
                  // recursivity
                  $.areEquivalents(object1Methods, object2Methods)) {
                  return true;
                }
              } else if (object1Attributes.length ==
                         object2Attributes.length) {

                iterator = Iterator.Proxy.new(object1Attributes);
                iterator.each(callback);

                return amount == object1Attributes.length;
              }
            }
          } else {
            if (primitiveTypes.test(typeof object1)) {
              return object1 === object2;
            }
          }
        }

        return false;
      }
    },

    isEmpty: {
      value: function (object) {
        return $.amount(object) === 0;
      }
    },

    hasSome: {
      value: function (object) {
        return !$.isEmpty(object);
      }
    },

    className: {
      value: function (object) {
        var
          pattern = /[a-zA-Z$_][^\]]+/g,
          string = $.prototype.toString.call(object);

        if (typeof object == "object" &&
          $.implementsMethod(object, "toString")) {
          // if implements, then calls it
          string = object.toString();
        }

        return pattern.exec(string)[0].split(" ")[1];
      }
    },

    belongsToClass: {
      value: function (objects, classFunction) {
        var
          iterator,
          argumentsAsArray = Array.from(arguments),
          amount = 0,

          callback = function (object) {
            if (Reflect.constructorForName($.className(object)) == classFunction) {
              amount++;
            }
          };

        classFunction = argumentsAsArray.last();
        argumentsAsArray.pop();

        iterator = Iterator.Proxy.new(argumentsAsArray);
        iterator.each(callback);

        return amount == argumentsAsArray.length;
      }
    },

    hasAttribute: {
      value: function (object, attributeName) {
        return $.properties(object, true).includes(attributeName);
      }
    },

    implementsMethod: {
      value: function (object, methodName) {
        return $.methods(object).includes(methodName);
      }
    },

    clone: {
      value: function (object, includeNonEnumerable) {
        if (typeof includeNonEnumerable != "boolean") {
          includeNonEnumerable = true;
        }

        var
          clone = {},
          properties = $.getOwnPropertyNames(object),

          callback = function (p) {
            clone[p] = object[p];
          };

        if (!includeNonEnumerable) {
          return $.assign(clone, object);
        }

        try {
          properties.forEach(callback);
        } catch(e) {}

        return clone;
      }
    },

    uniq: {
      value: function (object) {
        var
          callback = function (reduced, value) {
            if (!$.indexOf(reduced, value)) {
              reduced.push(value);
            }
            return reduced;
          };

        return $.values(object).reduce(callback, []);
      }
    },

    firstKey: {
      value: function (object) {
        var
          keys = $.keys(object);

        return keys[0];
      }
    },

    lastKey: {
      value: function (object) {
        var
          keys = $.keys(object);

        return keys[keys.length - 1];
      }
    },

    normalizedAsLowerCase: {
      value: function (object) {
        var
          iterator,
          attributes = $.properties(properties         clone = {},

          callback = function (v, k) {
            if (typeof v == "string") {
              clone[k] = v.toLowerCase();
            }
          };

        $.assign(clone, object);
        object.length = attributes.length;
        iterator = Iterator.Proxy.new(clone);

        iterator.each(callback);

        return clone;
      }
    },

    asCountableLiteral: {
      value: function (collection) {
        return Iterator.parse(collection);
      }
    },

    // The keys of associative arrays in JS only can be of integer or string kind. The associations that keys are of Integer kind, the items is sorted according the keys (works as HashSet of the Java); the associations that keys are String kind, works as LinkedHashMap, it implements a associative array and maintains the order of entrance on iterate.
    // TreeMap implements a structure based red-black tree (binary search).
    indexOf: {
      value: function (object, value, startingIndex) {

        var
          key,
          iterator,
          item,
          properties = $.keys(object),

          callback = function (p) {
            item = object[p];

            if (typeof item == "function") {
              if (item == comparator) {
                key = p;
                this.finalize();
              }
            } else {
              if (item === undefined) {
                console.warn("Item " + p + " is undefined!");
              }

              if ($.areEquivalents(item, value)) {
                key = p;
                this.finalize();
              }
            }
          };

        iterator = Iterator.Proxy.new(properties);
        iterator.each(callback, startingIndex || "0");

        if (key) {
          return key;
        }

        return undefined;
      }
    },

    amountOf: {
      value: function (object, item) {

        var
          values,
          amount = 0,
          i = 0;

        if (item || typeof item == "number") {
          values = $.values(object);
          while (true) {
            i = $.indexOf(object, item, i);
            if (i > -1) {
              amount++;
              if (++i == values.length) {
                break;
              }
            } else {
              break;
            }
          }
        } else {
          amount = $.keys(object).length;
        }

        return amount;
      }
    },

    delete: {
      value: function (index, object) {
        if (delete object[index]) {
          if (object.hasOwnProperty("length")) {
            object.length -= 1;
          }

          return true;
        }

        return false;
      }
    },

    reverse: {
      value: function (object) {
        var
          newObject = {},

          callback = function (k) {
            newObject[k] = object[k];
          };

        $.keys(object).reverse().forEach(callback);

        return newObject;
      }
    },

    // revisar
    belongToSameClass: {
      value: function (objects) {
        var
          argumentsAsArray = Array.from(arguments),
          compared = argumentsAsArray[0],
          amount = 0,

          callback = function (object) {
            if (!object) {
              if ($.className(object) ==
                $.className(compared)) {
                amount++;
              }
            } else if ($.getPrototypeOf(compared) ==
              $.getPrototypeOf(object)) {
              amount++;
            }
          };

        argumentsAsArray = argumentsAsArray.slice(1,
          argumentsAsArray.length);
        argumentsAsArray.forEach(callback);

        return amount == argumentsAsArray.length;
      }
    },

    properties: {
      value: function (object, includeNonEnumerable) {
        if (typeof includeNonEnumerable != "boolean") {
          includeNonEnumerable = false;
        }

        var
          clone,
          properties,
          attributes = [],

          callback = function (p) {
            return typeof object[p] != "function";
          };

        if (!object) {
          return [];
        }

        clone = $.clone(object, includeNonEnumerable);

        if (typeof object != "object" &&
          typeof object != "function" &&
          $.getPrototypeOf(object)) {
          clone = $.getPrototypeOf(object);
        }

        properties = $.keys(clone);

        if (includeNonEnumerable) {
          properties = $.getOwnPropertyNames(clone);
        }

        try {
          attributes = properties.filter(callback);
        } catch(e) {}

        return attributes;
      }
    },

    methods: {
      value: function (object, includeNonEnumerable) {
        if (typeof includeNonEnumerable != "boolean") {
          includeNonEnumerable = true;
        }

        var
          clone,
          properties;

        // otherwise it will give a cascade error
        if (!object) {
          return [];
        }

        clone = $.clone(object, includeNonEnumerable);

        if (typeof object != "object" &&
            typeof object != "function" &&
            $.getPrototypeOf(object))
        {
          clone = $.getPrototypeOf(object);
        }

        properties = $.keys(clone);

        if (includeNonEnumerable) {
          properties = $.getOwnPropertyNames(clone);
        }

        return $.difference(properties, $.properties(object, true));
      }
    }

  });

}(Object));
