import { RecursivePromise } from './../../../recursive-promise.js';
import { Iterator } from './../../../patterns/gof/iterator.js';

import './../../../extensions/object.js';


// concrete strategy
(function () {
  "use strict";

  var
    promise = RecursivePromise.new(function (accomplish) {
      if (Search && Search.Graphs && Search.Graphs.BFS) {
        accomplish();
      }
    });

  promise.watch(function () {
    var
      classReference,
      namespace = Search.Graphs.BFS;

    Object.defineProperties(namespace, {
      Object: {
        value: {}
      }
    });

    classReference = namespace.Object;

    Object.defineProperties(classReference, {
      new: {
        value: function (collection) {

          var
            ConstructorReference = classReference.new;

          if (!(this instanceof ConstructorReference)) {
            return new ConstructorReference(collection);
          }

          this.research = function (callback) {
            var
              queueIterator,
              iterator,
              key,
              map,
              // As novas versões do JS trazem a classe Map, a qual permite associar objetos como chave, isto é, um objeto poderá ser a chave de outro. Em um objeto literal as chaves podem ser apenas do tipo string ou number
              queue = [{trace: [], collection: collection}],
              self = this,

              cleanQueue = function () {
                queue = [];
              },

              queueBlock = function (map) {
                var
                  iteratorBlock = function (value) {
                    key = iterator.key();

                    // to break use "return ...;"
                    callback.call(self, value, key, map.trace);

                    // if (typeof value == "object" &&
                    //     (Iterator.isIterable(value) ||
                    //     (Object.belongsToClass(value,
                    //                         Object)))) {
                    if (value instanceof Object) {
                      // put on queue
                      queue.push({
                        trace: map.trace.concat(key),
                        collection: value
                      });
                    }
                  };

                cleanQueue();
                iterator = Iterator.Proxy.new(map.collection);
                iterator.each(iteratorBlock);
              };

            while (true) {
              if (queue.length) {
                queueIterator = Iterator.Proxy.new(queue);
                queueIterator.each(queueBlock);
              } else {
                break;
              }
            }

          };

        }
      }

    });

  });

}());
