import { Search } from '../search.js';
import { Iterator } from '../patterns/gof/iterator.js';

import './object.js';
import './string.js';


(function ($) {
  "use strict";

  Object.defineProperties($, {

    compact: {
      value: function (collection) {
        var

          callback = function (item) {
            if (typeof item == "string") {
              if (item !== "") {
                return true;
              }
            } else {
              if (item !== undefined && item !== null) {
                return true;
              }
            }
          };

        return collection.filter(callback);
      }
    }
  });

  Object.defineProperties($.prototype, {

    copy: {
      value: function (startingIndex, finalIndex) {
        return this.slice(startingIndex, finalIndex + 1);
      }
    },

    clone: {
      value: function () {
        var
          clone = [];

        Object.assign(clone, this);

        return clone;
      }
    },

    intersection: {
      value: function (set) {
        var
          smaller,
          larger,
          all = [this, set],

          classifier = function (first, second) {
            return first.length > second.length;
          },

          callback = function (item) {
            return larger.includeItems(item);
          };

        smaller = (all = all.sort(classifier)).first();
        larger = all[1];

        return smaller.filter(callback).uniq();
      }
    },

    intersections: {
      value: function (sets) {
        var
          smaller,
          self = this,
          all = Array.from(arguments),

          classifier = function (first, second) {
            return first.length > second.length;
          },

          callback = function (intersections, set) {
            return intersections.intersection(set);
          };

        all.push(self);
        all.sort(classifier);
        smaller = all.deleteAt(0);
        // reduce works with any value and it cans to reduce the list, filter works with true or false to filter values, and map replace the values.
        return all.reduce(callback,smaller.intersection(all.first()));
      }
    },

    insertAt: {
      value: function (values, index) {
        var
          copy,
          self = this,
          argumentsAsArray = Array.from(arguments),

          callback = function (v) {
            self.push(v);
          };

        index = argumentsAsArray.last();
        copy = self.copy(index, self.lastIndex());
        argumentsAsArray.deleteAt(argumentsAsArray.lastIndex());
        self.deleteAt(index, self.lastIndex());
        Array.prototype.push.apply(self, argumentsAsArray);

        copy.forEach(callback);

        return this;
      }
    },

    indexOfEquivalence: {
      value: function (comparator, startingIndex) {
        var
          index = Object.indexOf(this, comparator, startingIndex);

        return parseInt(index) || -1;
      }
    },

    uniq: {
      value: function () {
        return Object.uniq(this);
      }
    },

    includeItems: {
      value: function (items) {
        var
          argumentsAsArray = Array.from(arguments).uniq(),
          mainReference = this,
          count = 0,

          callback = function (arg) {
            if (mainReference.indexOfEquivalence(arg) > -1) {
              count += 1;
            }
          };

        argumentsAsArray.forEach(callback);

        return count == argumentsAsArray.length;
      }
    },

    deleteAt: {
      value: function (startingIndex, finalIndex) {
        var
          value,
          count = 1;

        if (typeof finalIndex == "number") {
          count = finalIndex + 1 - startingIndex;
        }

        value = this[startingIndex];
        this.splice(startingIndex, count);

        return value;
      }
    },

    delete: {
      value: function (collection) {
        var
          amount,
          index,
          deletedValue,
          self = this,
          deleted = [],
          partsToDelete = Array.from(arguments),

          callback = function (value) {
            amount = self.amount(value);
            while (amount-- > 0) {
              index = self.indexOfEquivalence(value);
              if (index > -1) {
                deletedValue = self[index];
                self.splice(index, 1);
              }
            }

            if (index > -1) {
              deleted.push(deletedValue);
            }
          };

        partsToDelete.forEach(callback);

        if (deleted.length > 1) {
          return deleted;
        }
        return deleted[0];
      }
    },

    without: {
      value: function (items) {
        var
          parts = Array.from(arguments),
          self = this,

          callback = function (item) {
            return !parts.includeItems(item);
          };

        return self.filter(callback);
      }
    },

    amount: {
      value: function (item) {
        return Object.amount(this, item);
      }
    },

    empty: {
      value: function () {
        return this.amount() === 0;
      }
    },

    firstFromASlice: {
      value: function (slice, startingIndex, caseSensitive) {
        var
          regexp,
          iterator,
          clone = this.clone(),
          index = -1,

          iteratorBlock = function (v, i) {
            if (typeof v == "string" && i >= startingIndex) {
              if (v.search(regexp) != -1) {
                index = i;
                this.finalize();
              }
            }
          };

        if (typeof startingIndex != "number") {
          if (typeof startingIndex == "boolean") {
            caseSensitive = startingIndex;
          }
          startingIndex = 0;
        }

        if (typeof caseSensitive != "boolean") {
          caseSensitive = false;
        }

        if (startingIndex === 0) {
          clone = clone.asc();
        }

        slice = slice.trim();

        if (!caseSensitive) {
          regexp = new RegExp(slice, "i");
        } else {
          regexp = new RegExp(slice);
        }

        iterator = Iterator.Proxy.new(this);
        iterator.each(iteratorBlock);

        return index;
      }
    },

    countSlice: {
      value: function (slice, startingIndex, caseSensitive) {
        var
          i,
          regexp,
          clone = this.clone(),
          count = 0;

        if (typeof startingIndex != "number") {
          if (typeof startingIndex == "boolean") {
            caseSensitive = startingIndex;
          }
          startingIndex = 0;
        }

        if (typeof caseSensitive != "boolean") {
          caseSensitive = false;
        }

        if (startingIndex === 0) {
          clone = clone.asc();
        }

        slice = slice.trim();

        if (!caseSensitive) {
          regexp = new RegExp(slice, "i");
        } else {
          regexp = new RegExp(slice);
        }

        i = parseInt(clone.firstFromASlice(slice, startingIndex,
                                            caseSensitive));

        if (i > -1) {
          while (i < this.length) {
            if (clone[i].trim().search(regexp) > -1) {
              count += 1;
              i += 1;
            } else {
              break;
            }
          }
        }

        return count;
      }
    },

    flatten: {
      value: function () {
        return $.flatten(this);
      }
    },

    normalizeToLowerCase: {
      value: function () {
        var
          clone = [],

          callback = function (value) {
            if (typeof value == "string") {
              clone.push(value.toLowerCase()());
            }
          };

        this.forEach(callback);

        return clone;
      }
    },

    capitalize: {
      value: function () {
        var
          clone = [],

          callback = function (value) {
            if (typeof value == "string") {
              clone.push(value.capitalize());
            }
          };

        this.forEach(callback);

        return clone;
      }
    },

    spaceOut: {
      value: function () {
        var
          i = 0,
          clone = this.clone();

        while (i < clone.lastIndex()) {
          clone[i++] += " ";
        }

        return clone;
      }
    },

    compact: {
      value: function () {
        return $.compact(this);
      }
    },

    asc: {
      value: function () {
        var
          clone = this.clone(),
          compareFunction = function (a, b) {
            return a > b;
          };

        clone.sort(compareFunction);

        return clone;
      }
    },

    desc: {
      value: function () {
        var
          clone = this.clone(),
          compareFunction = function (a, b) {
            return a < b;
          };

        clone.sort(compareFunction);

        return clone;
      }
    },

    lastIndex: {
      value: function () {
        return this.length - 1;
      }
    },

    first: {
      value: function () {
        return this[0];
      }
    },

    last: {
      value: function () {
        return this[this.lastIndex()];
      }
    }

  });

}(Array));
