var StrategyContext;
export { StrategyContext };


// strategy context factory
StrategyContext = (function () {
  "use strict";

  var
    ConstructorReference;

  window.StrategyContext = function StrategyContext (strategy) {
    var
      _strategy = strategy;

    this.setStrategy = function (strategy) {
      if (strategy) {
        _strategy = strategy;
      }

      return _strategy;
    };

    return this;
  };

  ConstructorReference = window.StrategyContext;

  Object.defineProperties(ConstructorReference, {
    new: {
      value: function (strategy) {
        return new ConstructorReference(strategy);
      }
    }
  });

  ConstructorReference.new.prototype.constructor = ConstructorReference;

  return ConstructorReference;

}());
