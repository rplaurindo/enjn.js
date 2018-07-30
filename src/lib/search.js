var Search;
export { Search };


Search = (function () {
  "use strict";

  var
    moduleReference;

  Object.defineProperties(window, {
    Search: {
      value: {},
      enumerable: true,
      writable: true
    },
  });

  moduleReference = window.Search;

  return moduleReference;

}());

import './search/context.js';
import './search/graphs.js';
