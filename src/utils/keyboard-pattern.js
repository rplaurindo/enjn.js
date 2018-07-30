var KeyboardPattern;
export { KeyboardPattern };


KeyboardPattern = (function () {
  "use strict";

  var
    ConstructorReference,
    classReference,
    staticPropertyDescriptors = {
      writable: true,
      enumerable: true
    };

  window.KeyboardPattern = function KeyboardPattern () { };

  ConstructorReference = window.KeyboardPattern;
  classReference = ConstructorReference;

  Object.defineProperties(ConstructorReference, {
    deleteKeys: {
      value: function () {
        var
          stringPattern = "",

          callback = function (key) {
            stringPattern += key + "|";
          };

        ["Backspace", "Delete"].forEach(callback);

        return stringPattern.slice(0, stringPattern.length - 1);
      },
      staticPropertyDescriptors
    },

    functionKeys: {
      value: function () {
        var
          stringPattern = "",
          i = 0;

        while (i++ <= 11) {
          if (i < 12) {
            stringPattern += "F" + i + "|";
          } else {
            stringPattern += "F" + i;
          }
        }

        return stringPattern.slice(0, stringPattern.length - 1);
      },
      staticPropertyDescriptors
    },

    editKeys: {
      value: function () {
        var
          stringPattern = "",

          callback = function (key) {
            stringPattern += key + "|";
          };

        ["Enter", "Insert"].forEach(callback);

        return stringPattern.slice(0, stringPattern.length - 1);
      },
      staticPropertyDescriptors
    },

    modifierKeys: {
      value: function () {
        var
          stringPattern = "",

          callback = function (key) {
            stringPattern += key + "|";
          };

        ["Shift", "Control", "Alt", "AltGraph"].forEach(callback);

        return stringPattern.slice(0, stringPattern.length - 1);
      },
      staticPropertyDescriptors
    },

    navigationKeys: {
      value: function () {
        var
          stringPattern = "",

          directionalIteratorBlock = function (key) {
            stringPattern += "Arrow" + key + "|";
          },

          horizontalDirectionalIteratorBlock = function (key) {
            stringPattern += "Page" + key + "|";
          },

          callback = function (key) {
            stringPattern += key + "|";
          };

        ["Left", "Right", "Up", "Down"].forEach(directionalIteratorBlock);

        ["Up", "Down"].forEach(horizontalDirectionalIteratorBlock);

        ["Home", "End"].forEach(callback);

        return stringPattern.slice(0, stringPattern.length - 1);
      },
      staticPropertyDescriptors
    },

    systemKeys: {
      value: function () {
        var
          stringPattern = "",

          callback = function (key) {
            stringPattern += key + "|";
          };

        ["Escape", "Pause"].forEach(callback);

        return stringPattern.slice(0, stringPattern.length - 1);
      },
      staticPropertyDescriptors
    },

    nonCharactersKeys: {
      value: function () {
        return classReference.systemKeys() + "|" +
          classReference.navigationKeys() + "|" +
          classReference.modifierKeys() + "|" +
          classReference.editKeys() + "|" +
          classReference.functionKeys();
      },
      staticPropertyDescriptors
    }
  });

  return ConstructorReference;

}());
