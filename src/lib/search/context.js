import { StrategyContext } from './../patterns/gof/strategy-context.js';

import { RecursivePromise } from '../recursive-promise.js';

// context (should 'implement' a interface to access through here)
(function () {
  "use strict";

  var
    ConstructorReference,
    promise = window.RecursivePromise.new(function (accomplish) {
      if (window.Search) {
        accomplish();
      }
    });

  promise.watch(function () {

    var
      namespace = window.Search;

    namespace.Context = function (strategy) {
      var
        superContext = StrategyContext.new.call(this),
        _strategy = superContext.setStrategy(strategy);

      this.research = function (callback) {
        return _strategy.research(callback);
      };
    };

    ConstructorReference = namespace.Context;

    Object.defineProperties(ConstructorReference, {
      new: {
        value: function (strategy) {
          return new ConstructorReference(strategy);
        }
      }
    });

  });

  return ConstructorReference;

}());
