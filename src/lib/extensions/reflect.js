import './object.js';


(function ($) {
  "use strict";

  Object.defineProperties ($, {
    constructorForName: {
      value: function (name, context) {
        return Object.constructorForName.call(this, name, context);
      }
    },
  });

}(Reflect));
