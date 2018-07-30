import { RecursivePromise } from './../../recursive-promise.js';


(function () {
  "use strict";

  var
    moduleReference,
    promise = RecursivePromise.new(function (accomplish) {
      if (window.Search && window.Search.Graphs) {
        accomplish();
      }
    });

  promise.watch(function () {
    var
      namespace = window.Search.Graphs;

    // Breadth-First Search
    Object.defineProperties(namespace, {
      BFS: {
        value: {}
      }
    });

    moduleReference = namespace.BFS;
  });

  return moduleReference;

}());

import './bfs/array.js';
import './bfs/object.js';
