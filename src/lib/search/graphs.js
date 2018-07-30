import { RecursivePromise } from './../recursive-promise.js';


(function () {
  "use strict";

  var
    moduleReference,
    promise = RecursivePromise.new(function (accomplish) {
      if (window.Search) {
        accomplish();
      }
    });

  promise.watch(function () {
    var
      namespace = window.Search;

    Object.defineProperties(namespace, {
      Graphs: {
        value: {}
      }
    });

    moduleReference = namespace.Graphs;
  });

  return moduleReference;

}());

import './graphs/bfs.js';
