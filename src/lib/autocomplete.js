var Autocomplete;
export { Autocomplete };

import '../lib/extensions/array.js';
import '../lib/extensions/object.js';
import { Iterator } from '../lib/patterns/gof/iterator.js';


Autocomplete = (function () {
  "use strict";

  var
    ConstructorReference,

    resolveOptions = function (options) {
      if (!Object.belongsToClass(options, Object)) {
        options = {};
      }

      if (typeof options.caseSensitive != "boolean") {
        options.caseSensitive = false;
      }

      if (typeof options.orderlySearch != "boolean") {
        options.orderlySearch = false;
      }

      return options;
    },

    mapIfFound = function (text, words, options) {
      var
        regexp,
        iterator,
        wordSliceIndex,
        amount = 0,
        wordIndex = 0,
        cachedWordIndex = -1,
        wordsAsList = words.split(" ").compact(),
        textAsList = text.split(" ").compact(),
        hashSetOfWords = Object.asCountableLiteral(textAsList),
        mapped = {
          wordsList: wordsAsList,
          mapping: {}
        },

        callback = function (slice) {
          slice = slice.trim();
          wordIndex = Object.firstFromASlice(hashSetOfWords,
            slice,
            wordIndex,
            options.caseSensitive);

          if (wordIndex &&
            ((options.orderlySearch &&
              wordIndex > cachedWordIndex) ||
              !options.orderlySearch) &&
            (textAsList.countSlice(slice, options.caseSensitive) >=
              wordsAsList.amount(slice))
          ) {

            cachedWordIndex = wordIndex;

            if (options.caseSensitive) {
              regexp = new RegExp(slice);
            } else {
              regexp = new RegExp(slice, "i");
            }

            wordSliceIndex = textAsList[wordIndex].search(regexp);
            mapped.mapping[wordIndex] = {
              researchedSlice: slice,
              wordSliceIndex: wordSliceIndex
            };
            Object.delete(wordIndex, hashSetOfWords);
            amount += 1;
          } else {
            this.finalize();
          }
        };

      if (hashSetOfWords.length >= wordsAsList.length) {
        iterator = Iterator.Proxy.new(wordsAsList);
        iterator.each(callback);

        if (amount == wordsAsList.length) {
          return mapped;
        }
      }

      return null;
    };

  window.Autocomplete = function Autocomplete (textsList) {

    var
      _textsList = textsList;

    this.complete = function (word, options) {
      var
        data,
        completed = [],
        iterator = Iterator.Proxy.new(_textsList);

      options = resolveOptions(options);

      iterator.each(function (text, i) {
        // [
        //   {
        //     wordList: [...],
        //     mapping: [
        //       {
        //         researchedSlice: ...,
        //         wordIndex: ...,
        //         wordSliceIndex: ...
        //       },
        //       {...}
        //     ],
        //     text: ...,
        //     textIndex: ...,
        //   },
        //   {...}
        // ]
        data = mapIfFound(text, word, options);
        if (data) {
          data.text = text;
          data.textIndex = i;
          completed.push(data);
        }
      });

      return completed;
    };

  };

  ConstructorReference = window.Autocomplete;

  Object.defineProperties(ConstructorReference, {
    new: {
      value: function (textsList, options) {
        return new ConstructorReference(textsList, options);
      }
    }
  });

  ConstructorReference.new.prototype.constructor = ConstructorReference;

  return ConstructorReference;

}());
