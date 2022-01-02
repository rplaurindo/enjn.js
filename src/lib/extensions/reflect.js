import './object.js';


(function ($) {
  "use strict";

  Object.defineProperties ($, {
    constructorForName: {
      value: function (name, context) {
        context = context || window;
        return context[name];
      }
    },
  });

}(Reflect));
