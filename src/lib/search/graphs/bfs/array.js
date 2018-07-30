import { RecursivePromise } from './../../../recursive-promise.js';
import { Iterator } from './../../../patterns/gof/iterator.js';


// concrete strategy
(function () {
  "use strict";

  var
    ConstructorReference,
    promise = RecursivePromise.new(function (accomplish) {
      if (window.Search &&
        window.Search.Graphs &&
        window.Search.Graphs.BFS) {
        accomplish();
      }
    });

  promise.watch(function () {
    var
      namespace = window.Search.Graphs.BFS;

    namespace.Array = function (graph) {
      this.research = function (callback) {
        var
          queueIterator,
          iterator,
          key,
          // As novas versões do JS trazem a classe Map, a qual permite associar objetos como chave, isto é, um objeto poderá ser a chave de outro. Em um objeto literal as chaves podem ser apenas do tipo string ou number
          queue = [{ trace: [], collection: graph }],
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

                if (value instanceof Array) {
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

      return this;
    };

    ConstructorReference = namespace.Array;

    Object.defineProperties(ConstructorReference, {
      new: {
        value: function (graph) {
          return new ConstructorReference(graph);
        }
      }
    });

  });

  return ConstructorReference;

}());
