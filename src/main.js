var
  enJn,
  nJn;

import './lib/extensions/object.js';
import './lib/extensions/array.js';
import './lib/extensions/x_path_result.js';

import { Iterator } from './lib/patterns/gof/iterator.js';
import { Structure } from './lib/structure.js';


export default enJn = (function () {
  "use strict";

  var
    ConstructorReference;

  window.enJn = function enJn (selector, context) {
    var
      parsed,
      self = this,
      collection = [],

      resolveContext = function (context) {
        if (typeof context == "object") {
          if (context instanceof ConstructorReference ||
            context instanceof Element) {
            return context;
          }
        } else if (typeof context == "string") {
          // recursivity
          return ConstructorReference(context);
        }

        return window.document;
      },

      callback = function (node) {
        collection = collection
          .concat(Array.from(node.querySelectorAll(selector))).flatten();
      },

      hasElement = function (iterable) {
        var
          iterator,
          response = false,

          callback = function (object) {
            if (object instanceof window.Element) {
              this.finalize();
              response = true;
            }
          };

        iterator = Iterator.Proxy.new(iterable);
        iterator.each(callback);
        return response;
      };

    if (!(this instanceof ConstructorReference)) {
      return new ConstructorReference(selector, context);
    }

    context = resolveContext(context);

    if (selector) {
      if (selector instanceof ConstructorReference) {
        return selector;
      } else if (typeof selector == "function") {
        // don't never pass a autoexecutable function (IIFE) as parameter
        return window.document.addEventListener("DOMContentLoaded",
          function (e) {
            selector.call(ConstructorReference, ConstructorReference, e);
          });
        // get children "".match(/(>)(<.(?=(<\/)))/)[0]
        // add support to XPath
      } else if (typeof selector == "string") {
        parsed = (new window.DOMParser()).parseFromString(selector,
                                                          "text/html");

        if (parsed.head.childElementCount) {
          collection = Array.from(parsed.head.childNodes);
        } else {
          collection = Array.from(parsed.body.childNodes);
        }

        if (!hasElement(collection)) {
            collection = [];
            // debugger
            // ver em qual momento ele chegaria aqui
            if (Iterator.isIterable(context)) {
              Array.from(context).forEach(callback);
            } else {
              try {
                collection = Array.from(
                  context.querySelectorAll(selector));
              } catch (e) { }
            }
        }
      } else if (selector instanceof window.Node) {
          collection = [selector];
      } else if (selector instanceof Object) {
          collection = Array.from(selector);

          if (!Object.belongsToClass(selector,
            window.HTMLCollection) &&
            collection.length) {
            self[0] = selector;

            if (selector == window) {
              collection = [];
            }
          }
      }

      Object.assign(self, collection);
    }

    Object.defineProperties(self, {
      toString: {
        value: function () {
          return "[object " + ConstructorReference.name + "]";
        }
      },
      splice: {
        value: Array.prototype.splice
      },
      length: {
        value: Object.attributes(this).length
      }
    });

    return self;

  };

  ConstructorReference = window.enJn;
  window.nJn = ConstructorReference;

  Object.defineProperties(ConstructorReference, {

    each: {
      value: function (collection, callback, startingIndex, finalIndex) {
        var
          iterator = Iterator.Proxy.new(collection);

        iterator.each(startingIndex, finalIndex, callback);
      }
    },

    selectByText: {
      value: function (text, context) {
        var
          self = this,
          collection = [],

          callback = function (element) {
            collection = collection.concat(document.evaluate(
              "descendant-or-self::*[normalize-space(text())='" +
              text.trim() + "']", element).elements()).flatten();
          };

        ConstructorReference
          .each(ConstructorReference(resolveContext(context)), callback);

        return ConstructorReference(collection);
      }
    },

    extend: {
      value: function (final, structure) {
        Structure.new(structure).assignTo(this, final);
      }
    }

  });

  Object.defineProperties(ConstructorReference.prototype, {
    extend: {
      value: function (final, structure) {
        Structure.new(structure).assignTo(this, final);
      }
    }
  });

  return ConstructorReference;

}());
// recognize a element
// (^( *<)[a-z]+ *)( *((\/)|(>.*<\/[a-z]+))(> *)$)

// recognize attributes and values
// It's not possible capture attributes and their values, because their values can be given any character, which forces them to use ".+".

export { enJn as nJn };

import "./query.js";
