/******/
 (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// The iframe context is the `scrivito` object, available top-level in the application iframe and
// used as the public API for the client. Following indirection is used in the specs in order to
// not pollute the global `window` object with the public API properties.

var iframeContext = void 0;

function getWindowContext() {
  return iframeContext || window.scrivito;
}

// For test purpose only.
function setWindowContext(newIframeContext) {
  iframeContext = newIframeContext;
}

exports.getWindowContext = getWindowContext;
exports.setWindowContext = setWindowContext;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var scrivitoUi = void 0;

  if (window.parent !== window) {
    scrivitoUi = window.parent.scrivito;
    if (scrivitoUi) {
      // In an iframe and parent window contains the UI: in UI mode.
      var cmsDocument = scrivitoUi.cms_element.from_dom_element(document);
      cmsDocument.installPublicApi();
      cmsDocument.addAppExtensions();

      if (window.scrivito.AppAdapter) {
        cmsDocument.setAppAdapter(window.scrivito.AppAdapter);
      }

      // wait for app to be fully loaded
      document.addEventListener('DOMContentLoaded', function () {
        // wait for UI to be fully loaded
        scrivitoUi.on('load', function () {
          cmsDocument.assertUserLoggedIn();
          cmsDocument.connect();
        });
      });
    }
  }

  if (window.scrivito && window.scrivito.client) {
    scrivito.client.init({ scrivitoUi: scrivitoUi, realmContext: window.scrivito });
    document.addEventListener('DOMContentLoaded', function () {
      return scrivito.BrowserLocation.init();
    });
  }

  // If the SDK is completely missing, the custom callbacks should nevertheless run.
  if (!window.scrivito) {
    window.scrivito = {};
  }

  if (!window.scrivito.on) {
    window.scrivito.on = function (eventName, callback) {
      if (eventName === 'content') {
        document.addEventListener('DOMContentLoaded', function () {
          return callback(window.document);
        });
      }
    };
  }

  if (!window.scrivito.in_editable_view) {
    window.scrivito.in_editable_view = function () {
      return false;
    };
  }
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindowRegistry = undefined;

var _window_context = __webpack_require__(1);

function getWindowRegistry() {
  return (0, _window_context.getWindowContext)()._privateRealm._registry;
}

exports.getWindowRegistry = getWindowRegistry;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function randomHex() {
  var hex = Math.floor(Math.random() * Math.pow(16, 8)).toString(16);
  while (hex.length < 8) {
    hex = "0" + hex;
  }
  return hex;
}

function randomId() {
  return randomHex() + randomHex();
}

exports.randomId = randomId;
exports.randomHex = randomHex;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _attribute_content_class = __webpack_require__(16);

var _attribute_content_class2 = _interopRequireDefault(_attribute_content_class);

var _valid_rails_page_classes = __webpack_require__(19);

var _use_rails_engine = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ALLOWED_CREATE_OBJ_ATTRIBUTES = ['_path', 'blob'];

var ObjClass = function (_AttributeContentClas) {
  _inherits(ObjClass, _AttributeContentClas);

  function ObjClass() {
    _classCallCheck(this, ObjClass);

    return _possibleConstructorReturn(this, (ObjClass.__proto__ || Object.getPrototypeOf(ObjClass)).apply(this, arguments));
  }

  _createClass(ObjClass, [{
    key: 'createObjWithDefaults',
    value: function createObjWithDefaults(attributes) {
      var unexpectedAttrs = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(attributes)].concat(ALLOWED_CREATE_OBJ_ATTRIBUTES));

      attributes._obj_class = this.name;

      if (!_underscore2.default.isEmpty(unexpectedAttrs)) {
        throw new scrivito.InternalError('Unexpected attributes ' + scrivito.prettyPrint(unexpectedAttrs) + '.' + (' Available attributes: ' + scrivito.prettyPrint(ALLOWED_CREATE_OBJ_ATTRIBUTES)));
      }

      if (this._classData.usesServerCallbacks) {
        return scrivito.withServerDefaults.createObjFromLegacyAttributes(attributes);
      }

      var obj = scrivito.BasicObj.create(buildPublicAttributesFrom(attributes));

      return obj.finishSaving().then(function () {
        return obj;
      });
    }
  }, {
    key: 'isBinary',
    value: function isBinary() {
      var blob = this.attribute('blob');
      return !!(blob && blob.type === 'binary');
    }
  }], [{
    key: 'type',
    value: function type() {
      return 'Obj';
    }
  }, {
    key: 'validPageClasses',
    value: function validPageClasses(path) {
      if ((0, _use_rails_engine.useRailsEngine)()) {
        var objClassNames = (0, _valid_rails_page_classes.validRailsPageClasses)(path);

        return objClassNames.reduce(function (arr, objClassName) {
          var objClass = ObjClass.find(objClassName);

          if (objClass) {
            arr.push(objClass);
          }

          return arr;
        }, []);
      }

      return ObjClass.all().filter(function (objClass) {
        return !objClass.isHiddenFromEditors() && !objClass.isBinary();
      });
    }
  }]);

  return ObjClass;
}(_attribute_content_class2.default);

function buildPublicAttributesFrom(_ref) {
  var _objClass = _ref._obj_class,
      _path = _ref._path,
      blob = _ref.blob;

  var publicAttrs = { _objClass: [_objClass] };

  if (_path) {
    publicAttrs._path = [_path];
  }
  if (blob) {
    publicAttrs.blob = [blob, 'binary'];
  }

  return publicAttrs;
}

exports.default = ObjClass;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
  function Session(attributes) {
    _classCallCheck(this, Session);

    this._id = attributes.id;
    this._maxage = attributes.maxage;
    this._permissions = attributes.permissions;
    this._role = attributes.role;
    this._token = attributes.token;
    this._userId = attributes.user_id;
  }

  _createClass(Session, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "token",
    get: function get() {
      return this._token;
    }
  }, {
    key: "userId",
    get: function get() {
      return this._userId;
    }
  }, {
    key: "permissions",
    get: function get() {
      return this._permissions;
    }
  }, {
    key: "role",
    get: function get() {
      return this._role;
    }
  }, {
    key: "maxage",
    get: function get() {
      return this._maxage;
    }
  }]);

  return Session;
}();

exports.default = Session;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _session = __webpack_require__(6);

var _session2 = _interopRequireDefault(_session);

var _random = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VISITOR_SESSION = { token: undefined };

var isVisitor = true;
var loadable = void 0;
var sessionRenewalPromise = void 0;
var cancelProactiveRenewal = function cancelProactiveRenewal() {};

function init() {
  isVisitor = false;
  loadable = new scrivito.LoadableData({
    state: scrivito.uiState.subState('sessionKeeper'),
    loader: loader
  });
  ensureSessionIsAvailable();
}

function performWithToken(callback) {
  if (isVisitor) {
    return callback(VISITOR_SESSION.token);
  }

  return ensureSessionIsAvailable().then(function () {
    return callback(sessionData().token);
  }).catch(function (error) {
    if (error instanceof scrivito.UnauthorizedError) {
      return renewSession(sessionData().id).then(function () {
        return callback(sessionData().token);
      });
    }
    throw error;
  });
}

// For test purpose only.
function clearSession() {
  isVisitor = true;
  loadable = undefined;
}

function currentSession() {
  return new _session2.default(sessionData());
}

function sessionData() {
  if (isVisitor) {
    throw new scrivito.InternalError('Accessing the VISITOR_SESSION is not intended!');
  }

  return loadable.get();
}

function loader() {
  var id = (0, _random.randomId)();
  return renewSession(id);
}

function renewSession(id) {
  if (!sessionRenewalPromise) {
    cancelProactiveRenewal();

    sessionRenewalPromise = requestSession(id).then(function (newSession) {
      sessionRenewalPromise = null;
      loadable.set(newSession);
      enqueueProactiveRenewal();
    }).catch(function () {
      sessionRenewalPromise = null;
      throw new scrivito.UnauthorizedError('Failed to renew session.');
    });
  }

  return sessionRenewalPromise;
}

function enqueueProactiveRenewal() {
  var timeoutId = setTimeout(function () {
    renewSession(sessionData().id).catch(function () {
      // Catch so no unhandled rejection message is logged
    });
  }, (sessionData().maxage - 10) * 1000);

  cancelProactiveRenewal = function cancelProactiveRenewal() {
    return clearTimeout(timeoutId);
  };
}

function requestSession(id) {
  return scrivito.ajax('PUT', 'sessions/' + id, { skip_write_monitor: true });
}

function ensureSessionIsAvailable() {
  return scrivito.loadAsync(function () {
    return sessionData();
  });
}

exports.default = {
  init: init,
  performWithToken: performWithToken,
  currentSession: currentSession,
  clearSession: clearSession
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function createReactClass(params) {
    var shouldRenderLoader = params.shouldRenderLoader,
        _render = params.render,
        renderOnError = params.renderOnError,
        _componentWillMount = params.componentWillMount,
        _componentWillUnmount = params.componentWillUnmount;


    var unsubscribeModelState = void 0;
    var lastRenderedVersion = void 0;

    return React.createClass(_underscore2.default.extend(params, {
      componentWillMount: function componentWillMount() {
        var _this = this;

        unsubscribeModelState = scrivito.globalState.subscribe(function () {
          if (_this.isMounted()) {
            var currentVersion = scrivito.globalState.currentVersion();
            if (lastRenderedVersion !== currentVersion) {
              _this.forceUpdate();
            }
          }
        });

        if (_componentWillMount) {
          _componentWillMount.apply(this);
        }
      },
      componentWillUnmount: function componentWillUnmount() {
        unsubscribeModelState();

        if (_componentWillUnmount) {
          _componentWillUnmount.apply(this);
        }
      },
      render: function render() {
        var _this2 = this;

        lastRenderedVersion = scrivito.globalState.currentVersion();

        var handleError = function handleError(error) {
          scrivito.printError(error);

          if (renderOnError) {
            return renderOnError.apply(_this2);
          }

          return shouldRenderLoader ? React.createElement(scrivito.LoaderError, null) : null;
        };

        try {
          var run = void 0;

          scrivito.LoadableData.capture(function () {
            run = scrivito.LoadableData.run(function () {
              return scrivito.LoadableData.withEventualConsistency(function () {
                return _render.apply(_this2);
              });
            });
          }).loadMissingData();

          if (run.success) {
            return run.result;
          }

          if (this.renderWhileLoading) {
            return this.renderWhileLoading();
          }

          return shouldRenderLoader ? React.createElement(scrivito.Loader, null) : null;
        } catch (error) {
          return handleError(error);
        }
      }
    }));
  }

  scrivito.createReactClass = createReactClass;
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_context = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var PropTypes = {
    oneOfRealmType: function oneOfRealmType() {
      for (var _len = arguments.length, typeNames = Array(_len), _key = 0; _key < _len; _key++) {
        typeNames[_key] = arguments[_key];
      }

      return function (props, propName, componentName) {
        var propValue = props[propName];
        var realm = (0, _window_context.getWindowContext)();

        if (!_underscore2.default.any(typeNames, function (name) {
          return propValue instanceof (realm[name] || scrivito[name]);
        })) {
          return new scrivito.ArgumentError('Component "' + componentName + '" received prop "' + propName + '"' + (' with invalid value "' + propValue + '".') + (' Valid are instances of ' + formatRealmTypes(typeNames) + '.'));
        }
      };
    },
    oneOfRealmTypeOrFalsey: function oneOfRealmTypeOrFalsey() {
      for (var _len2 = arguments.length, typeNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        typeNames[_key2] = arguments[_key2];
      }

      return function (props, propName, componentName) {
        var propValue = props[propName];

        if (!propValue) {
          return;
        }

        var realm = (0, _window_context.getWindowContext)();

        if (!_underscore2.default.any(typeNames, function (name) {
          return propValue instanceof (realm[name] || scrivito[name]);
        })) {
          return new scrivito.ArgumentError('Component "' + componentName + '" received prop "' + propName + '"' + (' with invalid value "' + propValue + '".') + (' Valid are instances of ' + formatRealmTypes(typeNames) + ' or a falsey value.'));
        }
      };
    }
  };

  function formatRealmTypes(typeNames) {
    return _underscore2.default.map(typeNames, function (typeName) {
      return '"scrivito.' + typeName + '"';
    }).join(', ');
  }

  scrivito.PropTypes = PropTypes;
})();

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(123);


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(33);
var clientContext = __webpack_require__(127);
clientContext.keys().forEach(clientContext);

__webpack_require__(20);
var appContext = __webpack_require__(126);
appContext.keys().forEach(appContext);

__webpack_require__(104);
__webpack_require__(9);
__webpack_require__(8);
var reactContext = __webpack_require__(128);
reactContext.keys().forEach(reactContext);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!window.scrivito) {
  window.scrivito = {};
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentClasses = {};

var ContentClassRegistry = {
  register: function register(type, objClasses) {
    contentClasses[type] = objClasses;
  },
  allForType: function allForType(type) {
    return contentClasses[type];
  },
  findByType: function findByType(type, name) {
    return _underscore2.default.findWhere(this.allForType(type), { name: name });
  }
};

exports.default = ContentClassRegistry;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _content_class_registry = __webpack_require__(15);

var _content_class_registry2 = _interopRequireDefault(_content_class_registry);

var _rails_thumbnail = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttributeContentClass = function () {
  _createClass(AttributeContentClass, null, [{
    key: 'init',
    value: function init(classDatas) {
      var _this = this;

      var contentClasses = classDatas.map(function (classData) {
        return new _this(classData);
      });
      _content_class_registry2.default.register(this.type(), contentClasses);
    }
  }, {
    key: 'find',
    value: function find(name) {
      return _content_class_registry2.default.findByType(this.type(), name);
    }
  }, {
    key: 'get',
    value: function get(name) {
      var modelClass = this.find(name);

      if (modelClass) {
        return modelClass;
      }

      throw new scrivito.InternalError('Model class "' + name + '" does not exist.');
    }
  }, {
    key: 'all',
    value: function all() {
      return _content_class_registry2.default.allForType(this.type());
    }
  }, {
    key: 'validWidgetClassesFor',
    value: function validWidgetClassesFor(field) {
      var containerClass = findContentClassForBasicModel(field.container());

      if (containerClass && containerClass.usesServerCallbacks()) {
        var widgetClassNames = scrivito.validClassesForWidgetlistField(field);

        return widgetClassNames.reduce(function (acc, widgetClassName) {
          var widgetClass = _content_class_registry2.default.findByType('Widget', widgetClassName);

          if (widgetClass) {
            acc.push(widgetClass);
          }
          return acc;
        }, []);
      }

      var allWidgetClasses = _content_class_registry2.default.allForType('Widget');

      var objClassName = field.container().objClass;
      return allWidgetClasses.filter(function (widgetClass) {
        return !widgetClass.isHiddenFromEditors() && widgetClass.isValidContainerClass(objClassName);
      });
    }
  }]);

  function AttributeContentClass(classData) {
    _classCallCheck(this, AttributeContentClass);

    this.name = classData.name;
    this._classData = classData;

    this.attributes = _underscore2.default.map(classData.attributes, function (attributeData) {
      return new scrivito.Attribute(attributeData);
    });
  }

  // public


  _createClass(AttributeContentClass, [{
    key: 'title',
    value: function title() {
      return this._classData.title;
    }
  }, {
    key: 'hasDetailsView',
    value: function hasDetailsView() {
      return !!this._classData.hasServerDetailsTemplate;
    }
  }, {
    key: 'attribute',
    value: function attribute(name) {
      return _underscore2.default.findWhere(this.attributes, { name: name });
    }
  }, {
    key: 'useRailsDetailsTemplate',
    value: function useRailsDetailsTemplate() {
      return !!this._classData.usesServerCallbacks;
    }
  }, {
    key: 'useRailsThumbnailHtml',
    value: function useRailsThumbnailHtml() {
      return !this._classData.description && !this._classData.thumbnail && !!this._classData.usesServerCallbacks;
    }
  }, {
    key: 'railsThumbnailHtml',
    value: function railsThumbnailHtml() {
      return (0, _rails_thumbnail.getRailsThumbnail)(this.name);
    }
  }, {
    key: 'usesServerCallbacks',
    value: function usesServerCallbacks() {
      return !!this._classData.usesServerCallbacks;
    }
  }, {
    key: 'isHiddenFromEditors',
    value: function isHiddenFromEditors() {
      return !!this._classData.hideFromEditor;
    }
  }, {
    key: 'fetchDefaults',
    value: function fetchDefaults(attributes) {
      var path = 'obj_class/' + this.name + '/defaults';

      if (attributes) {
        path += '?' + $.param({ attributes: attributes });
      }
      return scrivito.Promise.resolve(scrivito.ajax('GET', path));
    }
  }]);

  return AttributeContentClass;
}();

function findContentClassForBasicModel(basicModel) {
  if (basicModel instanceof scrivito.BasicWidget) {
    return _content_class_registry2.default.findByType('Widget', basicModel.objClass);
  }

  return _content_class_registry2.default.findByType('Obj', basicModel.objClass);
}

exports.default = AttributeContentClass;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function getRailsThumbnail(objClassName) {
  return loadableData().get()[objClassName] || null;
}

// For test purpose only.
function storeRailsThumbnails(thumbnails) {
  loadableData().set(thumbnails);
}

function loadableData() {
  var state = scrivito.uiState.subState('railsThumbnails');
  return new scrivito.LoadableData({ state: state, loader: loader });
}

function loader() {
  return scrivito.ajax('GET', 'obj_class/thumbnails');
}

exports.getRailsThumbnail = getRailsThumbnail;
exports.storeRailsThumbnails = storeRailsThumbnails;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isUsingRailsEngine = void 0;

function useRailsEngine() {
  return isUsingRailsEngine;
}

function initUseRailsEngine(state) {
  isUsingRailsEngine = state;
}

exports.useRailsEngine = useRailsEngine;
exports.initUseRailsEngine = initUseRailsEngine;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function validRailsPageClasses(path) {
  return loadableDataFor(path).get();
}

function loadableDataFor(path) {
  var baseState = scrivito.uiState.subState('validRailsPageClasses');
  return new scrivito.LoadableData({
    state: baseState.subState(path),
    loader: loaderFor(path)
  });
}

// For test purpose only
function storeValidRailsPageClasses(path, objClassNames) {
  loadableDataFor(path).set(objClassNames);
}

function loaderFor(path) {
  var getParams = $.param({ parent_path: path });
  return function () {
    return scrivito.ajax('GET', 'objs/valid_page_classes?' + getParams);
  };
}

exports.validRailsPageClasses = validRailsPageClasses;
exports.storeValidRailsPageClasses = storeValidRailsPageClasses;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//= require_self
//= require_tree ./app_support

(function () {
  scrivito.AppSupport = {};
})();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_context = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var UI_CONFIG_KEYS = ['title', 'description', 'thumbnail'];

  /* The AppAdapter is provided to the UI by the App.
   * The UI uses it as a communication channel to the App.
   * It is the counterpart of the UiAdapter.
   *
   * Communication should use only built-in datatypes,
   * i.e. communicate using `string` and `array`, not `BasicObj`.
   */
  var AppAdapter = {
    titleForClass: function titleForClass(className) {
      return scrivito.getUiConfigPropertyFor(className, 'title');
    },
    getClasses: function getClasses() {
      var realm = (0, _window_context.getWindowContext)();
      var classDatas = [];

      _underscore2.default.each(realm.allObjClasses(), function (modelClass, name) {
        return classDatas.push(buildClassData('Obj', name, modelClass));
      });

      _underscore2.default.each(realm.allWidgetClasses(), function (modelClass, name) {
        return classDatas.push(buildClassData('Widget', name, modelClass));
      });

      return classDatas;
    }
  };

  function buildClassData(type, name, modelClass) {
    var schema = scrivito.Schema.forClass(modelClass);
    var classData = {
      name: name, type: type, attributes: buildAttributeData(schema, _underscore2.default.keys(schema.attributes))
    };

    addValuesFromUiConfig(classData, name);

    return classData;
  }

  function buildAttributeData(schema, names) {
    return names.map(function (name) {
      var _schema$attributeDefi = schema.attributeDefinition(name),
          _schema$attributeDefi2 = _slicedToArray(_schema$attributeDefi, 2),
          type = _schema$attributeDefi2[0],
          options = _schema$attributeDefi2[1];

      var attributeDefinition = { name: name, type: type };

      if (options && options.validValues) {
        attributeDefinition.validValues = options.validValues;
      }

      return attributeDefinition;
    });
  }

  function addValuesFromUiConfig(classData, name) {
    UI_CONFIG_KEYS.forEach(function (uiConfigKey) {
      var uiConfigValue = scrivito.getUiConfigPropertyFor(name, uiConfigKey);

      if (uiConfigValue) {
        classData[uiConfigKey] = uiConfigValue;
      }
    });
  }

  scrivito.AppAdapter = AppAdapter;
})();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function pushWith(target) {
    var state = { scrivitoObjId: target.id };
    var url = scrivito.Routing.generate(target);
    var history = scrivito.BrowserLocation.window().history;

    if (history.state && history.state.scrivitoObjId === target.id) {
      // noop;
      return;
    }

    history.pushState(state, '', url);
  }

  function replaceWith(target) {
    var state = { scrivitoObjId: target.id };
    var url = scrivito.Routing.generate(target);

    scrivito.BrowserLocation.window().history.replaceState(state, '', url);
  }

  function handlePopEvents() {
    scrivito.BrowserLocation.window().onpopstate = onpopstate;
  }

  function recognizeCurrentLocation() {
    var location = scrivito.BrowserLocation.window().location.toString();
    scrivito.replaceCurrentPage(function () {
      return scrivito.Routing.recognize(location);
    });
  }

  function init() {
    recognizeCurrentLocation();
    handlePopEvents();
  }

  function onpopstate(event) {
    var objId = event.state && event.state.scrivitoObjId;
    if (objId) {
      scrivito.replaceCurrentPage(function () {
        return scrivito.BasicObj.get(objId);
      });
    } else {
      recognizeCurrentLocation();
    }
  }

  // Do not use the function name "window",
  // otherwise you will no longer be able to access the global window
  function myWindow() {
    return window;
  }

  scrivito.BrowserLocation = {};
  scrivito.BrowserLocation.init = init;
  scrivito.BrowserLocation.pushWith = pushWith;
  scrivito.BrowserLocation.replaceWith = replaceWith;
  scrivito.BrowserLocation.window = myWindow;
})();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function changeLocation(newLocation) {
    if (scrivito.uiAdapter) {
      // change the location of the parent, to avoid CSP errors.
      scrivito.uiAdapter.navigateToExternalUrl(newLocation);
    } else {
      scrivito.setWindowLocation(newLocation);
    }
  }

  function setWindowLocation(newLocation) {
    window.location = newLocation;
  }

  // For test purpose only.
  scrivito.setWindowLocation = setWindowLocation;
  scrivito.changeLocation = changeLocation;
})();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  // public API
  function configure(_ref) {
    var tenant = _ref.tenant,
        endpoint = _ref.endpoint,
        homepage = _ref.homepage,
        routingMethod = _ref.routingMethod,
        routingBasePath = _ref.routingBasePath;

    if (!tenant) {
      throw new scrivito.ArgumentError('Required configuration "tenant" missing.');
    }

    scrivito.CmsRestApi.init(endpoint || 'api.scrivito.com', tenant);
    scrivito.RoutingPath.init(homepageCallback(homepage));
    scrivito.Routing.init(routingOptions(routingMethod, routingBasePath));
  }

  function homepageCallback(homepage) {
    if (!homepage) {
      // use the default homepage
      return function () {
        return scrivito.BasicObj.root();
      };
    }
    if (!_underscore2.default.isFunction(homepage)) {
      throw new scrivito.ArgumentError('The "homepage" configuration option is invalid. Please provide a function' + ' returning a "scrivito.Obj", e.g. "() => scrivito.Obj.findByPath(\'/en\')"');
    }
    return homepage;
  }

  function routingOptions(routingMethod, routingBasePath) {
    if (routingMethod) {
      if (!_underscore2.default.contains(['path', 'hash'], routingMethod)) {
        throw new scrivito.ArgumentError('Expected the configuration option "routingMethod" to be set to "hash" or "path", ' + ('but saw "' + routingMethod + '" instead.'));
      }
    }
    if (routingBasePath && !_underscore2.default.isString(routingBasePath)) {
      throw new scrivito.ArgumentError('Configuration "routingBasePath" needs to be a String.');
    }
    return { routingMethod: routingMethod, routingBasePath: routingBasePath };
  }

  scrivito.configure = configure;
})();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_context = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var nextVersion = 0;

  // public API
  function currentPage() {
    var _getState = getState(),
        objId = _getState.objId;

    if (_underscore2.default.isNull(objId)) {
      return objId;
    }
    if (!objId) {
      return;
    }

    return scrivito.loadWithDefault(undefined, function () {
      return context().Obj.get(objId);
    });
  }

  function currentPageError() {
    return getState().error;
  }

  // public API
  function navigateTo(target) {
    var fn = target;

    if (!_underscore2.default.isFunction(target)) {
      fn = function fn() {
        return target;
      };
      assertValidTarget(target);
    }

    var basicFn = function basicFn() {
      return scrivito.unwrapAppClassValues(fn());
    };
    var beforeSetCallback = function beforeSetCallback(obj) {
      if (obj) {
        scrivito.scrollWindowToTop();
        scrivito.BrowserLocation.pushWith(obj);
      }
    };

    setCurrentPage(basicFn, beforeSetCallback);
  }

  function replaceCurrentPage(fn) {
    var beforeSetCallback = function beforeSetCallback(obj) {
      if (obj) {
        scrivito.BrowserLocation.replaceWith(obj);
      }
    };
    setCurrentPage(fn, beforeSetCallback);
  }

  function setCurrentPage(fn, beforeSetCallback) {
    if (!_underscore2.default.isFunction(fn)) {
      throw new scrivito.ArgumentError('Parameter fn needs to be a function.');
    }

    var version = generateNextVersion();

    scrivito.loadAsync(fn).then(function (obj) {
      return scrivito.loadAsync(function () {
        return extractObjOrUrl(obj);
      });
    }).then(function (_ref) {
      var obj = _ref.obj,
          url = _ref.url;

      beforeSetCallback(obj);
      changeLocationOrSetCurrentPage({ obj: obj, url: url }, version);
    }).catch(function (error) {
      if (error instanceof scrivito.NavigateToEmptyBinaryError) {
        return;
      }
      return changeLocationOrSetCurrentPage({ error: error }, version);
    });
  }

  function state() {
    return scrivito.appState.subState('currentPage');
  }

  function getState() {
    return state().get() || {};
  }

  function setState(newState) {
    state().set(newState);
  }

  function generateNextVersion() {
    nextVersion += 1;
    return nextVersion;
  }

  function assertValidTarget(target) {
    if (_underscore2.default.isNull(target)) {
      return;
    }
    if (target instanceof context().Obj) {
      return;
    }
    if (target instanceof context().Link) {
      return;
    }

    if (!target) {
      throw new scrivito.ArgumentError('Missing target.');
    }

    throw new scrivito.ArgumentError('Target is invalid. Valid targets are instances of Obj or Link.');
  }

  function assertValidBasicTarget(target) {
    if (_underscore2.default.isNull(target)) {
      return;
    }
    if (target instanceof scrivito.BasicObj) {
      return;
    }
    if (target instanceof scrivito.BasicLink) {
      return;
    }

    if (!target) {
      throw new scrivito.ArgumentError('Missing target.');
    }

    throw new scrivito.ArgumentError('Target is invalid. Valid targets are instances of Obj or Link.');
  }

  function extractObjOrUrl(target) {
    assertValidBasicTarget(target);
    if (_underscore2.default.isNull(target)) {
      return {};
    }

    if (target instanceof scrivito.BasicObj) {
      if (isBinary(target)) {
        var blob = target.get('blob', ['binary']);

        if (!blob) {
          throw new scrivito.NavigateToEmptyBinaryError();
        }

        return { url: blob.url };
      }

      return { obj: target };
    }

    if (target instanceof scrivito.BasicLink) {
      if (target.isExternal()) {
        return { url: target.url };
      }

      return extractObjOrUrl(target.obj);
    }
  }

  function changeLocationOrSetCurrentPage(_ref2, version) {
    var url = _ref2.url,
        obj = _ref2.obj,
        error = _ref2.error;

    if (nextVersion !== version) {
      return;
    }

    if (url) {
      scrivito.changeLocation(url);
    } else if (error) {
      setState({ objId: null, error: error });
      setUiCurrentPage(null);
    } else {
      var objId = obj && obj.id || null;
      setState({ objId: objId });
      setUiCurrentPage(objId);
    }
  }

  function setUiCurrentPage(objId) {
    if (scrivito.uiAdapter) {
      scrivito.uiAdapter.setCurrentPageId(objId);
    }
  }

  function context() {
    return (0, _window_context.getWindowContext)();
  }

  function isBinary(basicObj) {
    var klass = context().getClass(basicObj.objClass);
    if (!klass) {
      return false;
    }

    var schema = scrivito.Schema.forClass(klass);
    return schema.isBinary();
  }

  scrivito.currentPage = currentPage;
  scrivito.currentPageError = currentPageError;
  scrivito.navigateTo = navigateTo;
  scrivito.replaceCurrentPage = replaceCurrentPage;
})();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var registry = [];

  function register(editor) {
    registry.push(editor);
  }

  function editorClassFor(attrDef) {
    return _underscore2.default.find(registry, function (editor) {
      return editor.canEdit(attrDef);
    });
  }

  function clear() {
    registry = [];
  }

  scrivito.editorRegistry = { editorClassFor: editorClassFor, clear: clear };
  scrivito.registerEditor = register;
})();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function isEditingMode() {
    if (scrivito.uiAdapter) {
      return scrivito.uiAdapter.isEditingMode();
    }

    return false;
  }

  scrivito.isEditingMode = isEditingMode;
})();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _window_registry = __webpack_require__(3);

(function () {
  var uiConfigForClass = {};

  // private API, used to query the uiConfig provided by the app
  function getUiConfigPropertyFor(className, propertyName) {
    if (!className) {
      throw new scrivito.ArgumentError('Missing argument "className"');
    }
    if (!propertyName) {
      throw new scrivito.ArgumentError('Missing argument "propertyName"');
    }

    var config = uiConfigForClass[className];
    if (!config) {
      return;
    }

    return config[propertyName];
  }

  // public API
  function provideUiConfig(appClass, uiConfig) {
    var className = (0, _window_registry.getWindowRegistry)().objClassNameFor(appClass);
    if (!className) {
      throw new scrivito.ArgumentError('Expected an Obj or Widget class.');
    }
    uiConfigForClass[className] = uiConfig;
  }

  scrivito.getUiConfigPropertyFor = getUiConfigPropertyFor;
  scrivito.provideUiConfig = provideUiConfig;
})();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var hashPrefix = '!';
  var isPathRoutingMode = void 0;
  var basePath = void 0;
  var isInitialized = false;

  function init(_ref) {
    var routingMethod = _ref.routingMethod,
        routingBasePath = _ref.routingBasePath;

    isInitialized = true;
    isPathRoutingMode = routingMethod === 'path';
    basePath = routingBasePath || '';
  }

  // For test purpose only.
  function reset() {
    isInitialized = false;
    isPathRoutingMode = undefined;
    basePath = undefined;
  }

  function assertIsInitialized(methodName) {
    if (!isInitialized) {
      throw new scrivito.InternalError(methodName + ' can\'t be called before init.');
    }
  }

  function generate(obj) {
    assertIsInitialized('generate');
    var path = scrivito.RoutingPath.generate(obj);
    if (isPathRoutingMode) {
      var _scrivito$parseUrl = scrivito.parseUrl(window.location),
          origin = _scrivito$parseUrl.origin;

      var normalizedPath = ('/' + basePath + '/' + path).replace(/\/+/g, '/');
      return '' + origin + normalizedPath;
    }
    return '#' + hashPrefix + path;
  }

  function recognize(url) {
    assertIsInitialized('recognize');
    var path = void 0;
    if (isPathRoutingMode) {
      path = extractPath(url);
    } else {
      path = extractPathFromHash(url);
    }
    return scrivito.RoutingPath.recognize(path);
  }

  function extractPath(url) {
    var _scrivito$parseUrl2 = scrivito.parseUrl(url),
        pathname = _scrivito$parseUrl2.pathname;

    if (pathname.substring(0, basePath.length) !== basePath) {
      return '';
    }
    return pathname.substring(basePath.length);
  }

  function extractPathFromHash(url) {
    var _scrivito$parseUrl3 = scrivito.parseUrl(url),
        hash = _scrivito$parseUrl3.hash;

    if (hash.substring(0, hashPrefix.length) === hashPrefix) {
      return hash.substring(hashPrefix.length);
    }

    return '';
  }

  scrivito.Routing = {};
  scrivito.Routing.init = init;
  scrivito.Routing.reset = reset;
  scrivito.Routing.generate = generate;
  scrivito.Routing.recognize = recognize;
})();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_registry = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var homepageCallback = void 0;

  var RoutingPath = {
    init: function init(initHomepageCallback) {
      homepageCallback = initHomepageCallback;
    },
    generate: function generate(obj) {
      assertObjIsBasicObj(obj);
      if (isHomepage(obj)) {
        return '/';
      }
      if (obj.permalink) {
        return '/' + obj.permalink;
      }
      var slug = generateSlug(obj);
      if (slug) {
        return '/' + slug + '-' + obj.id;
      }
      return '/' + obj.id;
    },
    recognize: function recognize(path) {
      assertPathIsString(path);

      if (_underscore2.default.include(['/', ''], path)) {
        return scrivito.unwrapAppClassValues(homepageCallback());
      }

      // remove leading /
      var pathWithoutLeadingSlash = removeLeadingChars(path, '/');

      try {
        return scrivito.BasicObj.getByPermalink(pathWithoutLeadingSlash);
      } catch (error) {
        if (!(error instanceof scrivito.ResourceNotFoundError)) {
          throw error;
        }
      }

      return scrivito.BasicObj.get(removeSlug(pathWithoutLeadingSlash));
    },


    // For test purpose only.
    get homepageCallback() {
      return homepageCallback;
    },

    // For test purpose only.
    resetHomepageCallback: function resetHomepageCallback() {
      homepageCallback = undefined;
    }
  };

  function removeLeadingChars(input, leadingChars) {
    if (input.substring(0, leadingChars.length) === leadingChars) {
      return input.substring(leadingChars.length);
    }

    return input;
  }

  function isHomepage(obj) {
    if (!homepageCallback) {
      return false;
    }
    var homepage = scrivito.loadableWithDefault(null, homepageCallback);
    if (!homepage) {
      return false;
    }
    return homepage.id === obj.id;
  }

  function assertObjIsBasicObj(obj) {
    if (!(obj instanceof scrivito.BasicObj)) {
      throw new scrivito.ArgumentError('Parameter obj needs to be a scrivito.BasicObj.');
    }
  }

  function assertPathIsString(input) {
    if (!_underscore2.default.isString(input)) {
      throw new scrivito.ArgumentError('Parameter path needs to be a String.');
    }
  }

  function generateSlug(basicObj) {
    var registry = (0, _window_registry.getWindowRegistry)();
    var appObj = scrivito.wrapInAppClass(registry, basicObj);

    return appObj.slug();
  }

  function removeSlug(input) {
    return _underscore2.default.last(input.split('-'));
  }

  scrivito.RoutingPath = RoutingPath;
})();

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function scrollWindowToTop() {
    window.scrollTo(0, 0);
  }

  // For test purpose only.
  scrivito.scrollWindowToTop = scrollWindowToTop;
})();

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _window_context = __webpack_require__(1);

(function () {
  function basicUrlFor(target) {
    assertValidTarget(target);

    if (target instanceof scrivito.BasicLink) {
      return urlForLink(target);
    }
    if (target instanceof scrivito.Binary) {
      return urlForBinary(target);
    }
    if (isBinaryObj(target)) {
      return urlForBinaryObj(target);
    }

    return scrivito.Routing.generate(target);
  }

  function urlFor(target) {
    var basicTarget = scrivito.unwrapAppClassValues(target);

    return basicUrlFor(basicTarget);
  }

  function assertValidTarget(target) {
    if (!target) {
      throw new scrivito.ArgumentError('Missing target.');
    }
    if (target instanceof scrivito.BasicLink) {
      return;
    }
    if (target instanceof scrivito.BasicObj) {
      return;
    }
    if (target instanceof scrivito.Binary) {
      return;
    }

    throw new scrivito.ArgumentError('Target is invalid. Valid targets are instances of Obj or Link.');
  }

  function urlForBinary(binary) {
    return binary.url;
  }

  function urlForBinaryObj(obj) {
    var blob = obj.get('blob', ['binary']);

    if (blob) {
      return urlForBinary(blob);
    }

    return '#__empty_blob';
  }

  function urlForLink(link) {
    if (link.isExternal()) {
      return link.url;
    }

    return basicUrlFor(link.obj);
  }

  function context() {
    return (0, _window_context.getWindowContext)();
  }

  function isBinaryObj(obj) {
    var klass = context().getClass(obj.objClass);
    if (!klass) {
      return false;
    }

    var schema = scrivito.Schema.forClass(klass);
    return schema.isBinary();
  }

  scrivito.basicUrlFor = basicUrlFor;
  scrivito.urlFor = urlFor;
})();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//= require_self
//= require_tree ./client

(function () {
  scrivito.client = {};
})();

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var isDisabled = false;

  function ajax(type, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var isWriteRequest = _underscore2.default.contains(['PUT', 'POST', 'DELETE'], type);
    var skipWriteMonitor = options && options.skip_write_monitor;

    if (isWriteRequest) {
      options.timeout = 15000; // miliseconds

      if (!skipWriteMonitor) {
        scrivito.WriteMonitor.startWrite();
      }
    }

    var ajaxPromise = performRequest(type, path, options);

    if (isWriteRequest && !skipWriteMonitor) {
      scrivito.WriteMonitor.endWriteWhenDone(ajaxPromise);
    }

    return ajaxPromise;
  }

  function ajaxWithErrorDialog(type, path, options) {
    return scrivito.ajax(type, path, options).catch(function (error) {
      displayAjaxError(error);
      throw error;
    });
  }

  function displayAjaxError(error) {
    var message = void 0;
    var messageForEditor = void 0;

    if (_underscore2.default.isObject(error)) {
      message = scrivito.t('ajax_error', error.message);
      messageForEditor = error.message_for_editor;
    } else if (_underscore2.default.contains(['abort', 'parsererror', 'timeout'], error)) {
      message = scrivito.t('ajax_error.communication');
    } else {
      message = scrivito.t('ajax_error', error);
    }

    if (scrivito.isDevelopmentMode) {
      scrivito.AlertDialog.open(message);
    } else {
      scrivito.logError(message);
      scrivito.ErrorDialog.open(messageForEditor || scrivito.t('ajax_error.message_for_editor'), [error.timestamp, message]);
    }
  }

  // For test purpose only
  function disableAjax() {
    isDisabled = true;
  }

  // For test purpose only
  function enableAjax() {
    isDisabled = false;
  }

  function performRequest(type, path) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (isDisabled) {
      return scrivito.Promise.reject('scrivito.ajax is disabled due to scrivito.disableAjax()!');
    }

    var baseUrl = window.location.protocol + '//' + window.location.host + '/__scrivito/';
    if (options.data) {
      options.data = JSON.stringify(options.data);
    }
    var ajaxRequest = $.ajax(baseUrl + path, _underscore2.default.extend({
      type: type,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      cache: false }, options));

    return new scrivito.Promise(function (resolve, reject) {
      ajaxRequest.then(resolve);
      ajaxRequest.fail(function (xhr, _textStatus, xhrError) {
        try {
          return reject(JSON.parse(xhr.responseText));
        } catch (_error) {
          return reject(xhrError);
        }
      });
    });
  }

  scrivito.ajax = ajax;
  scrivito.ajaxWithErrorDialog = ajaxWithErrorDialog;
  scrivito.displayAjaxError = displayAjaxError;

  scrivito.disableAjax = disableAjax;
  scrivito.enableAjax = enableAjax;
})();

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function provideAsyncInstanceMethods(klass, methods) {
    return provideAsyncMethods(klass.prototype, methods);
  }

  function provideAsyncMethods(klass, methods) {
    _underscore2.default.each(methods, function (asyncName, syncName) {
      klass[asyncName] = asyncMethodFor(syncName);
    });
  }

  function asyncMethodFor(syncName) {
    return function asyncMethod() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return scrivito.PublicPromise.resolve(scrivito.loadAsync(function () {
        return _this[syncName].apply(_this, args);
      }));
    };
  }

  function asyncMethodStub() {
    throw new scrivito.InternalError('this method is supposed to be overwritten by calling provideAsyncMethods');
  }

  // export
  scrivito.provideAsyncMethods = provideAsyncMethods;
  scrivito.provideAsyncClassMethods = provideAsyncMethods;
  scrivito.provideAsyncInstanceMethods = provideAsyncInstanceMethods;
  scrivito.asyncMethodStub = asyncMethodStub;
})();

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var CONVERT_TO_CAMELCASE = /(_+)(\w)/g;
  var CONVERT_TO_UNDERSCORE = /([A-Z])/g;

  var TEST_CAMEL_CASE = /^_?(_+[A-Z0-9]|[^_])+$/;
  var TEST_UNDERSCORE = /^[a-z0-9_:]+$/;

  scrivito.attributeInflection = {
    isUnderscore: function isUnderscore(name) {
      return TEST_UNDERSCORE.test(name);
    },
    isCamelCase: function isCamelCase(name) {
      return TEST_CAMEL_CASE.test(name);
    },
    underscore: function underscore(name) {
      return name.replace(CONVERT_TO_UNDERSCORE, function (_match, group) {
        return "_" + group.toLowerCase();
      });
    },
    camelCase: function camelCase(name) {
      return name.replace(CONVERT_TO_CAMELCASE, function (match, underscores, nextChar, index) {
        if (!index) {
          return match;
        }
        if (nextChar.toUpperCase() === nextChar) {
          return match;
        }

        return "" + underscores.substr(1) + nextChar.toUpperCase();
      });
    }
  };
})();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.AttributeSerializer = {
    serialize: function serialize(attributes) {
      var serializedAttributes = {};
      _underscore2.default.each(attributes, function (_ref, name) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[0],
            attrInfo = _ref2[1];

        var serializedName = convertCamelCasedAttributeName(name);
        if (scrivito.Attribute.isSystemAttribute(serializedName)) {
          serializedAttributes[serializedName] = value;
        } else {
          var _attrInfo = _slicedToArray(attrInfo, 2),
              attrType = _attrInfo[0],
              attrOptions = _attrInfo[1];

          serializedAttributes[serializedName] = [serializeAttributeType(attrType, name), valueOrNull(serializeAttributeValue(attrType, attrOptions, value, name))];
        }
      });

      return serializedAttributes;
    }
  };

  function convertCamelCasedAttributeName(name) {
    if (!scrivito.attributeInflection.isCamelCase(name)) {
      throw new scrivito.ArgumentError('Attribute names have to be in camel case.');
    }

    return scrivito.attributeInflection.underscore(name);
  }

  function serializeAttributeType(type, name) {
    switch (type) {
      case 'enum':
        return 'string';
      case 'float':
      case 'integer':
        return 'number';
      case 'multienum':
        return 'stringlist';
      case 'binary':
      case 'date':
      case 'html':
      case 'link':
      case 'linklist':
      case 'reference':
      case 'referencelist':
      case 'string':
      case 'stringlist':
      case 'widgetlist':
        return type;
      default:
        throw new scrivito.ArgumentError('Attribute "' + name + '" is of unsupported type "' + type + '".');
    }
  }

  function serializeAttributeValue(type, options, value, name) {
    if (value === null) {
      return value;
    }

    switch (type) {
      case 'binary':
        return serializeBinaryAttributeValue(value, name);
      case 'date':
        return serializeDateAttributeValue(value, name);
      case 'enum':
        return serializeEnumAttributeValue(options, value, name);
      case 'float':
        return serializeFloatAttributeValue(value, name);
      case 'html':
        return serializeHtmlAttributeValue(value, name);
      case 'integer':
        return serializeIntegerAttributeValue(value, name);
      case 'link':
        return serializeLinkAttributeValue(value, name);
      case 'linklist':
        return serializeLinklistAttributeValue(value, name);
      case 'multienum':
        return serializeMultienumAttributeValue(options, value, name);
      case 'reference':
        return serializeReferenceAttributeValue(value, name);
      case 'referencelist':
        return serializeReferencelistAttributeValue(value, name);
      case 'string':
        return serializeStringAttributeValue(value, name);
      case 'stringlist':
        return serializeStringlistAttributeValue(value, name);
      case 'widgetlist':
        return serializeWidgetlistAttributeValue(value, name);
      default:
        throw new scrivito.InternalError('serializeAttributeValue is not implemented for "' + type + '".');
    }
  }

  function valueOrNull(value) {
    if ((_underscore2.default.isString(value) || _underscore2.default.isArray(value)) && _underscore2.default.isEmpty(value)) {
      return null;
    }
    return value;
  }

  function throwInvalidAttributeValue(value, name, expected) {
    throw new scrivito.ArgumentError('Unexpected value ' + scrivito.prettyPrint(value) + ' for' + (' attribute "' + name + '". Expected: ' + expected));
  }

  function serializeBinaryAttributeValue(value, name) {
    if (value instanceof scrivito.Binary) {
      return { id: value.id };
    }
    throwInvalidAttributeValue(value, name, 'A Binary.');
  }

  function serializeDateAttributeValue(value, name) {
    if (_underscore2.default.isDate(value)) {
      return scrivito.types.formatDateToString(value);
    }
    if (scrivito.types.isValidDateString(value)) {
      return value;
    }
    throwInvalidAttributeValue(value, name, 'A Date.');
  }

  function serializeEnumAttributeValue(_ref3, value, name) {
    var validValues = _ref3.validValues;

    if (_underscore2.default.contains(validValues, value)) {
      return value;
    }

    var e = 'Valid attribute values are contained in its "validValues" array [' + validValues + '].';
    throwInvalidAttributeValue(value, name, e);
  }

  function serializeFloatAttributeValue(value, name) {
    if (scrivito.types.isValidFloat(value)) {
      return value;
    }

    var invalidValue = value;
    if (_underscore2.default.isNumber(value)) {
      invalidValue = String(value);
    }
    throwInvalidAttributeValue(invalidValue, name, 'A Number, that is #isFinite().');
  }

  function serializeHtmlAttributeValue(value, name) {
    if (_underscore2.default.isString(value)) {
      return value;
    }
    throwInvalidAttributeValue(value, name, 'A String.');
  }

  function serializeIntegerAttributeValue(value, name) {
    if (scrivito.types.isValidInteger(value)) {
      return value;
    }
    throwInvalidAttributeValue(value, name, 'A Number, that is #isSafeInteger().');
  }

  function serializeLinkAttributeValue(value, name) {
    if (validLinkObject(value)) {
      return convertLinkToCmsApi(value);
    }
    throwInvalidAttributeValue(value, name, 'A Link instance.');
  }

  function serializeLinklistAttributeValue(value, name) {
    if (_underscore2.default.isArray(value) && _underscore2.default.every(value, validLinkObject)) {
      return _underscore2.default.map(value, convertLinkToCmsApi);
    }
    throwInvalidAttributeValue(value, name, 'An array of Link instances.');
  }

  function validLinkObject(value) {
    if (value instanceof scrivito.BasicLink) {
      return true;
    }

    // check if value is backend compatible
    if (!_underscore2.default.isObject(value)) {
      return false;
    }
    var invalidKeys = _underscore2.default.without(_underscore2.default.keys(value), 'fragment', 'obj_id', 'query', 'target', 'title', 'url');
    return _underscore2.default.isEmpty(invalidKeys);
  }

  function convertLinkToCmsApi(value) {
    var backendLink = {
      fragment: value.fragment,
      query: value.query,
      target: value.target,
      title: value.title,
      url: value.url
    };
    backendLink.obj_id = value.objId || value.obj_id;

    return _underscore2.default.mapObject(backendLink, function (v) {
      return v || null;
    });
  }

  function serializeMultienumAttributeValue(_ref4, value, name) {
    var validValues = _ref4.validValues;

    var errorMessage = 'An array with values from ' + scrivito.prettyPrint(validValues) + '.';

    if (!_underscore2.default.isArray(value) || !_underscore2.default.every(value, _underscore2.default.isString)) {
      throwInvalidAttributeValue(value, name, errorMessage);
    }

    var forbiddenValues = _underscore2.default.difference(value, validValues);
    if (forbiddenValues.length) {
      var e = errorMessage + ' Forbidden values: ' + scrivito.prettyPrint(forbiddenValues) + '.';
      throwInvalidAttributeValue(value, name, e);
    }
    return value;
  }

  function serializeReferenceAttributeValue(value, name) {
    if (isValidReference(value)) {
      return serializeSingleReferenceValue(value);
    }
    throwInvalidAttributeValue(value, name, 'A BasicObj or a String ID.');
  }

  function serializeReferencelistAttributeValue(value, name) {
    if (isValidReferencelistValue(value)) {
      return _underscore2.default.map(value, serializeSingleReferenceValue);
    }
    throwInvalidAttributeValue(value, name, 'An array with BasicObjs or String IDs.');
  }

  function serializeSingleReferenceValue(value) {
    if (value instanceof scrivito.BasicObj) {
      return value.id;
    }
    return value;
  }

  function isValidReference(value) {
    return _underscore2.default.isString(value) || value instanceof scrivito.BasicObj;
  }

  function isValidReferencelistValue(value) {
    return _underscore2.default.isArray(value) && _underscore2.default.every(value, function (v) {
      return isValidReference(v);
    });
  }

  function serializeStringAttributeValue(value, name) {
    if (isValidString(value)) {
      return value.toString();
    }
    throwInvalidAttributeValue(value, name, 'A String.');
  }

  function serializeStringlistAttributeValue(value, name) {
    if (_underscore2.default.isArray(value) && _underscore2.default.every(value, function (v) {
      return isValidString(v);
    })) {
      return _underscore2.default.invoke(value, 'toString');
    }
    throwInvalidAttributeValue(value, name, 'An array of strings.');
  }

  function isValidString(value) {
    return _underscore2.default.isString(value) || _underscore2.default.isNumber(value);
  }

  function serializeWidgetlistAttributeValue(value, name) {
    if (_underscore2.default.isArray(value) && _underscore2.default.every(value, function (v) {
      return v instanceof scrivito.BasicWidget;
    })) {
      return _underscore2.default.pluck(value, 'id');
    }
    throwInvalidAttributeValue(value, name, 'An array of scrivito.BasicWidget instances.');
  }
})();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.BatchRetrieval = function () {
    function BatchRetrieval(mget) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          batchSize = _ref.batchSize;

      _classCallCheck(this, BatchRetrieval);

      this._mget = mget;
      this._batchSize = batchSize || 100;
      this._deferreds = {};
    }

    _createClass(BatchRetrieval, [{
      key: 'retrieve',
      value: function retrieve(id) {
        var _this = this;

        if (_underscore2.default.isEmpty(this._deferreds)) {
          scrivito.nextTick(function () {
            return _this._performRetrieval();
          });
        }

        if (!this._deferreds[id]) {
          var deferred = new scrivito.Deferred();
          this._deferreds[id] = deferred;
        }

        return this._deferreds[id].promise;
      }
    }, {
      key: '_performRetrieval',
      value: function _performRetrieval() {
        var _this2 = this;

        var ids = _underscore2.default.keys(this._deferreds).slice(0, this._batchSize);

        if (ids.length === 0) {
          return;
        }

        var currentRequestDeferreds = {};
        _underscore2.default.each(ids, function (id) {
          currentRequestDeferreds[id] = _this2._deferreds[id];
          delete _this2._deferreds[id];
        });

        this._mget(ids).then(function (results) {
          _underscore2.default.each(ids, function (id, index) {
            var deferred = currentRequestDeferreds[id];
            var result = results[index];

            if (index < results.length) {
              deferred.resolve(result);
            } else {
              _this2.retrieve(id).then(deferred.resolve, deferred.reject);
            }
          });
        }, function (error) {
          _underscore2.default.each(currentRequestDeferreds, function (deferred) {
            return deferred.reject(error);
          });
        });

        this._performRetrieval();
      }

      // For test purpose only.

    }, {
      key: 'reset',
      value: function reset() {
        this._deferreds = {};
      }
    }]);

    return BatchRetrieval;
  }();
})();

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var bufferedUpdates = [];

  var isUpdateScheduled = function isUpdateScheduled() {
    return bufferedUpdates.length;
  };

  function add(callback) {
    if (!isUpdateScheduled()) {
      scrivito.nextTick(function () {
        scrivito.globalState.withBatchedUpdates(function () {
          return performUpdate(bufferedUpdates);
        });
      });
    }

    bufferedUpdates.push(callback);
  }

  function performUpdate(callbacks) {
    bufferedUpdates = [];

    try {
      callbacks.forEach(function (callback) {
        return callback();
      });
    } finally {
      if (isUpdateScheduled()) {
        performUpdate(bufferedUpdates);
      }
    }
  }

  scrivito.batchedStateUpdater = { add: add };
})();

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.BinaryUtils = {
    isBlob: function isBlob(obj) {
      return !!obj && _underscore2.default.isNumber(obj.size) && _underscore2.default.isString(obj.type);
    },
    isFile: function isFile(obj) {
      return this.isBlob(obj) && _underscore2.default.isString(obj.name);
    }
  };
})();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _session_keeper = __webpack_require__(7);

var _session_keeper2 = _interopRequireDefault(_session_keeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MIN_REQUEST_TIME = 5;
  var DEFAULT_REQUEST_TIMEOUT = 15000;
  var backendEndpoint = void 0;
  var tenant = void 0;

  scrivito.CmsRestApi = {
    init: function init(endpoint, initTenant) {
      backendEndpoint = endpoint;
      tenant = initTenant;
    },
    get: function get(path, requestParams) {
      return fetch('GET', path, requestParams);
    },
    put: function put(path, requestParams) {
      return fetch('PUT', path, requestParams);
    },
    post: function post(path, requestParams) {
      return fetch('POST', path, requestParams);
    },
    delete: function _delete(path, requestParams) {
      return fetch('DELETE', path, requestParams);
    },


    // For test purpose only.
    get endpoint() {
      return backendEndpoint;
    },

    // For test purpose only.
    get tenant() {
      return tenant;
    }
  };

  var Timer = function () {
    function Timer() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_REQUEST_TIMEOUT;

      _classCallCheck(this, Timer);

      this.timesOutAt = Date.now() + timeout;
    }

    _createClass(Timer, [{
      key: 'timedOut',
      value: function timedOut() {
        return this.remainingTime() < MIN_REQUEST_TIME;
      }
    }, {
      key: 'remainingTime',
      value: function remainingTime() {
        return Math.max(this.timesOutAt - Date.now(), 0);
      }
    }, {
      key: 'cover',
      value: function cover(time) {
        return time <= this.timesOutAt - MIN_REQUEST_TIME;
      }
    }]);

    return Timer;
  }();

  function fetch(method, path, requestParams) {
    return request(method, path, requestParams).then(function (result) {
      if (result && result.task && _underscore2.default.size(result) === 1) {
        return handleTask(result.task);
      }
      return result;
    });
  }

  function request(method, path, requestParams) {
    var timer = new Timer();
    return retryOnceOnError(timer, method, function () {
      return retryOnRateLimit(timer, function () {
        return _session_keeper2.default.performWithToken(function (token) {
          var ajaxDeferred = ajax(method, path, requestParams, timer.remainingTime(), token);
          return scrivito.Promise.resolve(ajaxDeferred).catch(checkAuthorization);
        });
      }).catch(function (error) {
        return raiseError(error);
      });
    });
  }

  function retryOnceOnError(timer, method, requestCallback) {
    if (method === 'POST') {
      return requestCallback();
    }

    return requestCallback().catch(function (error) {
      if (!timer.timedOut()) {
        if (error instanceof scrivito.BackendError) {
          return requestCallback();
        }
        if (error instanceof scrivito.NetworkError) {
          return requestCallback();
        }
      }
      throw error;
    });
  }

  function retryOnRateLimit(timer, requestCallback) {
    var retry = function retry(retryCount) {
      return requestCallback().catch(function (error) {
        if (error.status === 429) {
          var timeout = calculateTimeout(error.getResponseHeader('Retry-After'), retryCount);
          if (timer.cover(Date.now() + timeout)) {
            return scrivito.Promise.resolve(scrivito.waitMs(timeout)).then(function () {
              return retry(retryCount + 1);
            });
          }
          throw new scrivito.RateLimitExceededError('rate limit exceeded', 429);
        }
        throw error;
      });
    };

    return retry(0);
  }

  function calculateTimeout(retryAfter, retryCount) {
    var calculatedTimeout = Math.pow(2, retryCount) * 0.5 * 1000;
    return Math.max(calculatedTimeout, retryAfter * 1000);
  }

  function raiseError(error) {
    if (error.status === undefined || !_underscore2.default.isNumber(error.status)) {
      throw error;
    } else if (error.status === 0) {
      throw new scrivito.NetworkError(error.statusText, error.status);
    }

    var errorBody = parseError(error);
    var specificOutput = errorBody.error;

    if (error.status === 403) {
      throw new scrivito.AccessDeniedError(specificOutput, error.status, errorBody.code);
    } else if (error.status.toString()[0] === '4' && specificOutput) {
      throw scrivito.ClientError.for(specificOutput, error.status, errorBody.code);
    } else if (error.status === 500 && specificOutput) {
      throw new scrivito.BackendError(specificOutput, error.status);
    }
    throw new scrivito.NetworkError(error.responseText, error.status);
  }

  function checkAuthorization(error) {
    if (error.status === 401) {
      var errorBody = parseError(error);
      var specificOutput = errorBody.error;
      throw new scrivito.UnauthorizedError(specificOutput, error.status, errorBody.code);
    }
    throw error;
  }

  function parseError(error) {
    try {
      return JSON.parse(error.responseText);
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new scrivito.NetworkError(error.responseText, error.status);
      }
      throw err;
    }
  }

  function prepareAjaxParams(method, path) {
    var requestParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var ajaxParams = {
      path: path,
      verb: method,
      params: requestParams
    };

    return ajaxParams;
  }

  function ajax(method, path, requestParams, timeout, token) {
    var url = 'https://' + backendEndpoint + '/tenants/' + tenant + '/perform';
    var ajaxParams = prepareAjaxParams(method, path, requestParams);

    return scrivito.fetch(method, url, ajaxParams, timeout, token);
  }

  function handleTask(task) {
    switch (task.status) {
      case 'success':
        return task.result;
      case 'error':
        throw scrivito.ClientError.for(task.message, 412, task.code);
      case 'open':
        return scrivito.wait(2).then(function () {
          return request('GET', 'tasks/' + task.id).then(function (result) {
            return handleTask(result);
          });
        });
      default:
        throw new scrivito.ScrivitoError('Invalid task response (unknown status)');
    }
  }
})();

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.computeCacheKey = function (data) {
    var normalizedData = normalizeData(data);
    return JSON.stringify(normalizedData);
  };

  function normalizeData(data) {
    if (_underscore2.default.isArray(data)) {
      return _underscore2.default.map(data, normalizeData);
    }

    if (_underscore2.default.isObject(data)) {
      return _underscore2.default.chain(data).mapObject(normalizeData).pairs().sortBy(_underscore2.default.first);
    }

    return data;
  }
})();

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _speakingurl = __webpack_require__(11);

var _speakingurl2 = _interopRequireDefault(_speakingurl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function convertToSlug(input) {
    return (0, _speakingurl2.default)(input);
  }

  scrivito.convertToSlug = convertToSlug;
})();

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var PUBLISHED_WORKSPACE_ID = 'published';

  scrivito.currentWorkspaceId = function () {
    if (scrivito.uiAdapter) {
      return scrivito.uiAdapter.currentWorkspaceId();
    }

    return PUBLISHED_WORKSPACE_ID;
  };
})();

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.Deferred = function Deferred() {
    var _this = this;

    _classCallCheck(this, Deferred);

    this.promise = new scrivito.Promise(function (resolveFn, rejectFn) {
      _this.resolve = resolveFn;
      _this.reject = rejectFn;
    });
  };
})();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _errorStackParser = __webpack_require__(119);

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  var consoleErrorIsDisabled = false;

  function logError() {
    if (window && window.console && !consoleErrorIsDisabled) {
      var _window$console;

      (_window$console = window.console).error.apply(_window$console, arguments);
    }
  }

  function disableConsoleError() {
    consoleErrorIsDisabled = true;
  }

  function printError(error) {
    if (error instanceof Error) {
      var stackTrace = _errorStackParser2.default.parse(error);
      scrivito.logError([error.message].concat(_toConsumableArray(_underscore2.default.pluck(stackTrace, 'source'))).join('\n'));
    } else {
      scrivito.logError(error);
    }
  }

  scrivito.logError = logError;
  scrivito.disableConsoleError = disableConsoleError;
  scrivito.printError = printError;
})();

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var TRANSFORM_SOURCE_ERROR_PREFIX = 'binary.unprocessable.image.transform.source.';
  var TRANSFORM_SOURCE_TOO_LARGE = 'binary.unprocessable.image.transform.source.too_large';

  // From https://phabricator.babeljs.io/T3083#65595
  function ExtendableError() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    Error.apply(this, args);
  }

  ExtendableError.prototype = Object.create(Error.prototype);

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableError, Error);
  } else {
    ExtendableError.__proto__ = Error;
  }

  // public API

  var ScrivitoError = function (_ExtendableError) {
    _inherits(ScrivitoError, _ExtendableError);

    function ScrivitoError(message) {
      var captureStackTrace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _classCallCheck(this, ScrivitoError);

      // message should be set before capturing stacktrace
      // since it is featured in the stacktrace in some environments.
      var _this = _possibleConstructorReturn(this, (ScrivitoError.__proto__ || Object.getPrototypeOf(ScrivitoError)).call(this));

      _this.message = message;
      _this._captureStackTrace = captureStackTrace;

      if (captureStackTrace) {
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_this, _this.constructor);
        } else {
          var stack = void 0;

          try {
            throw new Error();
          } catch (error) {
            stack = error.stack;
          }

          Object.defineProperty(_this, 'stack', { value: stack });
        }
      }
      return _this;
    }

    _createClass(ScrivitoError, [{
      key: 'name',
      get: function get() {
        return this.constructor.name;
      }

      // For test purpose only.

    }, {
      key: 'captureStackTrace',
      get: function get() {
        return !!this._captureStackTrace;
      }
    }]);

    return ScrivitoError;
  }(ExtendableError);

  var ClientError = function (_ScrivitoError) {
    _inherits(ClientError, _ScrivitoError);

    function ClientError(message, httpCode, backendCode) {
      _classCallCheck(this, ClientError);

      var _this2 = _possibleConstructorReturn(this, (ClientError.__proto__ || Object.getPrototypeOf(ClientError)).call(this, message));

      _this2.httpCode = httpCode;
      _this2.backendCode = backendCode;
      return _this2;
    }

    _createClass(ClientError, null, [{
      key: 'for',
      value: function _for(message, httpCode, backendCode) {
        if (backendCode === TRANSFORM_SOURCE_TOO_LARGE) {
          return new scrivito.TransformationSourceTooLargeError(message, httpCode, backendCode);
        }

        if (backendCode && backendCode.indexOf(TRANSFORM_SOURCE_ERROR_PREFIX) !== -1) {
          return new scrivito.TransformationSourceInvalidError(message, httpCode, backendCode);
        }

        return new scrivito.ClientError(message, httpCode, backendCode);
      }
    }]);

    return ClientError;
  }(ScrivitoError);

  var AccessDeniedError = function (_ClientError) {
    _inherits(AccessDeniedError, _ClientError);

    function AccessDeniedError(message, httpCode, backendCode) {
      _classCallCheck(this, AccessDeniedError);

      return _possibleConstructorReturn(this, (AccessDeniedError.__proto__ || Object.getPrototypeOf(AccessDeniedError)).call(this, message, httpCode, backendCode));
    }

    return AccessDeniedError;
  }(ClientError);

  // public API


  var ArgumentError = function (_ScrivitoError2) {
    _inherits(ArgumentError, _ScrivitoError2);

    function ArgumentError(message) {
      _classCallCheck(this, ArgumentError);

      return _possibleConstructorReturn(this, (ArgumentError.__proto__ || Object.getPrototypeOf(ArgumentError)).call(this, message));
    }

    return ArgumentError;
  }(ScrivitoError);

  var CommunicationError = function (_ScrivitoError3) {
    _inherits(CommunicationError, _ScrivitoError3);

    function CommunicationError(message, httpCode) {
      _classCallCheck(this, CommunicationError);

      var _this5 = _possibleConstructorReturn(this, (CommunicationError.__proto__ || Object.getPrototypeOf(CommunicationError)).call(this, message));

      _this5.httpCode = httpCode;
      return _this5;
    }

    return CommunicationError;
  }(ScrivitoError);

  var BackendError = function (_CommunicationError) {
    _inherits(BackendError, _CommunicationError);

    function BackendError(message, httpCode) {
      _classCallCheck(this, BackendError);

      return _possibleConstructorReturn(this, (BackendError.__proto__ || Object.getPrototypeOf(BackendError)).call(this, message, httpCode));
    }

    return BackendError;
  }(CommunicationError);

  var InternalError = function (_ScrivitoError4) {
    _inherits(InternalError, _ScrivitoError4);

    function InternalError(message) {
      _classCallCheck(this, InternalError);

      return _possibleConstructorReturn(this, (InternalError.__proto__ || Object.getPrototypeOf(InternalError)).call(this, message));
    }

    return InternalError;
  }(ScrivitoError);

  var NetworkError = function (_CommunicationError2) {
    _inherits(NetworkError, _CommunicationError2);

    function NetworkError(message, httpCode) {
      _classCallCheck(this, NetworkError);

      return _possibleConstructorReturn(this, (NetworkError.__proto__ || Object.getPrototypeOf(NetworkError)).call(this, message, httpCode));
    }

    return NetworkError;
  }(CommunicationError);

  var RateLimitExceededError = function (_CommunicationError3) {
    _inherits(RateLimitExceededError, _CommunicationError3);

    function RateLimitExceededError(message, httpCode) {
      _classCallCheck(this, RateLimitExceededError);

      return _possibleConstructorReturn(this, (RateLimitExceededError.__proto__ || Object.getPrototypeOf(RateLimitExceededError)).call(this, message, httpCode));
    }

    return RateLimitExceededError;
  }(CommunicationError);

  // public API


  var ResourceNotFoundError = function (_ScrivitoError5) {
    _inherits(ResourceNotFoundError, _ScrivitoError5);

    function ResourceNotFoundError(message) {
      _classCallCheck(this, ResourceNotFoundError);

      return _possibleConstructorReturn(this, (ResourceNotFoundError.__proto__ || Object.getPrototypeOf(ResourceNotFoundError)).call(this, message));
    }

    return ResourceNotFoundError;
  }(ScrivitoError);

  var UnauthorizedError = function (_ClientError2) {
    _inherits(UnauthorizedError, _ClientError2);

    function UnauthorizedError(message, httpCode, backendCode) {
      _classCallCheck(this, UnauthorizedError);

      return _possibleConstructorReturn(this, (UnauthorizedError.__proto__ || Object.getPrototypeOf(UnauthorizedError)).call(this, message, httpCode, backendCode));
    }

    return UnauthorizedError;
  }(ClientError);

  // public API


  var TransformationSourceTooLargeError = function (_ClientError3) {
    _inherits(TransformationSourceTooLargeError, _ClientError3);

    function TransformationSourceTooLargeError(message, httpCode, backendCode) {
      _classCallCheck(this, TransformationSourceTooLargeError);

      return _possibleConstructorReturn(this, (TransformationSourceTooLargeError.__proto__ || Object.getPrototypeOf(TransformationSourceTooLargeError)).call(this, message, httpCode, backendCode));
    }

    return TransformationSourceTooLargeError;
  }(ClientError);

  // public API


  var TransformationSourceInvalidError = function (_ClientError4) {
    _inherits(TransformationSourceInvalidError, _ClientError4);

    function TransformationSourceInvalidError(message, httpCode, backendCode) {
      _classCallCheck(this, TransformationSourceInvalidError);

      return _possibleConstructorReturn(this, (TransformationSourceInvalidError.__proto__ || Object.getPrototypeOf(TransformationSourceInvalidError)).call(this, message, httpCode, backendCode));
    }

    return TransformationSourceInvalidError;
  }(ClientError);

  var TranslationError = function (_InternalError) {
    _inherits(TranslationError, _InternalError);

    function TranslationError(message) {
      _classCallCheck(this, TranslationError);

      return _possibleConstructorReturn(this, (TranslationError.__proto__ || Object.getPrototypeOf(TranslationError)).call(this, message));
    }

    return TranslationError;
  }(InternalError);

  var NavigateToEmptyBinaryError = function (_InternalError2) {
    _inherits(NavigateToEmptyBinaryError, _InternalError2);

    function NavigateToEmptyBinaryError(message) {
      _classCallCheck(this, NavigateToEmptyBinaryError);

      return _possibleConstructorReturn(this, (NavigateToEmptyBinaryError.__proto__ || Object.getPrototypeOf(NavigateToEmptyBinaryError)).call(this, message));
    }

    return NavigateToEmptyBinaryError;
  }(InternalError);

  var InterpolationError = function (_TranslationError) {
    _inherits(InterpolationError, _TranslationError);

    function InterpolationError(message) {
      _classCallCheck(this, InterpolationError);

      return _possibleConstructorReturn(this, (InterpolationError.__proto__ || Object.getPrototypeOf(InterpolationError)).call(this, message));
    }

    return InterpolationError;
  }(TranslationError);

  scrivito.ScrivitoError = ScrivitoError;
  scrivito.ClientError = ClientError;
  scrivito.AccessDeniedError = AccessDeniedError;
  scrivito.ArgumentError = ArgumentError;
  scrivito.CommunicationError = CommunicationError;
  scrivito.BackendError = BackendError;
  scrivito.InternalError = InternalError;
  scrivito.NetworkError = NetworkError;
  scrivito.RateLimitExceededError = RateLimitExceededError;
  scrivito.ResourceNotFoundError = ResourceNotFoundError;
  scrivito.UnauthorizedError = UnauthorizedError;

  scrivito.TransformationSourceTooLargeError = TransformationSourceTooLargeError;
  scrivito.TransformationSourceInvalidError = TransformationSourceInvalidError;

  scrivito.TranslationError = TranslationError;
  scrivito.InterpolationError = InterpolationError;

  scrivito.NavigateToEmptyBinaryError = NavigateToEmptyBinaryError;
})();

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var VALID_OPTIONS = ['limit', 'includeObjs'];

  var FacetQuery = function () {
    function FacetQuery(attribute, options, searchQuery) {
      var _this = this;

      _classCallCheck(this, FacetQuery);

      assertValidOptions(options);

      this._requestParams = buildRequestParams(attribute, options, searchQuery);

      this._loadableData = new scrivito.LoadableData({
        state: modelStateFor(this._requestParams),
        loader: function loader() {
          return _this._loadData();
        },
        invalidation: invalidation
      });
    }

    _createClass(FacetQuery, [{
      key: 'result',
      value: function result() {
        var firstFacetResult = _underscore2.default.first(this._loadableData.get().facets);

        return _underscore2.default.map(firstFacetResult, function (rawFacetValue) {
          var name = rawFacetValue.value;
          var count = rawFacetValue.total;
          var includedObjs = _underscore2.default.pluck(rawFacetValue.results, 'id');

          return new scrivito.BasicObjFacetValue(name, count, includedObjs);
        });
      }
    }, {
      key: '_loadData',
      value: function _loadData() {
        var workspaceId = scrivito.currentWorkspaceId();
        return scrivito.CmsRestApi.get('workspaces/' + workspaceId + '/objs/search', this._requestParams);
      }
    }], [{
      key: 'store',
      value: function store(attribute, options, searchQuery, cmsRestApiResponse) {
        assertValidOptions(options);

        var requestParams = buildRequestParams(attribute, options, searchQuery);
        var loadableData = new scrivito.LoadableData({
          state: modelStateFor(requestParams),
          invalidation: invalidation
        });
        loadableData.set(cmsRestApiResponse);
      }
    }]);

    return FacetQuery;
  }();

  function invalidation() {
    return scrivito.ObjReplication.getWorkspaceVersion();
  }

  function modelStateFor(requestParams) {
    var subStateKey = scrivito.computeCacheKey(requestParams);
    return scrivito.cmsState.subState('facetQuery').subState(subStateKey);
  }

  function assertValidOptions(options) {
    var invalidOptions = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(options)].concat(VALID_OPTIONS));
    if (invalidOptions.length) {
      throw new scrivito.ArgumentError('Invalid options: ' + (scrivito.prettyPrint(invalidOptions) + '. Valid options: ' + VALID_OPTIONS));
    }
  }

  function buildRequestParams(attribute, options, searchQuery) {
    var requestParams = {
      facets: [{
        attribute: attribute,
        limit: options.limit || 10,
        include_objs: options.includeObjs || 0
      }],
      size: 0
    };
    if (searchQuery && searchQuery.length) {
      requestParams.query = searchQuery;
    }

    return requestParams;
  }

  scrivito.FacetQuery = FacetQuery;
})();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var isDisabled = false;
  var connectionCounter = 0;

  // For test purpose only
  scrivito.isFetchingActive = function () {
    return connectionCounter > 0;
  };

  // For test purpose only
  scrivito.disableFetching = function () {
    isDisabled = true;
  };

  scrivito.fetch = function (method, url, requestParams, timeout, token) {
    if (isDisabled) {
      return new scrivito.Deferred().promise;
    }

    connectionCounter += 1;

    return new scrivito.Promise(function (resolve, reject) {
      var request = createRequestObj(method, url, timeout, token, resolve, reject);
      request.send(JSON.stringify(requestParams));
    });
  };

  function createRequestObj(method, url, timeout, token, resolve, reject) {
    var request = new XMLHttpRequest();

    request.open(method === 'POST' ? 'POST' : 'PUT', url);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    if (token) {
      request.setRequestHeader('Authorization', 'Session ' + token);
    }

    request.timeout = timeout;
    request.withCredentials = true;

    request.onload = function () {
      return onAjaxLoad(request, resolve, reject);
    };
    request.onerror = function (error) {
      return onAjaxError(error, reject);
    };

    return request;
  }

  function onAjaxLoad(request, resolve, reject) {
    connectionCounter -= 1;

    if (request.status >= 200 && request.status < 300) {
      try {
        return resolve(JSON.parse(request.responseText));
      } catch (error) {
        if (error instanceof SyntaxError) {
          return resolve(request.responseText);
        }

        throw error;
      }
    }

    return reject(request);
  }

  function onAjaxError(error, reject) {
    connectionCounter -= 1;

    reject(new Error('Network Error: ' + error));
  }
})();

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function findWidgetPlacement(objData, widgetId) {
    var placement = findWidgetPlacementIn(objData, widgetId);

    if (placement) {
      return placement;
    }

    var widgetPool = objData._widget_pool;

    _underscore2.default.find(widgetPool, function (parentWidgetData, parentWidgetId) {
      placement = findWidgetPlacementIn(parentWidgetData, widgetId);

      if (placement) {
        placement.parentWidgetId = parentWidgetId;
        return true;
      }
    });

    return placement;
  }

  function findWidgetPlacementIn(objOrWidgetData, widgetId) {
    var placement = void 0;

    _underscore2.default.find(objOrWidgetData, function (attributeDict, attributeName) {
      if (scrivito.Attribute.isSystemAttribute(attributeName)) {
        return;
      }

      var _attributeDict = _slicedToArray(attributeDict, 2),
          attributeType = _attributeDict[0],
          attributeValue = _attributeDict[1];

      if (attributeValue && attributeType === 'widgetlist') {
        var index = attributeValue.indexOf(widgetId);

        if (index !== -1) {
          placement = { attributeName: attributeName, index: index };
          return true;
        }
      }
    });

    return placement;
  }

  scrivito.findWidgetPlacement = findWidgetPlacement;
})();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  // if the UI is present, these modules are "connected" to the UI,
  // i.e. the local client module is replaced with
  // the matching module from the client inside the UI.
  var modulesToConnect = ['BinaryRequest', 'CmsRestApi', 'ObjReplication'];

  function connectModulesToUi(scrivitoUi) {
    modulesToConnect.forEach(function (moduleName) {
      scrivito[moduleName] = scrivitoUi[moduleName];
    });
  }

  var appStateCounter = 0;
  function createAppState() {
    var id = (appStateCounter++).toString();
    return scrivito.globalState.subState('apps').subState(id);
  }

  function setupState(scrivitoUi) {
    if (scrivitoUi) {
      scrivito.globalState = scrivitoUi.globalState;
      scrivito.appState = scrivitoUi.client.createAppState();
    } else {
      scrivito.globalState = new scrivito.StateTree();
      scrivito.appState = createAppState();
    }

    // the state of the CMS content, shared between UI and Apps
    scrivito.cmsState = scrivito.globalState.subState('cms');
  }

  function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        scrivitoUi = _ref.scrivitoUi,
        realmContext = _ref.realmContext;

    if (realmContext) {
      scrivito.Realm.init(realmContext);
    }
    if (scrivitoUi) {
      connectModulesToUi(scrivitoUi);
    }
    setupState(scrivitoUi);
  }

  // export
  scrivito.client.init = init;
  scrivito.client.createAppState = createAppState;
})();

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  _underscore2.default.extend(scrivito, {
    iterable: {
      collectValuesFromIterator: function collectValuesFromIterator(iterator) {
        var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var _iterator$next = iterator.next(),
            value = _iterator$next.value,
            done = _iterator$next.done;

        if (done) {
          return result;
        }

        return this.collectValuesFromIterator(iterator, [].concat(_toConsumableArray(result), [value]));
      },
      firstValueFromIterator: function firstValueFromIterator(iterator) {
        var _iterator$next2 = iterator.next(),
            value = _iterator$next2.value;

        return value || null;
      }
    }
  });
})();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function loadAllUntil(iterator, size) {
    var objs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var run = scrivito.LoadableData.run(function () {
      return iterator.next();
    });

    if (!run.success) {
      return { done: false, objs: objs };
    }

    var _run$result = run.result,
        obj = _run$result.value,
        done = _run$result.done;


    if (done || size === 0) {
      return { done: done, objs: objs };
    }

    return loadAllUntil(iterator, size - 1, objs.concat([obj]));
  }

  scrivito.loadAllUntil = loadAllUntil;
})();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  // loadAsync triggers the loading of all resource that the passed in
  // function needs and returns a Promise to the result of the function.
  //
  // It can be used to convert synchronous code (the loadable function)
  // into asynchronous code (Promise to the return value).
  //
  // A loadable function is a function that:
  // * may throw a NotLoadedError
  // * is pure, i.e. idempotent, doesn't perform I/O, is free of side-effects
  //
  // loadAsync will run the provided function as many times as needed,
  // and trigger loading of any NotLoadedError that should occur.
  //
  // It returns a Promise that fulfills once the function returns a value.
  // If the function throws an Exception (other than NotLoadedError),
  // the Promise is rejected.
  function loadAsync(loadableFunction) {
    function tryToSettle() {
      var run = void 0;

      var captured = scrivito.LoadableData.capture(function () {
        run = scrivito.LoadableData.run(loadableFunction);
      });

      if (run.success) {
        return run.result;
      }

      return captured.loadMissingData().then(tryToSettle);
    }

    return new scrivito.Promise(function (resolve) {
      return resolve(tryToSettle());
    });
  }

  // export
  scrivito.loadAsync = loadAsync;
})();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var loadIdCounter = 0;

  var useEventualConsistency = false;
  var captureNotLoadedStackTrace = true;
  var dataToReload = void 0;
  var globalCaptureList = void 0;

  // An instance of LoadableData might be in one of these states:
  var MISSING = undefined;
  var AVAILABLE = 'AVAILABLE';
  var ERROR = 'ERROR';

  // Additionally, it may either be loading or not loading.

  // Usually, the value goes through the following transitions:
  // (missing, not loading)  -> (missing, loading) -> (available, not loading)
  // However when something goes wrong, this transition might occur:
  // (missing, not loading)  -> (missing, loading) -> (error, not loading)
  //
  // Other transitions are also valid,
  // i.e. all possible transtions may eventually occur.

  // use this for any errors that are expected by the higher layers (data or model).
  // the expected errors are stored differently from unexpected errors:
  // expected errors are stored in a "serialized" form (without stacktrace)
  // this enables them to be "caught" safely across javascript (iframe) boundaries.
  var expectedErrors = [scrivito.ResourceNotFoundError];

  var LoadableData = function () {
    _createClass(LoadableData, null, [{
      key: 'withEventualConsistency',

      // execute the given function with eventual consistency.
      // when using eventual consistency, LoadableData is not invalidated immediately.
      // instead, the outdated data remains available, while an updated version
      // of the data is loaded in the background. this reduces flicker in the UI.
      value: function withEventualConsistency(fn) {
        if (useEventualConsistency) {
          throw new scrivito.InternalError('withEventualConsistency should not be nested!');
        }

        try {
          useEventualConsistency = true;
          dataToReload = [];

          return fn();
        } finally {
          var collectedData = dataToReload;
          dataToReload = undefined;

          useEventualConsistency = false;

          _underscore2.default.each(collectedData, function (data) {
            return data.triggerLoading();
          });
        }
      }
    }, {
      key: 'throwNotLoaded',
      value: function throwNotLoaded(loader) {
        throw new scrivito.NotLoadedError(loader, captureNotLoadedStackTrace);
      }
    }, {
      key: 'capture',
      value: function capture(fn) {
        var globalCaptureBefore = globalCaptureList;
        try {
          globalCaptureList = [];

          fn();

          var capturedLoaders = globalCaptureList;

          return {
            loadMissingData: function loadMissingData() {
              if (capturedLoaders.length === 0) {
                // without this, a resolved promise would be returned.
                // a careless caller could easily produce a hard-to-debug infinite loop.
                // returning no promise lets a careless caller fail early - easier to debug.
                return null;
              }

              return scrivito.Promise.all(capturedLoaders.map(function (loader) {
                return loader();
              }));
            }
          };
        } finally {
          globalCaptureList = globalCaptureBefore;
        }
      }
    }, {
      key: 'run',
      value: function run(loadableFunction) {
        try {
          return {
            success: true,
            result: withoutNotLoadedStackTrace(loadableFunction)
          };
        } catch (error) {
          if (!scrivito.isNotLoadedError(error)) {
            throw error;
          }

          if (globalCaptureList) {
            globalCaptureList.push(function () {
              var deferred = new scrivito.Deferred();
              error.load(function () {
                return deferred.resolve();
              });

              return deferred.promise;
            });
          }

          return {
            success: false
          };
        }
      }

      // state is the stateContainer where the LoadableData should store its state.

    }]);

    function LoadableData(_ref) {
      var state = _ref.state,
          loader = _ref.loader,
          invalidation = _ref.invalidation;

      _classCallCheck(this, LoadableData);

      if (!state) {
        throw new scrivito.InternalError('LoadableData needs state');
      }
      this._value = new scrivito.LoadableValue(state);
      this._loader = loader;
      this._invalidation = invalidation;
    }

    // Access the LoadableData synchronously, assuming it is available.
    // If the LoadableData is an error, the error is thrown.
    // If the LoadableData is missing or loading,
    // a NotLoadedError is thrown, with the provided loader function.


    _createClass(LoadableData, [{
      key: 'get',
      value: function get() {
        var _this = this;

        if (!this._treatAsInvalidated()) {
          if (this.isAvailable()) {
            return this._value.value();
          }

          if (this.isError()) {
            throw this._hydrateError(this._value.value());
          }
        }

        LoadableData.throwNotLoaded(function () {
          if (_this.isAvailable() || _this.isError()) {
            return scrivito.Promise.resolve();
          }

          _this.triggerLoading();

          return _this._promiseForNextChange();
        });
      }

      // set the data to a value. this makes the value available.

    }, {
      key: 'set',
      value: function set(value) {
        this._value.transitionTo(AVAILABLE, value, this._currentVersion());
      }

      // set the data to an error.

    }, {
      key: 'setError',
      value: function setError(error) {
        if (scrivito.isNotLoadedError(error)) {
          // prevent setting a NotLoadedError, since that would
          // unravel the space-time continuum and destroy the world.
          var warning = new scrivito.InternalError('tried to set a Loadable to a NotLoadedError');
          this._transitionToError(warning);

          throw warning;
        }

        this._transitionToError(error);
      }

      // transition back to missing, removes any value or errors.

    }, {
      key: 'reset',
      value: function reset() {
        this._value.transitionTo(MISSING);
      }

      // returns true iff the value is missing

    }, {
      key: 'isMissing',
      value: function isMissing() {
        if (this._treatAsInvalidated()) {
          return true;
        }
        return this._value.status() === MISSING;
      }

      // returns true iff the value not available and not an error, but
      // has started loading.

    }, {
      key: 'isLoading',
      value: function isLoading() {
        return this._value.getLoading() !== undefined;
      }

      // return true iff value is available.

    }, {
      key: 'isAvailable',
      value: function isAvailable() {
        if (this._treatAsInvalidated()) {
          return false;
        }
        return this._value.status() === AVAILABLE;
      }

      // return true iff an error was set.

    }, {
      key: 'isError',
      value: function isError() {
        if (this._treatAsInvalidated()) {
          return false;
        }
        return this._value.status() === ERROR;
      }

      // trigger loading the data. does nothing if the data is already loading.

    }, {
      key: 'triggerLoading',
      value: function triggerLoading() {
        var _this2 = this;

        if (this.isLoading()) {
          return;
        }

        var loadId = loadIdCounter++;

        var ifUnchanged = function ifUnchanged(fn) {
          if (_this2._value.getLoading() === loadId) {
            fn();
          }
        };

        var versionWhenLoadingStarted = this._currentVersion();

        var pushCallbacks = [];
        var addPushCallback = function addPushCallback(callback) {
          return pushCallbacks.push(callback);
        };
        var runPushCallbacks = function runPushCallbacks() {
          return pushCallbacks.forEach(function (callback) {
            return callback();
          });
        };

        this._loader(addPushCallback).then(function (result) {
          return ifUnchanged(function () {
            return scrivito.batchedStateUpdater.add(function () {
              _this2._value.transitionTo(AVAILABLE, result, versionWhenLoadingStarted);
              runPushCallbacks();
            });
          });
        }, function (error) {
          return ifUnchanged(function () {
            return scrivito.batchedStateUpdater.add(function () {
              _this2._transitionToError(error, versionWhenLoadingStarted);
              runPushCallbacks();
            });
          });
        });

        this._value.setLoading(loadId);
      }
    }, {
      key: '_transitionToError',
      value: function _transitionToError(error) {
        var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._currentVersion();

        this._value.transitionTo(ERROR, this._dehydrateError(error), version);
      }
    }, {
      key: '_dehydrateError',
      value: function _dehydrateError(error) {
        var id = expectedErrors.indexOf(error.constructor);
        if (id >= 0) {
          return { id: id, message: error.message };
        }

        return { error: error };
      }
    }, {
      key: '_hydrateError',
      value: function _hydrateError(stored) {
        var id = stored.id;
        if (id !== undefined) {
          var klass = expectedErrors[id];

          return new klass(stored.message);
        }

        var rawError = stored.error;
        if (rawError) {
          return rawError;
        }

        throw new scrivito.InternalError('could not hydrate error');
      }
    }, {
      key: '_promiseForNextChange',
      value: function _promiseForNextChange() {
        var deferred = new scrivito.Deferred();

        var unsubscribe = this._value.subscribe(function () {
          deferred.resolve();
          unsubscribe();
        });

        return deferred.promise;
      }
    }, {
      key: '_treatAsInvalidated',
      value: function _treatAsInvalidated() {
        if (!this._hasBeenInvalidated()) {
          return false;
        }

        if (useEventualConsistency) {
          dataToReload.push(this);

          return false;
        }

        return true;
      }
    }, {
      key: '_hasBeenInvalidated',
      value: function _hasBeenInvalidated() {
        if (!this._invalidation) {
          return false;
        }

        return this._currentVersion() !== this._value.version();
      }
    }, {
      key: '_currentVersion',
      value: function _currentVersion() {
        var callback = this._invalidation;
        if (!callback) {
          return undefined;
        }

        var version = callback();

        // protect against "crazy" objects like NaN
        if (typeof version === 'number' && isNaN(version)) {
          var message = 'invalidation callback returned unsuitable version ' + version;
          throw new scrivito.InternalError(message);
        }

        return version;
      }
    }]);

    return LoadableData;
  }();

  function withoutNotLoadedStackTrace(fn) {
    var beforeStackTrace = captureNotLoadedStackTrace;

    try {
      captureNotLoadedStackTrace = false;

      return fn();
    } finally {
      captureNotLoadedStackTrace = beforeStackTrace;
    }
  }

  // export
  scrivito.LoadableData = LoadableData;
})();

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var loadingState = {};

  var EMPTY_STATE = {};

  // A wrapper around a value that is retrieved asynchronously.
  // This class is stateless and (almost) pure:
  // * it does not perform any I/O
  // * the only side-effect it has is changing the provided state container
  // * it does not keep any state itself
  // * state is replaced, not mutated
  // * it does not use Promises

  var LoadableValue = function () {
    _createClass(LoadableValue, null, [{
      key: 'resetLoadingState',
      value: function resetLoadingState() {
        loadingState = {};
      }

      // stateContainer is where the LoadableValue should store its state.

    }]);

    function LoadableValue(stateContainer) {
      _classCallCheck(this, LoadableValue);

      if (!stateContainer) {
        throw new scrivito.InternalError('LoadableValue needs stateContainer');
      }
      this._container = stateContainer;
      this._id = stateContainer.id();
    }

    // store a loadId to identify the current load operation.
    // this allows you to distinguish different load operations
    // to facilitate concurrency protection, like optimistic locking.
    // loadId may be any kind of JS object.


    _createClass(LoadableValue, [{
      key: 'setLoading',
      value: function setLoading(loadId) {
        loadingState[this._id] = loadId;
      }

      // return the current loadId. should only be called if loading.

    }, {
      key: 'getLoading',
      value: function getLoading() {
        return loadingState[this._id];
      }
    }, {
      key: 'subscribe',
      value: function subscribe(listener) {
        return this._container.subscribe(listener);
      }
    }, {
      key: 'status',
      value: function status() {
        return this._getState().status;
      }
    }, {
      key: 'value',
      value: function value() {
        return this._getState().value;
      }
    }, {
      key: 'version',
      value: function version() {
        return this._getState().version;
      }
    }, {
      key: 'transitionTo',
      value: function transitionTo(status, value, version) {
        delete loadingState[this._id];
        this._container.set({ status: status, value: value, version: version });
      }
    }, {
      key: '_getState',
      value: function _getState() {
        return this._container.get() || EMPTY_STATE;
      }
    }]);

    return LoadableValue;
  }();

  // export


  scrivito.LoadableValue = LoadableValue;
})();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function loadableWithDefault(theDefault, loadableFunction) {
    var run = scrivito.LoadableData.run(loadableFunction);

    return run.success ? run.result : theDefault;
  }

  // export
  scrivito.loadableWithDefault = loadableWithDefault;

  // legacy, keeping this for now to avoid conflicts.
  scrivito.loadWithDefault = loadableWithDefault;
})();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function mapAndLoadParallel(list, iteratee) {
    var results = [];

    _underscore2.default.each(list, function (item) {
      var run = scrivito.LoadableData.run(function () {
        return iteratee(item);
      });

      if (run.success) {
        results.push(run.result);
      }
    });

    if (results.length < list.length) {
      scrivito.LoadableData.throwNotLoaded(function () {
        return scrivito.Promise.resolve();
      });
    }

    return results;
  }

  scrivito.mapAndLoadParallel = mapAndLoadParallel;
})();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  /**
    * A `NotLoadedError` is thrown when data is accessed in a synchronous fashion but is not yet
    * available locally. For example {@link scrivito.BasicObj.get} throws a `NotLoadedError`
    * whenever a CMS object is accessed that is not yet cached in the browser.
    */
  var NotLoadedError = function (_scrivito$ScrivitoErr) {
    _inherits(NotLoadedError, _scrivito$ScrivitoErr);

    function NotLoadedError(loader, captureStackTrace) {
      _classCallCheck(this, NotLoadedError);

      var _this = _possibleConstructorReturn(this, (NotLoadedError.__proto__ || Object.getPrototypeOf(NotLoadedError)).call(this, 'Data is not yet loaded.', captureStackTrace));

      _this._loader = loader;
      return _this;
    }

    _createClass(NotLoadedError, [{
      key: 'load',
      value: function load(onLoadingDone) {
        var loadPromise = this._loader();

        if (onLoadingDone) {
          var done = function done() {
            scrivito.nextTick(onLoadingDone);
          };
          loadPromise.then(done, done);
        }
      }

      // this getter has an extravagant name, in order to avoid name clashes

    }, {
      key: 'scrivitoPrivateIsNotLoadedError',
      get: function get() {
        return true;
      }
    }]);

    return NotLoadedError;
  }(scrivito.ScrivitoError);

  function isNotLoadedError(error) {
    // using duck-typing instead of "instanceof", so that these errors
    // can be recognized across javascript (iframe) boundaries.
    return error && error.scrivitoPrivateIsNotLoadedError;
  }

  // export
  scrivito.NotLoadedError = NotLoadedError;
  scrivito.isNotLoadedError = isNotLoadedError;
})();

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  function AppClassFactory(definition, parent) {
    var schema = new scrivito.Schema(definition, parent);

    return function (_parent) {
      _inherits(_class, _parent);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      _createClass(_class, null, [{
        key: "_scrivitoPrivateSchema",
        get: function get() {
          return schema;
        }
      }]);

      return _class;
    }(parent);
  }

  scrivito.AppClassFactory = AppClassFactory;
})();

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AppModelAccessor = function () {
    function AppModelAccessor(registry) {
      _classCallCheck(this, AppModelAccessor);

      this._registry = registry;
    }

    _createClass(AppModelAccessor, [{
      key: 'read',
      value: function read(model, attributeName) {
        var schema = scrivito.Schema.forInstance(model);
        if (!schema) {
          return;
        }

        var typeInfo = schema.attributes[attributeName];
        if (!typeInfo) {
          return;
        }

        var internalValue = model._scrivitoPrivateContent.get(attributeName, typeInfo);
        return scrivito.wrapInAppClass(this._registry, internalValue);
      }
    }, {
      key: 'update',
      value: function update(model, attributes) {
        var appClassName = this._registry.objClassNameFor(model.constructor);
        if (!appClassName) {
          var baseClass = void 0;

          if (model.constructor === this._registry.defaultClassForObjs) {
            baseClass = 'Obj';
          } else {
            baseClass = 'Widget';
          }

          throw new scrivito.ArgumentError('Updating is not supported on the base class "' + baseClass + '".');
        }

        if (attributes.constructor !== Object) {
          throw new scrivito.ArgumentError('The provided attributes are invalid. They have ' + 'to be an Object with valid Scrivito attribute values.');
        }

        var schema = scrivito.Schema.forInstance(model);
        var attributesWithTypeInfo = scrivito.AttributeContentFactory.prepareAttributes(attributes, schema, appClassName);
        model._scrivitoPrivateContent.update(attributesWithTypeInfo);
      }
    }]);

    return AppModelAccessor;
  }();

  scrivito.AppModelAccessor = AppModelAccessor;
})();

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _obj_class = __webpack_require__(5);

var _obj_class2 = _interopRequireDefault(_obj_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.Attribute = function () {
    _createClass(Attribute, null, [{
      key: 'isSystemAttribute',
      value: function isSystemAttribute(name) {
        return name[0] === '_';
      }
    }]);

    function Attribute(attributeData) {
      _classCallCheck(this, Attribute);

      this.name = attributeData.name;
      this.type = attributeData.type;
      this._validClassNames = attributeData.validClasses;
      this._validValues = attributeData.validValues;
    }

    // public

    _createClass(Attribute, [{
      key: 'validValues',
      value: function validValues() {
        this._assertValidTypes(['enum', 'multienum'], 'Only enum and multienum attributes can have valid values');
        return this._validValues || [];
      }
    }, {
      key: 'validClasses',
      value: function validClasses() {
        this._assertValidTypes(['reference', 'referencelist'], 'Only reference and referencelist attributes can have valid classes');

        if (this._validClassNames) {
          return _underscore2.default.map(this._validClassNames, function (name) {
            return _obj_class2.default.find(name);
          });
        }
      }

      // private

    }, {
      key: '_assertValidTypes',
      value: function _assertValidTypes(validTypes, errorMessage) {
        if (!_underscore2.default.include(validTypes, this.type)) {
          $.error(errorMessage);
        }
      }
    }]);

    return Attribute;
  }();
})();

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  function AttributeContentFactory(appModelAccessor) {
    var AttributeContent = function () {
      function AttributeContent() {
        _classCallCheck(this, AttributeContent);
      }

      _createClass(AttributeContent, [{
        key: 'finishSaving',


        /**
         * Resolves when all previous updates have been persisted.
         * If an update fails the promise is rejected.
         *
         * @returns {Promise}
         */
        value: function finishSaving() {
          return this._scrivitoPrivateContent.finishSaving();
        }

        // public API

      }, {
        key: 'get',
        value: function get(attributeName) {
          return appModelAccessor.read(this, attributeName);
        }

        // public API

      }, {
        key: 'update',
        value: function update(attributes) {
          appModelAccessor.update(this, attributes);
        }
      }, {
        key: 'id',

        // public API
        get: function get() {
          return this._scrivitoPrivateContent.id;
        }

        // public API

      }, {
        key: 'objClass',
        get: function get() {
          return this._scrivitoPrivateContent.objClass;
        }
      }]);

      return AttributeContent;
    }();

    return AttributeContent;
  }

  function prepareAttributes(attributes, schema, appClassName) {
    return _underscore2.default.mapObject(attributes, function (value, name) {
      if (scrivito.Attribute.isSystemAttribute(name)) {
        return [value];
      }
      var typeInfo = schema.attributes[name];

      if (!typeInfo) {
        throw new scrivito.ArgumentError('Attribute "' + name + '" is not defined for CMS object ' + ('class "' + appClassName + '".'));
      }

      var unwrappedValue = scrivito.unwrapAppClassValues(value);
      return [unwrappedValue, typeInfo];
    });
  }

  scrivito.AttributeContentFactory = AttributeContentFactory;
  scrivito.AttributeContentFactory.prepareAttributes = prepareAttributes;
})();

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.AttributeDeserializer = {
    deserialize: function deserialize(model, rawValue, type, options) {
      var _rawValue = _slicedToArray(rawValue, 2),
          typeFromBackend = _rawValue[0],
          valueFromBackend = _rawValue[1];

      switch (type) {
        case 'binary':
          return deserializeBinaryValue(typeFromBackend, valueFromBackend);
        case 'date':
          return deserializeDateValue(typeFromBackend, valueFromBackend);
        case 'float':
          return deserializeFloatValue(typeFromBackend, valueFromBackend);
        case 'enum':
          return deserializeEnumValue(typeFromBackend, valueFromBackend, options);
        case 'html':
          return deserializeHtmlValue(typeFromBackend, valueFromBackend);
        case 'integer':
          return deserializeIntegerValue(typeFromBackend, valueFromBackend);
        case 'link':
          return deserializeLinkValue(typeFromBackend, valueFromBackend);
        case 'linklist':
          return deserializeLinklistValue(typeFromBackend, valueFromBackend);
        case 'multienum':
          return deserializeMultienumValue(typeFromBackend, valueFromBackend, options);
        case 'reference':
          return deserializeReferenceValue(typeFromBackend, valueFromBackend);
        case 'referencelist':
          return deserializeReferencelistValue(typeFromBackend, valueFromBackend);
        case 'string':
          return deserializeStringValue(typeFromBackend, valueFromBackend);
        case 'stringlist':
          return deserializeStringlistValue(typeFromBackend, valueFromBackend);
        case 'widgetlist':
          return deserializeWidgetlistValue(typeFromBackend, valueFromBackend, model);
      }
    }
  };

  function deserializeBinaryValue(typeFromBackend, valueFromBackend) {
    if (typeFromBackend === 'binary' && valueFromBackend) {
      var binaryId = valueFromBackend.id;
      var isPublic = scrivito.currentWorkspaceId() === 'published';

      return new scrivito.Binary(binaryId, isPublic).transform({});
    }

    return null;
  }

  function deserializeDateValue(typeFromBackend, valueFromBackend) {
    if (typeFromBackend !== 'date') {
      return null;
    }

    return scrivito.types.deserializeAsDate(valueFromBackend);
  }

  function deserializeHtmlValue(typeFromBackend, valueFromBackend) {
    if (_underscore2.default.contains(['html', 'string'], typeFromBackend) && _underscore2.default.isString(valueFromBackend)) {
      return valueFromBackend;
    }

    return '';
  }

  function deserializeEnumValue(typeFromBackend, valueFromBackend, _ref) {
    var validValues = _ref.validValues;

    if (typeFromBackend === 'string' && _underscore2.default.contains(validValues, valueFromBackend)) {
      return valueFromBackend;
    }

    return null;
  }

  function deserializeMultienumValue(typeFromBackend, valueFromBackend, _ref2) {
    var validValues = _ref2.validValues;

    if (typeFromBackend !== 'stringlist' || !Array.isArray(valueFromBackend)) {
      return [];
    }

    return _underscore2.default.intersection(valueFromBackend, validValues);
  }

  function deserializeFloatValue(typeFromBackend, valueFromBackend) {
    switch (typeFromBackend) {
      case 'string':
        if (valueFromBackend.match(/^-?\d+(\.\d+)?$/)) {
          return convertToFloat(valueFromBackend);
        }
        return null;
      case 'number':
        return convertToFloat(valueFromBackend);
      default:
        return null;
    }
  }

  function convertToFloat(valueFromBackend) {
    var floatValue = parseFloat(valueFromBackend);

    if (scrivito.types.isValidFloat(floatValue)) {
      return floatValue;
    }

    return null;
  }

  function deserializeIntegerValue(typeFromBackend, valueFromBackend) {
    switch (typeFromBackend) {
      case 'string':
      case 'number':
        return scrivito.types.deserializeAsInteger(valueFromBackend);
      default:
        return null;
    }
  }

  function deserializeLinkValue(typeFromBackend, valueFromBackend) {
    if (typeFromBackend !== 'link' || !_underscore2.default.isObject(valueFromBackend)) {
      return null;
    }

    return convertToLink(valueFromBackend);
  }

  function deserializeLinklistValue(_typeFromBackend, valueFromBackend) {
    if (!_underscore2.default.isArray(valueFromBackend)) {
      return [];
    }

    return _underscore2.default.map(valueFromBackend, convertToLink);
  }

  function convertToLink(valueFromBackend) {
    var linkParams = _underscore2.default.pick(valueFromBackend, 'title', 'query', 'fragment', 'target', 'url');
    linkParams.objId = valueFromBackend.obj_id;
    return scrivito.BasicLink.build(linkParams);
  }

  function convertReferenceToBasicObj(valueFromBackend) {
    try {
      return scrivito.BasicObj.get(valueFromBackend);
    } catch (e) {
      if (e instanceof scrivito.ResourceNotFoundError) {
        return null;
      }
      throw e;
    }
  }

  function deserializeReferenceValue(typeFromBackend, valueFromBackend) {
    if (typeFromBackend === 'reference' && valueFromBackend) {
      return convertReferenceToBasicObj(valueFromBackend);
    }

    return null;
  }

  function deserializeReferencelistValue(typeFromBackend, valueFromBackend) {
    if (typeFromBackend !== 'referencelist') {
      return [];
    }

    if (!valueFromBackend) {
      return [];
    }

    var objs = scrivito.mapAndLoadParallel(valueFromBackend, convertReferenceToBasicObj);

    return _underscore2.default.compact(objs);
  }

  function deserializeStringValue(typeFromBackend, valueFromBackend) {
    if (_underscore2.default.contains(['html', 'string'], typeFromBackend) && _underscore2.default.isString(valueFromBackend)) {
      return valueFromBackend;
    }

    return '';
  }

  function deserializeStringlistValue(typeFromBackend, valueFromBackend) {
    if (typeFromBackend !== 'stringlist' || !Array.isArray(valueFromBackend)) {
      return [];
    }

    return valueFromBackend;
  }

  function deserializeWidgetlistValue(typeFromBackend, valueFromBackend, model) {
    if (typeFromBackend !== 'widgetlist') {
      return [];
    }

    return _underscore2.default.map(valueFromBackend, function (widgetId) {
      return model.widget(widgetId);
    });
  }
})();

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.BasicAttributeContent = function () {
    function BasicAttributeContent() {
      _classCallCheck(this, BasicAttributeContent);
    }

    _createClass(BasicAttributeContent, [{
      key: 'get',
      value: function get(attributeName, typeInfo) {
        if (!scrivito.attributeInflection.isCamelCase(attributeName)) {
          throw new scrivito.ArgumentError('Attribute names have to be in camel case.');
        }
        var internalAttributeName = scrivito.attributeInflection.underscore(attributeName);

        if (scrivito.Attribute.isSystemAttribute(internalAttributeName)) {
          if (_underscore2.default.has(this._systemAttributes, internalAttributeName)) {
            return this[this._systemAttributes[internalAttributeName]];
          }

          return undefined;
        }

        var _scrivito$typeInfo$no = scrivito.typeInfo.normalize(typeInfo),
            _scrivito$typeInfo$no2 = _slicedToArray(_scrivito$typeInfo$no, 2),
            type = _scrivito$typeInfo$no2[0],
            options = _scrivito$typeInfo$no2[1];

        var rawValue = this._current[internalAttributeName];
        if (!rawValue || !_underscore2.default.isArray(rawValue)) {
          rawValue = [];
        }

        return scrivito.AttributeDeserializer.deserialize(this, rawValue, type, options);
      }
    }, {
      key: 'field',
      value: function field(attributeName, typeInfo) {
        return new scrivito.BasicField({ container: this, attributeName: attributeName, typeInfo: typeInfo });
      }
    }, {
      key: 'widget',
      value: function widget(_id) {
        throw new TypeError('Override in subclass.');
      }
    }, {
      key: 'serializeAttributes',
      value: function serializeAttributes() {
        var _this = this;

        var serializedAttrs = {};
        _underscore2.default.each(this._current, function (value, name) {
          if (_underscore2.default.isArray(value) && _underscore2.default.first(value) === 'widgetlist') {
            var publicAttrName = scrivito.attributeInflection.camelCase(name);
            var serializedAttributes = _underscore2.default.invoke(_this.get(publicAttrName, ['widgetlist']), 'serializeAttributes');
            serializedAttrs[name] = ['widgetlist', serializedAttributes];

            return;
          }

          serializedAttrs[name] = value;
        });

        return serializedAttrs;
      }
    }, {
      key: '_persistWidgets',
      value: function _persistWidgets(obj, attributes) {
        _underscore2.default.each(attributes, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              widgets = _ref2[0],
              typeInfo = _ref2[1];

          if (typeInfo && typeInfo[0] === 'widgetlist') {
            _underscore2.default.each(widgets, function (widget) {
              if (!widget.isPersisted()) {
                widget.persistInObj(obj);
              }
            });
          }
        });
      }
    }, {
      key: '_objClass',
      get: function get() {
        throw new TypeError('Override in subclass.');
      }
    }, {
      key: '_current',
      get: function get() {
        throw new TypeError('Override in subclass.');
      }
    }]);

    return BasicAttributeContent;
  }();
})();

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var BasicField = function () {
    function BasicField(_ref) {
      var container = _ref.container,
          attributeName = _ref.attributeName,
          typeInfo = _ref.typeInfo;

      _classCallCheck(this, BasicField);

      this._container = container;
      this._attributeName = attributeName;
      this._typeInfo = typeInfo;
    }

    _createClass(BasicField, [{
      key: 'get',
      value: function get() {
        return this._container.get(this.name(), this._typeInfo);
      }
    }, {
      key: 'update',
      value: function update(newValue) {
        this._container.update(_defineProperty({}, this.name(), [newValue, this._typeInfo]));
      }
    }, {
      key: 'container',
      value: function container() {
        return this._container;
      }
    }, {
      key: 'name',
      value: function name() {
        return this._attributeName;
      }
    }, {
      key: 'equals',
      value: function equals(other) {
        if (!(other instanceof scrivito.BasicField)) {
          return false;
        }

        return this.container().equals(other.container()) && this.name() === other.name();
      }
    }, {
      key: 'toString',
      value: function toString() {
        var _dataForId2 = this._dataForId(),
            name = _dataForId2.name,
            objId = _dataForId2.objId,
            widgetId = _dataForId2.widgetId;

        var stringRepresentation = '<BasicField name=' + name + ' objId=' + objId;

        if (widgetId) {
          stringRepresentation += ' widgetId=' + widgetId + '>';
        } else {
          stringRepresentation += '>';
        }

        return stringRepresentation;
      }
    }, {
      key: 'id',
      value: function id() {
        var _dataForId3 = this._dataForId(),
            name = _dataForId3.name,
            objId = _dataForId3.objId,
            widgetId = _dataForId3.widgetId;

        var id = name + '|' + objId;

        if (widgetId) {
          id += '|' + widgetId;
        }

        return id;
      }
    }, {
      key: '_dataForId',
      value: function _dataForId() {
        var jsonHash = { name: this.name() };

        var container = this.container();
        if (container instanceof scrivito.BasicObj) {
          jsonHash.objId = container.id;
        } else {
          jsonHash.objId = container.obj.id;
          jsonHash.widgetId = container.id;
        }

        return jsonHash;
      }
    }]);

    return BasicField;
  }();

  scrivito.BasicField = BasicField;
})();

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var allowedAttributes = ['fragment', 'obj', 'query', 'target', 'title', 'url'];

  scrivito.BasicLink = function () {
    _createClass(BasicLink, null, [{
      key: 'build',
      value: function build(attributes) {
        var objId = attributes.objId;
        delete attributes.objId;
        var link = new this(attributes);
        if (objId) {
          link._objId = objId;
        }

        return link;
      }
    }]);

    function BasicLink(attributes) {
      _classCallCheck(this, BasicLink);

      assertValidPublicAttributes(attributes);

      this._fragment = attributes.fragment || null;
      this._query = attributes.query || null;
      this._target = attributes.target || null;
      this._title = attributes.title || null;
      this._url = attributes.url || null;

      this._objId = null;
      if (attributes.obj) {
        this._objId = attributes.obj.id;
      }
    }

    // public API


    _createClass(BasicLink, [{
      key: 'fetchObj',
      value: function fetchObj() {
        if (this.isExternal()) {
          return scrivito.PublicPromise.reject(new scrivito.ScrivitoError('The link is external and does not reference an object.'));
        }
        return scrivito.BasicObj.fetch(this.objId);
      }

      // public API

    }, {
      key: 'isExternal',
      value: function isExternal() {
        return !!this.url;
      }

      // public API

    }, {
      key: 'isInternal',
      value: function isInternal() {
        return !this.isExternal();
      }

      // public API

    }, {
      key: 'copy',
      value: function copy(attributes) {
        assertValidPublicAttributes(attributes);

        var newAttributes = this.buildAttributes();
        if (_underscore2.default.has(attributes, 'obj')) {
          delete newAttributes.objId;
        }
        _underscore2.default.extend(newAttributes, attributes);

        return this.constructor.build(newAttributes);
      }
    }, {
      key: 'buildAttributes',
      value: function buildAttributes() {
        return _underscore2.default.pick(this, 'title', 'query', 'fragment', 'target', 'url', 'objId');
      }
    }, {
      key: 'title',
      get: function get() {
        return this._title;
      }

      // public API

    }, {
      key: 'query',
      get: function get() {
        return this._query;
      }

      // public API

    }, {
      key: 'fragment',
      get: function get() {
        return this._fragment;
      }

      // public API

    }, {
      key: 'target',
      get: function get() {
        return this._target;
      }

      // public API

    }, {
      key: 'url',
      get: function get() {
        return this._url;
      }

      // public API

    }, {
      key: 'objId',
      get: function get() {
        return this._objId;
      }
    }, {
      key: 'obj',
      get: function get() {
        if (this.objId) {
          return scrivito.BasicObj.get(this.objId);
        }

        return null;
      }
    }]);

    return BasicLink;
  }();

  function assertValidPublicAttributes(attributes) {
    var unknownAttrs = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(attributes)].concat(allowedAttributes));
    if (!_underscore2.default.isEmpty(unknownAttrs)) {
      throw new scrivito.ArgumentError('Unexpected attributes ' + scrivito.prettyPrint(unknownAttrs) + '.' + (' Available attributes: ' + scrivito.prettyPrint(allowedAttributes)));
    }
  }
})();

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _random = __webpack_require__(4);

var _obj_class = __webpack_require__(5);

var _obj_class2 = _interopRequireDefault(_obj_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var SYSTEM_ATTRIBUTES = {
    _id: 'id',
    _obj_class: 'objClass',
    _path: 'path',
    _permalink: 'permalink',
    _last_changed: 'lastChanged'
  };

  scrivito.BasicObj = function (_scrivito$BasicAttrib) {
    _inherits(BasicObj, _scrivito$BasicAttrib);

    _createClass(BasicObj, null, [{
      key: 'fetch',
      value: function fetch(_id) {
        scrivito.asyncMethodStub();
      }
    }, {
      key: 'fetchIncludingDeleted',
      value: function fetchIncludingDeleted(_id) {
        scrivito.asyncMethodStub();
      }
    }, {
      key: 'get',
      value: function get(idOrList) {
        var _this2 = this;

        if (_underscore2.default.isArray(idOrList)) {
          return scrivito.mapAndLoadParallel(idOrList, function (id) {
            return _this2.get(id);
          });
        }

        var obj = this.getIncludingDeleted(idOrList);

        if (obj.isDeleted()) {
          throwObjNotFound(idOrList);
        }

        return obj;
      }
    }, {
      key: 'getIncludingDeleted',
      value: function getIncludingDeleted(idOrList) {
        var _this3 = this;

        if (_underscore2.default.isArray(idOrList)) {
          return scrivito.mapAndLoadParallel(idOrList, function (id) {
            return _this3.getIncludingDeleted(id);
          });
        }

        var objData = scrivito.ObjDataStore.get(idOrList);
        var obj = new scrivito.BasicObj(objData);

        if (obj.isFinallyDeleted()) {
          throwObjNotFound(idOrList);
        }

        return obj;
      }
    }, {
      key: 'create',
      value: function create(attributes) {
        var normalizedAttributes = scrivito.typeInfo.normalizeAttrs(attributes);
        assertObjClassExists(normalizedAttributes._objClass);

        if (!normalizedAttributes._id) {
          normalizedAttributes._id = [this.generateId()];
        }

        var serializedAttributes = {
          _id: normalizedAttributes._id, _obj_class: normalizedAttributes._objClass
        };
        return this.createWithSerializedAttributes(scrivito.typeInfo.unwrapAttributes(serializedAttributes), _underscore2.default.omit(attributes, '_objClass', '_id'));
      }
    }, {
      key: 'addChildWithSerializedAttributes',
      value: function addChildWithSerializedAttributes(parentPath, serializedAttributes) {
        var objId = scrivito.BasicObj.generateId();
        return this.createWithSerializedAttributes(_underscore2.default.extend({}, serializedAttributes, {
          _id: objId,
          _path: parentPath + '/' + objId
        }));
      }
    }, {
      key: 'createWithSerializedAttributes',
      value: function createWithSerializedAttributes(serializedAttributes, attributeDict) {
        if (!attributeDict) {
          return this.createWithSerializedAttributes.apply(this, _toConsumableArray(extractAttributeDict(serializedAttributes)));
        }

        var objData = scrivito.ObjDataStore.createObjData(serializedAttributes._id);
        objData.update(serializedAttributes);

        var obj = new scrivito.BasicObj(objData);
        obj.update(attributeDict);

        return obj;
      }
    }, {
      key: 'generateId',
      value: function generateId() {
        return (0, _random.randomId)();
      }
    }, {
      key: 'all',
      value: function all() {
        return new scrivito.BasicObjSearchIterable().batchSize(1000);
      }
    }, {
      key: 'root',
      value: function root() {
        return scrivito.BasicObj.getByPath('/');
      }
    }, {
      key: 'where',
      value: function where(attribute, operator, value) {
        var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        return new scrivito.BasicObjSearchIterable().and(attribute, operator, value, boost);
      }
    }, {
      key: 'getByPath',
      value: function getByPath(path) {
        var iterator = this.where('_path', 'equals', path).iterator();
        var obj = scrivito.iterable.firstValueFromIterator(iterator);
        if (obj) {
          return obj;
        }

        throw new scrivito.ResourceNotFoundError('Obj with path "' + path + '" not found.');
      }
    }, {
      key: 'getByPermalink',
      value: function getByPermalink(permalink) {
        var iterator = this.where('_permalink', 'equals', permalink).iterator();
        var obj = scrivito.iterable.firstValueFromIterator(iterator);
        if (obj) {
          return obj;
        }

        throw new scrivito.ResourceNotFoundError('Obj with permalink "' + permalink + '" not found.');
      }
    }]);

    function BasicObj(objData) {
      _classCallCheck(this, BasicObj);

      var _this = _possibleConstructorReturn(this, (BasicObj.__proto__ || Object.getPrototypeOf(BasicObj)).call(this));

      _this.objData = objData;
      return _this;
    }

    _createClass(BasicObj, [{
      key: 'getParent',
      value: function getParent() {
        if (!this._hasParentPath()) {
          return null;
        }

        try {
          return scrivito.BasicObj.getByPath(this.parentPath);
        } catch (error) {
          if (error instanceof scrivito.ResourceNotFoundError) {
            return null;
          }
          throw error;
        }
      }
    }, {
      key: 'hasConflicts',
      value: function hasConflicts() {
        return !!this._current._conflicts;
      }
    }, {
      key: 'isModified',
      value: function isModified() {
        return !!this.modification;
      }
    }, {
      key: 'isNew',
      value: function isNew() {
        return this.modification === 'new';
      }
    }, {
      key: 'isEdited',
      value: function isEdited() {
        return this.modification === 'edited';
      }
    }, {
      key: 'isDeleted',
      value: function isDeleted() {
        return this.modification === 'deleted';
      }
    }, {
      key: 'isFinallyDeleted',
      value: function isFinallyDeleted() {
        return !!this._current._deleted;
      }
    }, {
      key: 'isBinary',
      value: function isBinary() {
        if (!this._objClass) {
          return false;
        }

        var blobAttribute = this._objClass.attribute('blob');

        if (blobAttribute) {
          return blobAttribute.type === 'binary';
        }

        return false;
      }
    }, {
      key: 'fetchParent',
      value: function fetchParent() {
        scrivito.asyncMethodStub();
      }
    }, {
      key: 'hasChildren',
      value: function hasChildren() {
        return !!this.children.length;
      }
    }, {
      key: 'update',
      value: function update(attributes) {
        var _this4 = this;

        var normalizedAttributes = scrivito.typeInfo.normalizeAttrs(attributes);

        scrivito.globalState.withBatchedUpdates(function () {
          _this4._persistWidgets(_this4, normalizedAttributes);
          var patch = scrivito.AttributeSerializer.serialize(normalizedAttributes);
          _this4.objData.update(patch);
        });

        this._linkResolution.start();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.update({ _modification: ['deleted'] });
      }
    }, {
      key: 'insertWidget',
      value: function insertWidget(widget, _ref) {
        var before = _ref.before,
            after = _ref.after;

        var id = (before || after).id;

        var _widgetPlacementFor2 = this._widgetPlacementFor(id),
            attributeValue = _widgetPlacementFor2.attributeValue,
            attributeName = _widgetPlacementFor2.attributeName,
            container = _widgetPlacementFor2.container,
            index = _widgetPlacementFor2.index;

        var newIndex = before ? index : index + 1;
        var newAttributeValue = [].concat(_toConsumableArray(attributeValue.slice(0, newIndex)), [widget], _toConsumableArray(attributeValue.slice(newIndex)));

        container.update(_defineProperty({}, attributeName, [newAttributeValue, 'widgetlist']));
      }
    }, {
      key: 'removeWidget',
      value: function removeWidget(widget) {
        var field = this.fieldContainingWidget(widget);
        field.update(_underscore2.default.reject(field.get(), function (curWidget) {
          return curWidget.equals(widget);
        }));
      }
    }, {
      key: 'copyAsync',
      value: function copyAsync() {
        var copyOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        assertValidCopyOptions(copyOptions);

        return this._copyAttributes().then(function (copiedAttributes) {
          var serializedAttributes = _underscore2.default.extend(copiedAttributes, copyOptions);
          var obj = scrivito.BasicObj.createWithSerializedAttributes(serializedAttributes);
          return obj.finishSaving().then(function () {
            return obj;
          });
        });
      }
    }, {
      key: 'moveToAsync',
      value: function moveToAsync(parentPath) {
        this.update({ _path: [parentPath + '/' + this.id] });
        return this.finishSaving();
      }
    }, {
      key: 'markResolvedAsync',
      value: function markResolvedAsync() {
        this.update({ _conflicts: [null] });
        return this.finishSaving();
      }
    }, {
      key: 'finishSaving',
      value: function finishSaving() {
        var _this5 = this;

        var finish = this._linkResolution.finishResolving().then(function () {
          return _this5.objData.finishSaving();
        });
        return new scrivito.PublicPromise(finish);
      }
    }, {
      key: 'equals',
      value: function equals(otherObj) {
        if (!(otherObj instanceof scrivito.BasicObj)) {
          return false;
        }

        return this.id === otherObj.id;
      }
    }, {
      key: 'widget',
      value: function widget(id) {
        if (this.widgetData(id)) {
          return scrivito.BasicWidget.build(id, this);
        }
        return null;
      }
    }, {
      key: 'widgets',
      value: function widgets() {
        var _this6 = this;

        return _underscore2.default.map(_underscore2.default.keys(this._widgetPool), function (id) {
          return _this6.widget(id);
        });
      }
    }, {
      key: 'widgetData',
      value: function widgetData(id) {
        return this._widgetPool[id];
      }
    }, {
      key: 'fieldContainingWidget',
      value: function fieldContainingWidget(widget) {
        var _widgetPlacementFor3 = this._widgetPlacementFor(widget.id),
            container = _widgetPlacementFor3.container,
            attributeName = _widgetPlacementFor3.attributeName;

        return container.field(attributeName, 'widgetlist');
      }
    }, {
      key: 'generateWidgetId',
      value: function generateWidgetId() {
        for (var i = 0; i < 10; i++) {
          var id = (0, _random.randomHex)();

          if (!this.widget(id)) {
            return id;
          }
        }

        $.error('Could not generate a new unused widget id.');
      }
    }, {
      key: 'serializeAttributes',
      value: function serializeAttributes() {
        var serializedAttributes = _get(BasicObj.prototype.__proto__ || Object.getPrototypeOf(BasicObj.prototype), 'serializeAttributes', this).call(this);

        delete serializedAttributes._conflicts;
        delete serializedAttributes._modification;
        delete serializedAttributes._last_changed;

        return serializedAttributes;
      }
    }, {
      key: 'slug',
      value: function slug() {
        var title = this.get('title', 'string');
        return scrivito.convertToSlug(title);
      }
    }, {
      key: 'descriptionForWidget',
      value: function descriptionForWidget(widgetId) {
        var descriptionForWidgets = this._uiConfig.get('description_for_widgets') || {};
        return descriptionForWidgets[widgetId];
      }
    }, {
      key: '_hasParentPath',
      value: function _hasParentPath() {
        return this.path && this.path !== '/';
      }
    }, {
      key: '_copyAttributes',
      value: function _copyAttributes() {
        var objId = scrivito.BasicObj.generateId();
        var serializedAttributes = this.serializeAttributes();
        var uploadPromises = [];

        _underscore2.default.each(serializedAttributes, function (typeAndValue, name) {
          if (name[0] === '_') {
            delete serializedAttributes[name];
            return;
          }

          var _typeAndValue = _slicedToArray(typeAndValue, 2),
              type = _typeAndValue[0],
              value = _typeAndValue[1];

          if (type === 'binary' && value) {
            var futureBinary = new scrivito.FutureBinary({ idToCopy: value.id });
            var promise = futureBinary.into(objId).then(function (binary) {
              return { name: name, binary: binary };
            });
            uploadPromises.push(promise);
          }
        });

        serializedAttributes._id = objId;
        serializedAttributes._obj_class = this.objClass;
        if (this.path) {
          serializedAttributes._path = this.parentPath + '/' + objId;
        }

        return scrivito.PublicPromise.all(uploadPromises).then(function (binaries) {
          _underscore2.default.each(binaries, function (_ref2) {
            var name = _ref2.name,
                binary = _ref2.binary;

            serializedAttributes[name] = ['binary', { id: binary.id }];
          });

          return serializedAttributes;
        });
      }
    }, {
      key: '_widgetPlacementFor',
      value: function _widgetPlacementFor(widgetId) {
        var placement = scrivito.findWidgetPlacement(this._current, widgetId);
        var container = placement.parentWidgetId ? this.widget(placement.parentWidgetId) : this;
        var attributeName = camelCase(placement.attributeName);
        var attributeValue = container.get(attributeName, 'widgetlist');

        return _underscore2.default.extend(placement, { container: container, attributeName: attributeName, attributeValue: attributeValue });
      }
    }, {
      key: 'id',
      get: function get() {
        return this._current._id;
      }
    }, {
      key: 'objId',
      get: function get() {
        return this.id;
      }
    }, {
      key: 'objClass',
      get: function get() {
        return this._current._obj_class;
      }
    }, {
      key: 'lastChanged',
      get: function get() {
        if (this._current._last_changed) {
          return scrivito.types.parseStringToDate(this._current._last_changed);
        }

        return null;
      }
    }, {
      key: 'version',
      get: function get() {
        return this._current._version;
      }
    }, {
      key: 'path',
      get: function get() {
        return this._current._path || null;
      }
    }, {
      key: 'permalink',
      get: function get() {
        return this._current._permalink || null;
      }
    }, {
      key: 'parentPath',
      get: function get() {
        if (this._hasParentPath()) {
          return computeParentPath(this.path);
        }

        return null;
      }
    }, {
      key: 'parent',
      get: function get() {
        return this.getParent();
      }
    }, {
      key: 'modification',
      get: function get() {
        if (this._current._deleted) {
          return 'deleted';
        }

        return this._current._modification || null;
      }
    }, {
      key: 'descriptionForEditor',
      get: function get() {
        return this._uiConfig.get('description_for_editor');
      }
    }, {
      key: 'children',
      get: function get() {
        if (this.path) {
          var iterable = scrivito.BasicObj.all().and('_parentPath', 'equals', this.path);
          return scrivito.iterable.collectValuesFromIterator(iterable.iterator());
        }

        return [];
      }
    }, {
      key: 'backlinks',
      get: function get() {
        var iterator = scrivito.BasicObj.where('*', 'linksTo', this).iterator();
        return scrivito.iterable.collectValuesFromIterator(iterator);
      }
    }, {
      key: 'ancestors',
      get: function get() {
        if (this._hasParentPath()) {
          return collectPathComponents(this.parentPath).map(function (ancestorPath) {
            try {
              return scrivito.BasicObj.getByPath(ancestorPath);
            } catch (err) {
              if (err instanceof scrivito.ResourceNotFoundError) {
                return null;
              }

              throw err;
            }
          });
        }

        return [];
      }
    }, {
      key: '_widgetPool',
      get: function get() {
        return this._current._widget_pool || {};
      }
    }, {
      key: '_uiConfig',
      get: function get() {
        return scrivito.UiConfig.get(this.id);
      }
    }, {
      key: '_systemAttributes',
      get: function get() {
        return SYSTEM_ATTRIBUTES;
      }
    }, {
      key: '_current',
      get: function get() {
        return this.objData.current;
      }
    }, {
      key: '_objClass',
      get: function get() {
        return _obj_class2.default.find(this.objClass);
      }
    }, {
      key: '_linkResolution',
      get: function get() {
        return scrivito.uiAdapter.linkResolutionFor(this.objData);
      }
    }]);

    return BasicObj;
  }(scrivito.BasicAttributeContent);

  scrivito.provideAsyncClassMethods(scrivito.BasicObj, {
    get: 'fetch',
    getIncludingDeleted: 'fetchIncludingDeleted'
  });

  scrivito.provideAsyncInstanceMethods(scrivito.BasicObj, {
    getParent: 'fetchParent'
  });

  function assertObjClassExists(attrInfoAndValue) {
    if (!attrInfoAndValue) {
      throw new scrivito.ArgumentError('Please provide an obj class as the "_objClass" property.');
    }
  }

  function extractAttributeDict(attributes) {
    var serializedAttributes = {};
    var attributeDict = {};

    _underscore2.default.each(attributes, function (serializedValue, name) {
      if (_underscore2.default.isArray(serializedValue) && _underscore2.default.first(serializedValue) === 'widgetlist') {
        var widgets = _underscore2.default.map(_underscore2.default.last(serializedValue), function (serializedWidgetAttributes) {
          return scrivito.BasicWidget.newWithSerializedAttributes(serializedWidgetAttributes);
        });

        var attrName = camelCase(name);
        attributeDict[attrName] = [widgets, ['widgetlist']];
      } else {
        serializedAttributes[name] = serializedValue;
      }
    });

    if (!serializedAttributes._id) {
      serializedAttributes._id = scrivito.BasicObj.generateId();
    }

    return [serializedAttributes, attributeDict];
  }

  function collectPathComponents(path) {
    var results = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (path === '/') {
      return ['/'].concat(_toConsumableArray(results));
    }
    return collectPathComponents(computeParentPath(path), [path].concat(_toConsumableArray(results)));
  }

  function computeParentPath(path) {
    var pathComponents = path.split('/');
    pathComponents.pop();
    if (pathComponents.length === 1) {
      return '/';
    }
    return pathComponents.join('/');
  }

  function assertValidCopyOptions(copyOptions) {
    var validCopyOptions = ['_path'];

    if (_underscore2.default.difference(_underscore2.default.keys(copyOptions), validCopyOptions).length) {
      throw new scrivito.ArgumentError('Currently only "_path" copy option is supported.');
    }
  }

  function throwObjNotFound(id) {
    throw new scrivito.ResourceNotFoundError('Obj with id "' + id + '" not found.');
  }

  var camelCase = scrivito.attributeInflection.camelCase;
})();

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var BasicObjFacetValue = function () {
    function BasicObjFacetValue(name, count, includedObjs) {
      _classCallCheck(this, BasicObjFacetValue);

      this._name = name;
      this._count = count;
      this._includedObjs = includedObjs;
    }

    _createClass(BasicObjFacetValue, [{
      key: "includedObjs",
      value: function includedObjs() {
        return scrivito.BasicObj.get(this._includedObjs);
      }
    }, {
      key: "name",
      get: function get() {
        return this._name;
      }
    }, {
      key: "count",
      get: function get() {
        return this._count;
      }
    }]);

    return BasicObjFacetValue;
  }();

  scrivito.BasicObjFacetValue = BasicObjFacetValue;
})();

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var NEGATEABLE_OPERATORS = ['equals', 'startsWith', 'isGreaterThan', 'isLessThan'];
  var BOOSTABLE_PARAMETERS = ['contains', 'containsPrefix'];
  var DEFAULT_BATCH_SIZE = 100;

  scrivito.BasicObjSearchIterable = function () {
    function BasicObjSearchIterable() {
      _classCallCheck(this, BasicObjSearchIterable);

      this._query = [];
      this._batchSize = DEFAULT_BATCH_SIZE;
    }

    _createClass(BasicObjSearchIterable, [{
      key: 'and',
      value: function and(attributeOrSearch, operator, value) {
        var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        if (attributeOrSearch instanceof scrivito.BasicObjSearchIterable) {
          this._query = [].concat(_toConsumableArray(this._query), _toConsumableArray(attributeOrSearch._query));
        } else {
          var subQuery = buildSubQuery(attributeOrSearch, operator, value);

          if (boost) {
            assertBoostableOperator(operator);
            subQuery.boost = underscoreBoostAttributes(boost);
          }

          this._query.push(subQuery);
        }

        return this;
      }
    }, {
      key: 'andNot',
      value: function andNot(attribute, operator, value) {
        var subQuery = buildSubQuery(attribute, operator, value);
        assertNegetableOperator(operator);

        subQuery.negate = true;
        this._query.push(subQuery);
        return this;
      }

      // public API

    }, {
      key: 'offset',
      value: function offset(_offset) {
        this._offset = _offset;
        return this;
      }

      // public API

    }, {
      key: 'order',
      value: function order(attribute) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';

        this._sortBy = underscoreAttribute(attribute);
        this._sortDirection = direction;
        return this;
      }

      // public API

    }, {
      key: 'batchSize',
      value: function batchSize(_batchSize) {
        this._batchSize = _batchSize;
        return this;
      }
    }, {
      key: 'includeDeleted',
      value: function includeDeleted() {
        this._includeDeleted = true;
        return this;
      }
    }, {
      key: 'iterator',
      value: function iterator() {
        var queryIterator = scrivito.ObjQueryStore.get(this._params, this._batchSize);

        return {
          next: function next() {
            var _queryIterator$next = queryIterator.next(),
                done = _queryIterator$next.done,
                value = _queryIterator$next.value;

            if (done) {
              return { done: done };
            }

            return { done: done, value: new scrivito.BasicObj(value) };
          }
        };
      }

      // For test purpose only.

    }, {
      key: 'getBatchSize',


      // For test purpose only.
      value: function getBatchSize() {
        return this._batchSize;
      }
    }, {
      key: 'facet',
      value: function facet(attribute) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var facetQuery = new scrivito.FacetQuery(underscoreAttribute(attribute), options, this._query);
        return facetQuery.result();
      }
    }, {
      key: 'store',
      value: function store(objIds) {
        scrivito.ObjQueryStore.store(this._params, objIds);
      }
    }, {
      key: 'params',
      get: function get() {
        return this._params;
      }
    }, {
      key: '_params',
      get: function get() {
        var params = _underscore2.default.omit({
          query: this._query,
          offset: this._offset,
          sort_by: this._sortBy,
          sort_order: this._sortDirection
        }, _underscore2.default.isUndefined);

        if (this._includeDeleted) {
          params.options = { include_deleted: true };
        }

        return params;
      }
    }]);

    return BasicObjSearchIterable;
  }();

  function buildSubQuery(camelcasedAttribute, publicOperator, unserializedValue) {
    var attribute = convertAttribute(camelcasedAttribute);
    var operator = convertOperator(publicOperator);
    var value = convertValue(unserializedValue);
    return { field: attribute, operator: operator, value: value };
  }

  function assertBoostableOperator(operator) {
    if (!_underscore2.default.contains(BOOSTABLE_PARAMETERS, operator)) {
      throw new scrivito.ArgumentError('Boosting operator "' + operator + '" is invalid.');
    }
  }

  function assertNegetableOperator(operator) {
    if (!_underscore2.default.contains(NEGATEABLE_OPERATORS, operator)) {
      throw new scrivito.ArgumentError('Negating operator "' + operator + '" is invalid.');
    }
  }

  function convertValue(value) {
    if (_underscore2.default.isArray(value)) {
      return _underscore2.default.map(value, convertSingleValue);
    }

    return convertSingleValue(value);
  }

  function convertSingleValue(value) {
    if (_underscore2.default.isDate(value)) {
      return scrivito.types.formatDateToString(value);
    }

    if (value instanceof scrivito.BasicObj) {
      return value.id;
    }
    return value;
  }

  function convertOperator(operator) {
    switch (operator) {
      case 'contains':
        return 'search';
      case 'containsPrefix':
        return 'prefix_search';
      case 'equals':
        return 'equal';
      case 'startsWith':
        return 'prefix';
      case 'isGreaterThan':
        return 'greater_than';
      case 'isLessThan':
        return 'less_than';
      case 'linksTo':
        return 'links_to';
      case 'refersTo':
        return 'refers_to';
      default:
        throw new scrivito.ArgumentError('Operator "' + operator + '" is invalid.');
    }
  }

  function convertAttribute(attribute) {
    if (_underscore2.default.isArray(attribute)) {
      return _underscore2.default.map(attribute, underscoreAttribute);
    }

    return underscoreAttribute(attribute);
  }

  function underscoreBoostAttributes(boost) {
    var boostWithUnderscoreAttributes = {};

    _underscore2.default.each(boost, function (value, attributeName) {
      var underscoredAttributeName = underscoreAttribute(attributeName);
      boostWithUnderscoreAttributes[underscoredAttributeName] = value;
    });

    return boostWithUnderscoreAttributes;
  }

  function underscoreAttribute(attributeName) {
    if (!scrivito.attributeInflection.isCamelCase(attributeName)) {
      throw new scrivito.ArgumentError('Attribute name "' + attributeName + '" is not camel case.');
    }

    return scrivito.attributeInflection.underscore(attributeName);
  }
})();

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var SYSTEM_ATTRIBUTES = {
    _id: 'id',
    _obj_class: 'objClass'
  };

  scrivito.BasicWidget = function (_scrivito$BasicAttrib) {
    _inherits(BasicWidget, _scrivito$BasicAttrib);

    _createClass(BasicWidget, null, [{
      key: 'build',
      value: function build(id, obj) {
        var instance = Object.create(scrivito.BasicWidget.prototype);
        instance._obj = obj;
        instance._id = id;

        return instance;
      }
    }, {
      key: 'newWithSerializedAttributes',
      value: function newWithSerializedAttributes(attributes) {
        var unserializedAttributes = {};
        var serializedAttributes = {};

        _underscore2.default.each(attributes, function (value, name) {
          if (name === '_obj_class') {
            unserializedAttributes._objClass = [value];
            return;
          }

          if (_underscore2.default.isArray(value) && _underscore2.default.first(value) === 'widgetlist') {
            var newWidgets = _underscore2.default.map(_underscore2.default.last(value), function (serializedWidget) {
              return scrivito.BasicWidget.newWithSerializedAttributes(serializedWidget);
            });

            var attrName = scrivito.attributeInflection.camelCase(name);
            unserializedAttributes[attrName] = [newWidgets, ['widgetlist']];
            return;
          }

          serializedAttributes[name] = value;
        });

        var widget = new scrivito.BasicWidget(unserializedAttributes);
        widget.preserializedAttributes = serializedAttributes;
        return widget;
      }
    }]);

    function BasicWidget(attributes) {
      _classCallCheck(this, BasicWidget);

      var _this = _possibleConstructorReturn(this, (BasicWidget.__proto__ || Object.getPrototypeOf(BasicWidget)).call(this));

      _this._attributesToBeSaved = scrivito.typeInfo.normalizeAttrs(attributes);

      assertWidgetClassExists(attributes._objClass);
      return _this;
    }

    _createClass(BasicWidget, [{
      key: 'widget',
      value: function widget(id) {
        return this.obj.widget(id);
      }
    }, {
      key: 'update',
      value: function update(attributes) {
        var _this2 = this;

        var normalizedAttributes = scrivito.typeInfo.normalizeAttrs(attributes);

        scrivito.globalState.withBatchedUpdates(function () {
          _this2._persistWidgets(_this2.obj, normalizedAttributes);
          var patch = scrivito.AttributeSerializer.serialize(normalizedAttributes);
          _this2._updateSelf(patch);
        });
      }
    }, {
      key: 'insertBefore',
      value: function insertBefore(widget) {
        widget.obj.insertWidget(this, { before: widget });
      }
    }, {
      key: 'insertAfter',
      value: function insertAfter(widget) {
        widget.obj.insertWidget(this, { after: widget });
      }
    }, {
      key: 'remove',
      value: function remove() {
        this.obj.removeWidget(this);
      }
    }, {
      key: 'copy',
      value: function copy() {
        var serializedAttributes = this.serializeAttributes();
        return scrivito.BasicWidget.newWithSerializedAttributes(serializedAttributes);
      }
    }, {
      key: 'persistInObj',
      value: function persistInObj(obj) {
        this._persistWidgets(obj, this._attributesToBeSaved);
        var patch = scrivito.AttributeSerializer.serialize(this._attributesToBeSaved);
        _underscore2.default.extend(patch, this.preserializedAttributes || {});

        this._obj = obj;
        this._id = obj.generateWidgetId();

        this._updateSelf(patch);
      }
    }, {
      key: 'isPersisted',
      value: function isPersisted() {
        return !!this._obj;
      }
    }, {
      key: 'finishSaving',
      value: function finishSaving() {
        return this.obj.finishSaving();
      }
    }, {
      key: 'equals',
      value: function equals(otherWidget) {
        if (!(otherWidget instanceof scrivito.BasicWidget)) {
          return false;
        }

        return this.id === otherWidget.id && this.obj.id === otherWidget.obj.id;
      }
    }, {
      key: 'containingField',
      value: function containingField() {
        return this.obj.fieldContainingWidget(this);
      }
    }, {
      key: '_throwUnpersistedError',
      value: function _throwUnpersistedError() {
        throw new scrivito.ScrivitoError('Can not access a new widget before it has been saved.');
      }
    }, {
      key: '_updateSelf',
      value: function _updateSelf(patch) {
        var widgetPoolPatch = { _widgetPool: [_defineProperty({}, this.id, patch)] };
        this.obj.update(widgetPoolPatch);
      }
    }, {
      key: 'id',
      get: function get() {
        if (this.isPersisted()) {
          return this._id;
        }

        this._throwUnpersistedError();
      }
    }, {
      key: 'objClass',
      get: function get() {
        return this._current._obj_class;
      }
    }, {
      key: 'obj',
      get: function get() {
        if (this.isPersisted()) {
          return this._obj;
        }

        this._throwUnpersistedError();
      }
    }, {
      key: 'objId',
      get: function get() {
        return this.obj.id;
      }
    }, {
      key: 'descriptionForEditor',
      get: function get() {
        return this.obj.descriptionForWidget(this.id) || this.objClass;
      }
    }, {
      key: 'attributesToBeSaved',
      get: function get() {
        return this._attributesToBeSaved;
      }
    }, {
      key: '_current',
      get: function get() {
        if (this.isPersisted()) {
          return this.obj.widgetData(this.id);
        }

        throw new scrivito.ScrivitoError('Can not access an unpersisted widget.');
      }
    }, {
      key: '_systemAttributes',
      get: function get() {
        return SYSTEM_ATTRIBUTES;
      }
    }]);

    return BasicWidget;
  }(scrivito.BasicAttributeContent);

  function assertWidgetClassExists(attrInfoAndValue) {
    if (!attrInfoAndValue) {
      throw new scrivito.ArgumentError('Please provide a widget class as the "_objClass" property.');
    }
  }
})();

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // public API
  scrivito.Binary = function () {
    function Binary(id, isPublic, definition) {
      var _this = this;

      _classCallCheck(this, Binary);

      this._id = id;
      this._isPublic = isPublic;
      this._definition = definition;

      this._loadableData = new scrivito.LoadableData({
        state: modelState(id, definition),
        loader: function loader() {
          return _this._loadUrlData();
        }
      });
    }

    // public API


    _createClass(Binary, [{
      key: 'copy',


      // public API
      value: function copy() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        options.idToCopy = this._id;
        return new scrivito.FutureBinary(options);
      }

      // public API

    }, {
      key: 'isPrivate',
      value: function isPrivate() {
        return !this._isPublic;
      }

      // public API

    }, {
      key: 'transform',
      value: function transform(definition) {
        return new scrivito.Binary(this._id, this._isPublic, _underscore2.default.extend({}, this._definition, definition));
      }

      // public API

    }, {
      key: 'isTransformed',


      // public API
      value: function isTransformed() {
        return !!this._definition;
      }

      // public API

    }, {
      key: 'equals',


      // For test purpose only.
      value: function equals(binary) {
        return binary instanceof scrivito.Binary && binary.id === this.id && binary.isPrivate() === this.isPrivate() && _underscore2.default.isEqual(binary.definition, this.definition);
      }

      // For test purpose only.

    }, {
      key: '_loadUrlData',
      value: function _loadUrlData() {
        var path = 'blobs/' + encodeURIComponent(this._id);
        var params = void 0;

        if (this._definition) {
          path = path + '/transform';
          params = { transformation: this._definition };
        }

        return scrivito.CmsRestApi.get(path, params);
      }
    }, {
      key: '_assertNotTransformed',
      value: function _assertNotTransformed(fieldName) {
        if (this.isTransformed()) {
          throw new scrivito.ScrivitoError('"' + fieldName + '" is not available for transformed images.' + ' Use "scrivito.Binary#raw" to access the untransformed version of the image.');
        }
      }
    }, {
      key: 'id',
      get: function get() {
        return this._id;
      }
    }, {
      key: 'original',
      get: function get() {
        return new scrivito.Binary(this._id, this._isPublic, {});
      }

      // public API

    }, {
      key: 'raw',
      get: function get() {
        return new scrivito.Binary(this._id, this._isPublic);
      }
    }, {
      key: 'url',
      get: function get() {
        return this._urlData[this._accessType].get.url;
      }

      // public API

    }, {
      key: 'filename',
      get: function get() {
        var path = scrivito.parseUrl(this.url).pathname;
        return path.split('/').pop();
      }

      // public API

    }, {
      key: 'metadata',
      get: function get() {
        this._assertNotTransformed('Metadata');

        return new scrivito.MetadataCollection(this._id);
      }

      // public API

    }, {
      key: 'contentType',
      get: function get() {
        this._assertNotTransformed('Content type');

        return this.metadata.get('content_type');
      }

      // public API

    }, {
      key: 'contentLength',
      get: function get() {
        this._assertNotTransformed('Content length');

        return this.metadata.get('content_length');
      }
    }, {
      key: 'definition',
      get: function get() {
        return this._definition || null;
      }
    }, {
      key: '_accessType',
      get: function get() {
        if (this.isPrivate()) {
          return 'private_access';
        }
        return 'public_access';
      }
    }, {
      key: '_urlData',
      get: function get() {
        return this._loadableData.get();
      }
    }], [{
      key: 'upload',
      value: function upload(source) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        options.source = source;
        return new scrivito.FutureBinary(options);
      }
    }, {
      key: 'store',
      value: function store(binaryId, definition, cmsRestApiResponse) {
        var loadableData = new scrivito.LoadableData({ state: modelState(binaryId, definition) });
        loadableData.set(cmsRestApiResponse);

        var raw = new scrivito.Binary(binaryId);
        if (definition) {
          return raw.transform(definition);
        }

        return raw;
      }
    }, {
      key: 'storeMetadata',
      value: function storeMetadata(binaryId, cmsRestApiResponse) {
        return scrivito.MetadataCollection.store(binaryId, cmsRestApiResponse);
      }
    }]);

    return Binary;
  }();

  function modelState(binaryId, definition) {
    var subStateKey = scrivito.computeCacheKey([binaryId, definition]);
    return scrivito.cmsState.subState('binary').subState(subStateKey);
  }
})();

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // public API
  scrivito.FutureBinary = function () {
    function FutureBinary() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, FutureBinary);

      if (options.idToCopy) {
        this.idToCopy = options.idToCopy;
      } else {
        validateParams(options);
        this.source = options.source;
      }

      if (options.filename) {
        this.filename = options.filename.replace(/[^\w\-_\.$]/g, '-');
      }

      this.contentType = options.contentType;
    }

    // public API


    _createClass(FutureBinary, [{
      key: 'into',
      value: function into(target) {
        var targetId = void 0;

        if (_underscore2.default.isString(target)) {
          targetId = target;
        } else {
          targetId = target.id;
        }

        var binaryPromise = void 0;

        if (this.idToCopy) {
          binaryPromise = scrivito.BinaryRequest.copy(this.idToCopy, targetId, this.filename, this.contentType);
        } else {
          binaryPromise = scrivito.BinaryRequest.upload(targetId, this.source, this.filename, this.contentType);
        }

        return binaryPromise.then(function (_ref) {
          var id = _ref.id;
          return new scrivito.Binary(id, false);
        });
      }
    }]);

    return FutureBinary;
  }();

  function validateParams(options) {
    if (!scrivito.BinaryUtils.isBlob(options.source)) {
      throw new scrivito.ArgumentError('Expected a Blob or File as the source.');
    }

    if (!options.contentType) {
      options.contentType = options.source.type;
    }

    if (!options.filename) {
      if (!scrivito.BinaryUtils.isFile(options.source)) {
        throw new scrivito.ArgumentError('Expected a filename to be passed with Blob as the source.');
      }
      options.filename = options.source.name;
    }
  }
})();

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  function LinkFactory(registry) {
    // public API
    var Link = function (_scrivito$BasicLink) {
      _inherits(Link, _scrivito$BasicLink);

      // public API
      function Link(attributes) {
        _classCallCheck(this, Link);

        return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, attributes));
      }

      // public API


      _createClass(Link, [{
        key: "fetchObj",
        value: function fetchObj(id) {
          return _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "fetchObj", this).call(this, id).then(function (basicObj) {
            return scrivito.wrapInAppClass(registry, basicObj);
          });
        }
      }, {
        key: "obj",
        get: function get() {
          return scrivito.wrapInAppClass(registry, _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), "obj", this));
        }
      }, {
        key: "_scrivitoPrivateContent",
        get: function get() {
          return scrivito.BasicLink.build(this.buildAttributes());
        }
      }]);

      return Link;
    }(scrivito.BasicLink);

    return Link;
  }

  scrivito.LinkFactory = LinkFactory;
})();

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // public API
  scrivito.MetadataCollection = function () {
    function MetadataCollection(binaryId) {
      var _this = this;

      _classCallCheck(this, MetadataCollection);

      this._binaryId = binaryId;
      this._loadableData = new scrivito.LoadableData({
        state: modelState(binaryId),
        loader: function loader() {
          return _this._loadData();
        }
      });
    }

    _createClass(MetadataCollection, [{
      key: 'get',


      // public API
      value: function get(name) {
        return this._loadableData.get()[name];
      }

      // For test purpose only.

    }, {
      key: '_loadData',
      value: function _loadData() {
        var path = 'blobs/' + encodeURIComponent(this._binaryId) + '/meta_data';
        return scrivito.CmsRestApi.get(path).then(deserializeMetadata);
      }
    }, {
      key: 'binaryId',
      get: function get() {
        return this._binaryId;
      }
    }], [{
      key: 'store',
      value: function store(binaryId, cmsRestApiResponse) {
        var loadableData = new scrivito.LoadableData({ state: modelState(binaryId) });
        loadableData.set(deserializeMetadata(cmsRestApiResponse));
      }
    }]);

    return MetadataCollection;
  }();

  function modelState(binaryId) {
    return scrivito.cmsState.subState('metadataCollection').subState(binaryId);
  }

  function deserializeMetadata(rawMetadata) {
    return _underscore2.default.mapObject(rawMetadata.meta_data, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          type = _ref2[0],
          value = _ref2[1];

      switch (type) {
        case 'date':
          return scrivito.types.deserializeAsDate(value);
        case 'number':
          return scrivito.types.deserializeAsInteger(value);
        default:
          return value;
      }
    });
  }
})();

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // public API
  var ObjFacetValue = function () {
    function ObjFacetValue(registry, basicObjFacetValue) {
      _classCallCheck(this, ObjFacetValue);

      this._registry = registry;
      this._basicObjFacetValue = basicObjFacetValue;
    }

    // public API


    _createClass(ObjFacetValue, [{
      key: "includedObjs",


      // public API
      value: function includedObjs() {
        var response = this._basicObjFacetValue.includedObjs();
        return scrivito.wrapInAppClass(this._registry, response);
      }
    }, {
      key: "name",
      get: function get() {
        return this._basicObjFacetValue.name;
      }

      // public API

    }, {
      key: "count",
      get: function get() {
        return this._basicObjFacetValue.count;
      }
    }]);

    return ObjFacetValue;
  }();

  scrivito.ObjFacetValue = ObjFacetValue;
})();

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  function ObjFactory(registry) {
    var appModelAccessor = new scrivito.AppModelAccessor(registry);

    function buildObjSearchIterable(objClassName) {
      var iterable = new registry.ObjSearchIterable();
      if (objClassName) {
        iterable.and('_objClass', 'equals', objClassName);
      }

      return iterable;
    }

    function wrap(response) {
      return scrivito.wrapInAppClass(registry, response);
    }

    // public API

    var Obj = function (_scrivito$AttributeCo) {
      _inherits(Obj, _scrivito$AttributeCo);

      function Obj() {
        _classCallCheck(this, Obj);

        return _possibleConstructorReturn(this, (Obj.__proto__ || Object.getPrototypeOf(Obj)).apply(this, arguments));
      }

      _createClass(Obj, [{
        key: 'slug',


        // public API
        value: function slug() {
          return this._scrivitoPrivateContent.slug();
        }

        // public API

      }, {
        key: 'isBinary',
        value: function isBinary() {
          var schema = scrivito.Schema.forInstance(this);
          if (!schema) {
            return false;
          }

          return schema.isBinary();
        }

        // public API

      }, {
        key: 'destroy',
        value: function destroy() {
          this._scrivitoPrivateContent.destroy();
        }

        // public API

      }, {
        key: 'widget',
        value: function widget(id) {
          return wrap(this._scrivitoPrivateContent.widget(id));
        }

        // public API

      }, {
        key: 'widgets',
        value: function widgets() {
          return wrap(this._scrivitoPrivateContent.widgets());
        }
      }, {
        key: 'lastChanged',


        // public API
        get: function get() {
          return this._scrivitoPrivateContent.lastChanged;
        }

        // public API

      }, {
        key: 'path',
        get: function get() {
          return this._scrivitoPrivateContent.path;
        }

        // public API

      }, {
        key: 'parent',
        get: function get() {
          return wrap(this._scrivitoPrivateContent.parent);
        }

        // public API

      }, {
        key: 'ancestors',
        get: function get() {
          return wrap(this._scrivitoPrivateContent.ancestors);
        }

        // public API

      }, {
        key: 'backlinks',
        get: function get() {
          return wrap(this._scrivitoPrivateContent.backlinks);
        }

        // public API

      }, {
        key: 'children',
        get: function get() {
          return wrap(this._scrivitoPrivateContent.children);
        }

        // public API

      }, {
        key: 'permalink',
        get: function get() {
          return this._scrivitoPrivateContent.permalink;
        }
      }], [{
        key: 'get',

        // public API
        value: function get(id) {
          var instance = scrivito.BasicObj.get(id);

          var objClassName = registry.objClassNameFor(this);
          if (objClassName && objClassName !== instance.objClass) {
            throw new scrivito.ResourceNotFoundError('Obj with id "' + id + '" is not of type "' + objClassName + '".');
          }

          return scrivito.wrapInAppClass(registry, instance);
        }

        // public API

      }, {
        key: 'getByPath',
        value: function getByPath(path) {
          return wrap(scrivito.BasicObj.getByPath(path));
        }

        // public API

      }, {
        key: 'getByPermalink',
        value: function getByPermalink(permalink) {
          return wrap(scrivito.BasicObj.getByPermalink(permalink));
        }

        // public API

      }, {
        key: 'all',
        value: function all() {
          var objClassName = registry.objClassNameFor(this);
          return buildObjSearchIterable(objClassName).batchSize(1000);
        }

        // public API

      }, {
        key: 'root',
        value: function root() {
          return wrap(scrivito.BasicObj.root());
        }

        // public API

      }, {
        key: 'where',
        value: function where(attribute, operator, value) {
          var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

          var objClassName = registry.objClassNameFor(this);
          return buildObjSearchIterable(objClassName).and(attribute, operator, value, boost);
        }

        // public API

      }, {
        key: 'create',
        value: function create(attributes) {
          var schema = scrivito.Schema.forClass(this);
          var appClassName = registry.objClassNameFor(this);

          if (!appClassName) {
            throw new scrivito.ArgumentError('Creating CMS objects is not supported for the class Obj or abstract classes.');
          }

          if (attributes.constructor !== Object) {
            throw new scrivito.ArgumentError('The provided attributes are invalid. They have ' + 'to be an Object with valid Scrivito attribute values.');
          }

          if (attributes._objClass) {
            throw new scrivito.ArgumentError('Invalid attribute "_objClass". ' + ('"' + attributes._objClass + '.create" will automatically set the CMS object class ') + 'correctly.');
          }

          attributes._objClass = appClassName;
          var attributesWithTypeInfo = scrivito.AttributeContentFactory.prepareAttributes(attributes, schema, appClassName);

          return wrap(scrivito.BasicObj.create(attributesWithTypeInfo));
        }
      }]);

      return Obj;
    }(scrivito.AttributeContentFactory(appModelAccessor));

    return Obj;
  }

  scrivito.ObjFactory = ObjFactory;
})();

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  function ObjSearchIterableFactory(registry) {
    // public API
    var ObjSearchIterable = function (_scrivito$BasicObjSea) {
      _inherits(ObjSearchIterable, _scrivito$BasicObjSea);

      function ObjSearchIterable() {
        _classCallCheck(this, ObjSearchIterable);

        return _possibleConstructorReturn(this, (ObjSearchIterable.__proto__ || Object.getPrototypeOf(ObjSearchIterable)).apply(this, arguments));
      }

      _createClass(ObjSearchIterable, [{
        key: 'iterator',

        // public API
        value: function iterator() {
          var basicIterator = _get(ObjSearchIterable.prototype.__proto__ || Object.getPrototypeOf(ObjSearchIterable.prototype), 'iterator', this).call(this);

          return {
            next: function next() {
              var _basicIterator$next = basicIterator.next(),
                  done = _basicIterator$next.done,
                  value = _basicIterator$next.value;

              if (done) {
                return { done: done };
              }

              return { done: done, value: scrivito.wrapInAppClass(registry, value) };
            }
          };
        }

        // public API

      }, {
        key: 'and',
        value: function and(attribute, operator, value) {
          var boost = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

          var unwrappedValue = scrivito.unwrapAppClassValues(value);
          return _get(ObjSearchIterable.prototype.__proto__ || Object.getPrototypeOf(ObjSearchIterable.prototype), 'and', this).call(this, attribute, operator, unwrappedValue, boost);
        }

        // public API

      }, {
        key: 'andNot',
        value: function andNot(attribute, operator, value) {
          var unwrappedValue = scrivito.unwrapAppClassValues(value);
          return _get(ObjSearchIterable.prototype.__proto__ || Object.getPrototypeOf(ObjSearchIterable.prototype), 'andNot', this).call(this, attribute, operator, unwrappedValue);
        }

        // public API

      }, {
        key: 'facet',
        value: function facet(attribute) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var result = _get(ObjSearchIterable.prototype.__proto__ || Object.getPrototypeOf(ObjSearchIterable.prototype), 'facet', this).call(this, attribute, options);
          return _underscore2.default.map(result, function (facetValue) {
            return new scrivito.ObjFacetValue(registry, facetValue);
          });
        }
      }]);

      return ObjSearchIterable;
    }(scrivito.BasicObjSearchIterable);

    return ObjSearchIterable;
  }

  scrivito.ObjSearchIterableFactory = ObjSearchIterableFactory;
})();

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  function WidgetFactory(registry) {
    var appModelAccessor = new scrivito.AppModelAccessor(registry);

    // public API

    var Widget = function (_scrivito$AttributeCo) {
      _inherits(Widget, _scrivito$AttributeCo);

      // public API
      function Widget(attributes) {
        _classCallCheck(this, Widget);

        var _this = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this));

        var schema = scrivito.Schema.forInstance(_this);
        var appClassName = registry.objClassNameFor(_this.constructor);

        if (!appClassName) {
          throw new scrivito.ArgumentError('Creating widgets is not supported for the class Widget or abstract classes.');
        }

        if (attributes.constructor !== Object) {
          throw new scrivito.ArgumentError('The provided attributes are invalid. They have ' + 'to be an Object with valid Scrivito attribute values.');
        }

        if (attributes._objClass) {
          throw new scrivito.ArgumentError('Invalid attribute "_objClass". ' + ('"new ' + attributes._objClass + '" will automatically set the CMS object class correctly.'));
        }

        attributes._objClass = appClassName;
        var attributesWithTypeInfo = scrivito.AttributeContentFactory.prepareAttributes(attributes, schema, appClassName);

        _this._scrivitoPrivateContent = new scrivito.BasicWidget(attributesWithTypeInfo);
        return _this;
      }

      // public API


      _createClass(Widget, [{
        key: 'copy',


        // public API
        value: function copy() {
          var appClass = registry.widgetClassFor(this.objClass);
          var basicWidget = this._scrivitoPrivateContent.copy();

          return scrivito.buildAppClassInstance(basicWidget, appClass);
        }
      }, {
        key: 'obj',
        get: function get() {
          var basicObj = this._scrivitoPrivateContent.obj;
          return scrivito.wrapInAppClass(registry, basicObj);
        }
      }]);

      return Widget;
    }(scrivito.AttributeContentFactory(appModelAccessor));

    return Widget;
  }

  scrivito.WidgetFactory = WidgetFactory;
})();

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var capturedDelayedFunctions = [];
  var captureEnabled = void 0;

  _underscore2.default.extend(scrivito, {
    nextTick: function nextTick(delayedFunction) {
      if (captureEnabled) {
        capturedDelayedFunctions.push(delayedFunction);
      } else {
        setTimeout(delayedFunction, 0);
      }
    },


    // For test purpose only.
    simulateNextTicks: function simulateNextTicks() {
      var exceptions = [];

      while (capturedDelayedFunctions.length) {
        var currentFunctions = _underscore2.default.shuffle(capturedDelayedFunctions);
        capturedDelayedFunctions = [];
        _underscore2.default.each(currentFunctions, function (delayedFunction) {
          try {
            delayedFunction();
          } catch (e) {
            exceptions.push(e);
          }
        });
      }

      if (exceptions.length > 0) {
        throw exceptions[0];
      }
    },


    // For test purpose only.
    enableNextTickCapture: function enableNextTickCapture() {
      captureEnabled = true;
    }
  });
})();

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.ObjData = function () {
    function ObjData(id, state) {
      var _this = this;

      _classCallCheck(this, ObjData);

      this._loadableData = new scrivito.LoadableData({
        state: state,
        loader: function loader(push) {
          return scrivito.ObjRetrieval.retrieveObj(_this._id).then(function (data) {
            push(function () {
              return _this._replication().notifyBackendState(data);
            });
            return data;
          });
        }
      });
      this._id = id;
    }

    _createClass(ObjData, [{
      key: "set",
      value: function set(newState) {
        this._loadableData.set(newState);
      }
    }, {
      key: "setError",
      value: function setError(error) {
        this._loadableData.setError(error);
      }
    }, {
      key: "ensureAvailable",
      value: function ensureAvailable() {
        this._loadableData.get();
      }
    }, {
      key: "isAvailable",
      value: function isAvailable() {
        return this._loadableData.isAvailable();
      }
    }, {
      key: "update",
      value: function update(objPatch) {
        var newState = scrivito.ObjPatch.apply(this.current, objPatch);

        this._loadableData.set(newState);
        this._replication().notifyLocalState(newState);
      }
    }, {
      key: "finishSaving",
      value: function finishSaving() {
        return this._replication().finishSaving();
      }
    }, {
      key: "_replication",
      value: function _replication() {
        return scrivito.ObjReplication.get(this._id);
      }
    }, {
      key: "current",
      get: function get() {
        return this._loadableData.get();
      }
    }]);

    return ObjData;
  }();
})();

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  scrivito.ObjDataStore = {
    preload: function preload(id) {
      var _this = this;

      scrivito.loadAsync(function () {
        return _this.get(id);
      });
    },
    createObjData: function createObjData(id) {
      var objData = objDataFor(id);
      objData.set(null);

      scrivito.ObjReplication.get(id).notifyBackendState(null);

      return objData;
    },
    store: function store(primitiveObj) {
      var id = primitiveObj._id;
      if (!objDataFor(id).isAvailable()) {
        this.set(id, primitiveObj);
      }
      scrivito.ObjReplication.get(id).notifyBackendState(primitiveObj);
    },
    set: function set(id, primitiveObj) {
      objDataFor(id).set(primitiveObj);
    },


    // test method only!
    setError: function setError(id, error) {
      objDataFor(id).setError(error);
    },
    get: function get(id) {
      objDataFor(id).ensureAvailable();

      return objDataFor(id);
    },
    clearCache: function clearCache() {
      cacheStore().clear();
    }
  };

  function cacheStore() {
    return scrivito.cmsState.subState('objData');
  }

  function objDataFor(id) {
    return new scrivito.ObjData(id, cacheStore().subState(id));
  }
})();

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var ObjPatch = {
    apply: function apply(primitiveObj, patch) {
      if (!primitiveObj) {
        return patch;
      }
      if (!patch) {
        return null;
      }

      var updatedPrimitiveObj = {};

      eachKeyFrom(primitiveObj, patch, function (attribute, objValue, patchValue) {
        if (attribute === '_widget_pool') {
          updatedPrimitiveObj._widget_pool = buildUpdatedWidgetPool(objValue, patchValue);
        } else if (patch.hasOwnProperty(attribute)) {
          if (patchValue) {
            updatedPrimitiveObj[attribute] = patchValue;
          }
        } else {
          updatedPrimitiveObj[attribute] = primitiveObj[attribute];
        }
      });

      return updatedPrimitiveObj;
    },
    diff: function diff(primitiveObjA, primitiveObjB) {
      if (!primitiveObjA) {
        return primitiveObjB;
      }
      if (!primitiveObjB) {
        return null;
      }

      var patch = {};

      eachKeyFrom(primitiveObjA, primitiveObjB, function (attribute, valueInA, valueInB) {
        if (attribute === '_widget_pool') {
          var widgetPoolPatch = buildWidgetPoolPatch(valueInA, valueInB);

          if (!_underscore2.default.isEmpty(widgetPoolPatch)) {
            patch._widget_pool = widgetPoolPatch;
          }
        } else {
          var patchValue = buildPatchEntry(valueInA, valueInB, function () {
            if (!_underscore2.default.isEqual(valueInA, valueInB)) {
              return valueInB;
            }
          });

          if (patchValue !== undefined) {
            patch[attribute] = patchValue;
          }
        }
      });

      return patch;
    }
  };

  function eachKeyFrom(objectA, objectB, handler) {
    _underscore2.default.union(_underscore2.default.keys(objectA), _underscore2.default.keys(objectB)).forEach(function (key) {
      return handler(key, workspaceAwareObject(objectA[key]), workspaceAwareObject(objectB[key]));
    });
  }

  function workspaceAwareObject(object) {
    if (_underscore2.default.isArray(object)) {
      var _object = _slicedToArray(object, 2),
          type = _object[0],
          value = _object[1];

      // Ignore binary URLs, since they are different across workspaces.
      // However, a binary ID identifies a binary unambiguously.


      if (type === 'binary' && value) {
        return [type, _underscore2.default.omit(value, 'url')];
      }

      return object;
    }

    return object;
  }

  function buildUpdatedWidgetPool(widgetPool, widgetPoolPatch) {
    if (!widgetPoolPatch || _underscore2.default.isEmpty(widgetPoolPatch)) {
      return widgetPool;
    }

    var updatedWidgetPool = {};

    eachKeyFrom(widgetPool || {}, widgetPoolPatch || {}, function (id, widget, widgetPatch) {
      if (widgetPoolPatch.hasOwnProperty(id)) {
        if (widgetPatch && !widget) {
          updatedWidgetPool[id] = widgetPatch;
        } else if (widgetPatch) {
          updatedWidgetPool[id] = ObjPatch.apply(widget, widgetPatch);
        }
      } else {
        updatedWidgetPool[id] = widget;
      }
    });

    return updatedWidgetPool;
  }

  function buildPatchEntry(valueA, valueB, fnHandleBoth) {
    if (!valueA && valueB) {
      return valueB;
    }

    if (valueA && !valueB) {
      return null;
    }

    if (valueA && valueB) {
      return fnHandleBoth();
    }
  }

  function buildWidgetPoolPatch(widgetPoolA, widgetPoolB) {
    if (widgetPoolA === widgetPoolB) {
      return {};
    }

    var patch = {};

    eachKeyFrom(widgetPoolA, widgetPoolB, function (widgetId, widgetA, widgetB) {
      var widgetValue = buildPatchEntry(widgetA, widgetB, function () {
        var widgetPatch = ObjPatch.diff(widgetA, widgetB);

        if (!_underscore2.default.isEmpty(widgetPatch)) {
          return widgetPatch;
        }
      });

      if (widgetValue !== undefined) {
        patch[widgetId] = widgetValue;
      }
    });

    return patch;
  }

  scrivito.ObjPatch = ObjPatch;
})();

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.ObjQuery = function () {
    _createClass(ObjQuery, null, [{
      key: "store",
      value: function store(params, objIds) {
        scrivito.ObjQueryBatch.store(params, objIds);
      }
    }]);

    function ObjQuery(params) {
      _classCallCheck(this, ObjQuery);

      this._params = params;
    }

    _createClass(ObjQuery, [{
      key: "iterator",
      value: function iterator(batchSize) {
        var priorObjIds = {};

        var currentBatch = scrivito.ObjQueryBatch.firstBatchFor(this._params, batchSize);
        var currentIndex = 0;

        function next() {
          var currentObjIds = currentBatch.objIds();

          if (currentIndex < currentObjIds.length) {
            var objId = currentObjIds[currentIndex];
            currentIndex++;

            if (priorObjIds[objId]) {
              return next();
            }

            priorObjIds[objId] = true;

            return {
              value: objId,
              done: false
            };
          }

          var nextBatch = currentBatch.nextBatch();
          if (nextBatch) {
            currentBatch = nextBatch;
            currentIndex = 0;

            return next();
          }

          return { done: true };
        }

        return { next: next };
      }
    }]);

    return ObjQuery;
  }();
})();

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.ObjQueryBatch = function () {
    _createClass(ObjQueryBatch, null, [{
      key: 'store',
      value: function store(params, objIds) {
        var state = stateContainer(params, 0);
        var invalidation = invalidationFn(undefined);
        var loadableData = new scrivito.LoadableData({ state: state, invalidation: invalidation });

        loadableData.set({ results: objIds });
      }
    }, {
      key: 'firstBatchFor',
      value: function firstBatchFor(params, batchSize) {
        return new ObjQueryBatch(params, batchSize);
      }
    }, {
      key: '_state',
      value: function _state(params, index) {
        var paramsWithIndex = _underscore2.default.extend({}, params, { index: index });
        var key = scrivito.ObjQueryStore.computeCacheKey(paramsWithIndex);

        return scrivito.ObjQueryStore.stateContainer().subState(key);
      }
    }, {
      key: '_invalidation',
      value: function _invalidation(continuation) {
        return function () {
          return continuation + '|' + scrivito.ObjReplication.getWorkspaceVersion();
        };
      }

      // the constructor should only be called internally,
      // i.e. by ObjQueryBatch itself

    }]);

    function ObjQueryBatch(params, batchSize) {
      var previousBatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      _classCallCheck(this, ObjQueryBatch);

      this._params = params;
      this._batchSize = batchSize;

      if (previousBatch) {
        this._index = previousBatch.index + 1;
        this._continuation = previousBatch.continuationForNextBatch();
        this._previousBatch = previousBatch;
      } else {
        // First batch
        this._index = 0;
      }
    }

    // throws NotLoadedError if not available


    _createClass(ObjQueryBatch, [{
      key: 'objIds',
      value: function objIds() {
        return this._response().results;
      }

      // returns the next batch or undefined if this is the last batch
      // throws NotLoadedError if not available

    }, {
      key: 'nextBatch',
      value: function nextBatch() {
        if (this.continuationForNextBatch()) {
          return new ObjQueryBatch(this._params, this._batchSize, this);
        }
      }
    }, {
      key: 'continuationForNextBatch',
      value: function continuationForNextBatch() {
        return this._response().continuation;
      }
    }, {
      key: '_response',
      value: function _response() {
        return this._data().get();
      }
    }, {
      key: '_data',
      value: function _data() {
        var _this = this;

        return new scrivito.LoadableData({
          state: stateContainer(this._params, this._index),
          loader: function loader() {
            return _this._load();
          },
          invalidation: invalidationFn(this._continuation)
        });
      }
    }, {
      key: '_load',
      value: function _load() {
        var _this2 = this;

        return this._fetchContinuation().then(function (continuation) {
          var batchSpecificParams = { size: _this2._batchSize, continuation: continuation };

          var requestParams = _underscore2.default.extend({}, _this2._params, batchSpecificParams);

          return scrivito.ObjQueryRetrieval.retrieve(requestParams).then(function (response) {
            preloadObjData(response.results);

            return response;
          });
        });
      }
    }, {
      key: '_fetchContinuation',
      value: function _fetchContinuation() {
        var _this3 = this;

        if (this._previousBatch) {
          return scrivito.loadAsync(function () {
            return _this3._previousBatch.continuationForNextBatch();
          });
        }

        return scrivito.Promise.resolve();
      }
    }, {
      key: 'index',
      get: function get() {
        return this._index;
      }
    }]);

    return ObjQueryBatch;
  }();

  function preloadObjData(ids) {
    _underscore2.default.each(ids, function (id) {
      return scrivito.ObjDataStore.preload(id);
    });
  }

  function stateContainer(params, index) {
    var paramsWithIndex = _underscore2.default.extend({}, params, { index: index });
    var key = scrivito.ObjQueryStore.computeCacheKey(paramsWithIndex);

    return scrivito.ObjQueryStore.stateContainer().subState(key);
  }

  function invalidationFn(continuation) {
    return function () {
      return continuation + '|' + scrivito.ObjReplication.getWorkspaceVersion();
    };
  }
})();

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ObjQueryIterator = function () {
    function ObjQueryIterator(query, batchSize) {
      _classCallCheck(this, ObjQueryIterator);

      this._iterator = query.iterator(batchSize);
    }

    _createClass(ObjQueryIterator, [{
      key: "next",
      value: function next() {
        var id = this._fetchNextId();
        if (!id) {
          return { done: true };
        }

        try {
          var objData = scrivito.ObjDataStore.get(id);
          this._nextId = null;

          if (isFinallyDeleted(objData)) {
            return this.next();
          }

          return { value: objData, done: false };
        } catch (error) {
          if (error instanceof scrivito.ResourceNotFoundError) {
            this._nextId = null;
            return this.next();
          }

          throw error;
        }
      }
    }, {
      key: "_fetchNextId",
      value: function _fetchNextId() {
        if (!this._nextId) {
          var _iterator$next = this._iterator.next(),
              value = _iterator$next.value;

          this._nextId = value;
        }

        return this._nextId;
      }
    }]);

    return ObjQueryIterator;
  }();

  function isFinallyDeleted(objData) {
    return !!objData.current._deleted;
  }

  scrivito.ObjQueryIterator = ObjQueryIterator;
})();

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.ObjQueryRetrieval = {
    retrieve: function retrieve(params) {
      var workspaceId = scrivito.currentWorkspaceId();
      var consistentParams = _underscore2.default.extend({ consistent: true }, params);
      return scrivito.CmsRestApi.get('workspaces/' + workspaceId + '/objs/search', consistentParams).then(function (response) {
        response.results = _underscore2.default.pluck(response.results, 'id');
        return _underscore2.default.pick(response, 'results', 'continuation');
      });
    }
  };
})();

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  scrivito.ObjQueryStore = {
    store: function store(params, objIds) {
      scrivito.ObjQuery.store(params, objIds);
    },
    computeCacheKey: function computeCacheKey(obj) {
      return scrivito.computeCacheKey(obj);
    },
    get: function get(params, batchSize) {
      var objQuery = new scrivito.ObjQuery(params);
      return new scrivito.ObjQueryIterator(objQuery, batchSize);
    },
    stateContainer: function stateContainer() {
      return scrivito.cmsState.subState('objQuery');
    },
    clearCache: function clearCache() {
      this.stateContainer().clear();
    }
  };
})();

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var replicationCache = {};
  var disabled = void 0;
  var writeCallbacks = {};
  var subscriptionToken = 0;
  var workspaceVersion = 0;

  scrivito.ObjReplication = function () {
    _createClass(ObjReplication, null, [{
      key: 'get',
      value: function get(id) {
        if (!replicationCache[id]) {
          replicationCache[id] = new scrivito.ObjReplication(id);
        }

        return replicationCache[id];
      }
    }, {
      key: 'subscribeWrites',
      value: function subscribeWrites(callback) {
        subscriptionToken += 1;
        writeCallbacks[subscriptionToken] = callback;
        return subscriptionToken;
      }
    }, {
      key: 'unsubscribeWrites',
      value: function unsubscribeWrites(token) {
        delete writeCallbacks[token];
      }

      // a version counter that increases whenever an Obj in the Workspace is changed.

    }, {
      key: 'getWorkspaceVersion',
      value: function getWorkspaceVersion() {
        return workspaceVersion;
      }
    }]);

    function ObjReplication(id) {
      var _this = this;

      _classCallCheck(this, ObjReplication);

      this._id = id;
      this._replicationActive = false;
      this._scheduledReplication = false;
      this._currentRequestDeferred = null;
      this._nextRequestDeferred = null;
      this._performThrottledReplication = scrivito.throttle(function () {
        return _this._performReplication();
      }, 1000);
    }

    _createClass(ObjReplication, [{
      key: 'notifyLocalState',
      value: function notifyLocalState(localState) {
        if (disabled) {
          return;
        }

        if (this._backendState === undefined) {
          throw new scrivito.InternalError('Can not set local state before backend state.');
        }
        if (this._backendState && this._backendState._deleted) {
          throw new scrivito.InternalError('Can not update a fully deleted obj.');
        }

        this._localState = localState;
        this._startReplication();
      }
    }, {
      key: 'notifyBackendState',
      value: function notifyBackendState(newBackendState) {
        if (this._backendState === undefined) {
          this._updateBackendState(newBackendState);
          this._updateLocalState(newBackendState);
          return;
        }

        var newestKnownBackendState = this._bufferedBackendState || this._backendState;
        if (compareStates(newBackendState, newestKnownBackendState) > 0) {
          if (this._replicationActive) {
            this._bufferedBackendState = newBackendState;
          } else {
            if (newBackendState._deleted) {
              this._updateLocalState(null);
            } else {
              var patch = diff(this._backendState, newBackendState);
              this._updateLocalState(apply(this.localState, patch));
            }
            this._updateBackendState(newBackendState);
          }
        }
      }
    }, {
      key: 'finishSaving',
      value: function finishSaving() {
        var finishSavingPromise = void 0;

        if (this._nextRequestDeferred) {
          finishSavingPromise = this._nextRequestDeferred.promise;
        } else if (this._currentRequestDeferred) {
          finishSavingPromise = this._currentRequestDeferred.promise;
        } else {
          return scrivito.Promise.resolve();
        }

        return finishSavingPromise.catch(function () {
          return scrivito.Promise.reject();
        });
      }
    }, {
      key: '_startReplication',
      value: function _startReplication() {
        var _this2 = this;

        if (!_underscore2.default.isEmpty(diff(this._backendState, this._localState))) {
          if (!this._replicationActive) {
            if (!this._scheduledReplication) {
              this._scheduledReplication = true;
              this._initDeferredForRequest();

              writeStarted(this._currentRequestDeferred.promise);
              scrivito.nextTick(function () {
                return _this2._performThrottledReplication();
              });
            }
          } else {
            if (!this._nextRequestDeferred) {
              this._nextRequestDeferred = new scrivito.Deferred();
            }
          }
        } else {
          if (this._nextRequestDeferred) {
            this._nextRequestDeferred.resolve();
            this._nextRequestDeferred = null;
          }
        }
      }
    }, {
      key: '_performReplication',
      value: function _performReplication() {
        var _this3 = this;

        var localState = this._localState;
        var patch = diff(this._backendState, this._localState);

        this._scheduledReplication = false;
        this._replicationActive = true;

        this._replicatePatchToBackend(patch).then(function (backendState) {
          _this3._handleBackendUpdate(localState, backendState);
          _this3._currentRequestDeferred.resolve(_this3._id);
          _this3._currentRequestDeferred = null;
          _this3._replicationActive = false;

          _this3._startReplication();
        }, function (error) {
          _this3._currentRequestDeferred.reject(error);
          _this3._currentRequestDeferred = null;
          _this3._replicationActive = false;
        });
      }
    }, {
      key: '_replicatePatchToBackend',
      value: function _replicatePatchToBackend(patch) {
        if (patch._modification === 'deleted') {
          return this._deleteObj();
        }

        if (_underscore2.default.isEmpty(patch)) {
          return scrivito.Promise.resolve(this._backendState);
        }

        var workspaceId = scrivito.currentWorkspaceId();
        var path = 'workspaces/' + workspaceId + '/objs/' + this._id;
        return scrivito.CmsRestApi.put(path, { obj: patch });
      }
    }, {
      key: '_deleteObj',
      value: function _deleteObj() {
        var workspaceId = scrivito.currentWorkspaceId();
        var path = 'workspaces/' + workspaceId + '/objs/' + this._id;
        return scrivito.CmsRestApi.delete(path, { include_deleted: true });
      }
    }, {
      key: '_initDeferredForRequest',
      value: function _initDeferredForRequest() {
        if (this._nextRequestDeferred) {
          var currentDeferred = this._nextRequestDeferred;
          this._nextRequestDeferred = null;
          this._currentRequestDeferred = currentDeferred;
        } else {
          this._currentRequestDeferred = new scrivito.Deferred();
        }
      }
    }, {
      key: '_handleBackendUpdate',
      value: function _handleBackendUpdate(replicatedState, backendState) {
        var bufferedLocalChanges = diff(replicatedState, this._localState);

        this._updateBackendState(newerState(backendState, this._bufferedBackendState));
        this._bufferedBackendState = undefined;

        this._updateLocalState(apply(this._backendState, bufferedLocalChanges));
      }
    }, {
      key: '_updateLocalState',
      value: function _updateLocalState(localState) {
        this._localState = localState;
        scrivito.ObjDataStore.set(this._id, this._localState);
      }
    }, {
      key: '_updateBackendState',
      value: function _updateBackendState(newBackendState) {
        if (this._backendState !== undefined) {
          workspaceVersion++;
        }
        this._backendState = newBackendState;
      }

      // For test purpose only.

    }, {
      key: 'isNotStoredInBackend',


      // For test purpose only.
      value: function isNotStoredInBackend() {
        return this._backendState === null;
      }

      // For test purpose only.

    }, {
      key: 'isRequestInFlight',
      value: function isRequestInFlight() {
        return this._replicationActive;
      }

      // For test purpose only.

    }, {
      key: 'backendState',
      get: function get() {
        return this._backendState;
      }

      // For test purpose only.

    }, {
      key: 'localState',
      get: function get() {
        return this._localState;
      }
    }], [{
      key: 'disableReplication',
      value: function disableReplication() {
        disabled = true;
      }

      // For test purpose only.

    }, {
      key: 'enableReplication',
      value: function enableReplication() {
        disabled = false;
      }

      // For test purpose only.

    }, {
      key: 'clearWriteCallbacks',
      value: function clearWriteCallbacks() {
        writeCallbacks = {};
      }

      // For test purpose only.

    }, {
      key: 'clearCache',
      value: function clearCache() {
        replicationCache = {};
      }
    }]);

    return ObjReplication;
  }();

  function diff(stateA, stateB) {
    return scrivito.ObjPatch.diff(stateA, stateB);
  }

  function apply(stateA, patch) {
    return scrivito.ObjPatch.apply(stateA, patch);
  }

  function newerState(stateA, stateB) {
    if (compareStates(stateA, stateB) > 0) {
      return stateA;
    }

    return stateB;
  }

  function compareStates(stateA, stateB) {
    if (!stateA) {
      return -1;
    }
    if (!stateB) {
      return 1;
    }
    return strCompare(stateA._version, stateB._version);
  }

  function strCompare(str1, str2) {
    if (str1 > str2) {
      return 1;
    }
    if (str2 > str1) {
      return -1;
    }
    return 0;
  }

  function writeStarted(promise) {
    _underscore2.default.each(writeCallbacks, function (callback) {
      callback(promise);
    });
  }
})();

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function mget(ids) {
    var workspaceId = scrivito.currentWorkspaceId();

    return scrivito.CmsRestApi.get("workspaces/" + workspaceId + "/objs/mget", {
      ids: ids, include_deleted: true
    }).then(function (response) {
      return response.results;
    });
  }

  // Why batchSize: 17?
  // Retrieval of up to 100 Objs is a common use-case (see ObjSearchIterable)
  // With a batchSize of 17, this leads to 6 concurrent requests,
  // which is the concurrent request limit in many browsers for HTTP/1.
  // This ensures maximum parallel loading.
  var batchRetrieval = new scrivito.BatchRetrieval(mget, { batchSize: 17 });

  scrivito.ObjRetrieval = {
    retrieveObj: function retrieveObj(id) {
      return batchRetrieval.retrieve(id).then(function (value) {
        if (value) {
          return value;
        }

        throw new scrivito.ResourceNotFoundError("Obj with id \"" + id + "\" not found.");
      });
    },


    // For test purpose only.
    reset: function reset() {
      batchRetrieval.reset();
    }
  };
})();

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jsuri = __webpack_require__(121);

var _jsuri2 = _interopRequireDefault(_jsuri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function parseUrl(url) {
    var uri = new _jsuri2.default(url);

    return {
      origin: uri.origin(),
      pathname: uri.path(),
      hash: uri.anchor()
    };
  }

  scrivito.parseUrl = parseUrl;
})();

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _bluebird = __webpack_require__(118);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  _bluebird2.default.noConflict();

  _bluebird2.default.config({
    warnings: false,
    longStackTraces: false
  });

  _underscore2.default.extend(scrivito, {
    Promise: _bluebird2.default,

    promise: {
      enableDebugMode: function enableDebugMode() {
        _bluebird2.default.config({
          warnings: true,
          longStackTraces: true
        });
      },
      wrapInJqueryDeferred: function wrapInJqueryDeferred(promise) {
        var d = $.Deferred();

        promise.then(function (data) {
          return d.resolve(data);
        }, function (error) {
          d.reject(error);
        });

        return d;
      },
      always: function always(promise, callback) {
        promise.then(callback, callback);
        return promise;
      },
      capturePromises: function capturePromises() {
        _bluebird2.default.setScheduler(function (promiseCallback) {
          scrivito.nextTick(promiseCallback);
        });
      }
    }
  });
})();

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  scrivito.PublicPromise = function () {
    _createClass(Promise, null, [{
      key: "all",
      value: function all(promises) {
        return new scrivito.PublicPromise(scrivito.Promise.all(promises));
      }
    }, {
      key: "race",
      value: function race(promises) {
        return new scrivito.PublicPromise(scrivito.Promise.race(promises));
      }
    }, {
      key: "resolve",
      value: function resolve(valueOrThenable) {
        return new scrivito.PublicPromise(scrivito.Promise.resolve(valueOrThenable));
      }
    }, {
      key: "reject",
      value: function reject(valueOrThenable) {
        return new scrivito.PublicPromise(scrivito.Promise.reject(valueOrThenable));
      }
    }]);

    function Promise(promise) {
      _classCallCheck(this, Promise);

      this._internalPromise = promise;
    }

    _createClass(Promise, [{
      key: "then",
      value: function then(resolve, reject) {
        return new scrivito.PublicPromise(this._internalPromise.then(resolve, reject));
      }
    }, {
      key: "catch",
      value: function _catch(reject) {
        return new scrivito.PublicPromise(this._internalPromise.catch(reject));
      }
    }]);

    return Promise;
  }();
})();

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Realm = function () {
    _createClass(Realm, null, [{
      key: 'init',
      value: function init(context) {
        var realm = new Realm();

        context.Obj = realm.Obj;
        context.Widget = realm.Widget;
        context.Link = realm.Link;
        context.appModelAccessor = realm.appModelAccessor;
        context.createObjClass = function () {
          return realm.createObjClass.apply(realm, arguments);
        };
        context.createWidgetClass = function () {
          return realm.createWidgetClass.apply(realm, arguments);
        };
        context.getClass = function () {
          return realm.getClass.apply(realm, arguments);
        };
        context.registerClass = function () {
          return realm.registerClass.apply(realm, arguments);
        };

        context.allObjClasses = function () {
          return realm.allObjClasses();
        };
        context.allWidgetClasses = function () {
          return realm.allWidgetClasses();
        };

        context._privateRealm = realm;
      }
    }]);

    function Realm() {
      _classCallCheck(this, Realm);

      this._registry = new scrivito.Registry();
      this._registry.defaultClassForObjs = scrivito.ObjFactory(this._registry);
      this._registry.defaultClassForWidgets = scrivito.WidgetFactory(this._registry);
      this._registry.defaultClassForLinks = scrivito.LinkFactory(this._registry);
      this._registry.ObjSearchIterable = scrivito.ObjSearchIterableFactory(this._registry);

      this.appModelAccessor = new scrivito.AppModelAccessor(this._registry);
    }

    _createClass(Realm, [{
      key: 'createObjClass',


      // public API
      value: function createObjClass(createOptions) {
        return this._createAppClass(createOptions, this.Obj);
      }

      // public API

    }, {
      key: 'createWidgetClass',
      value: function createWidgetClass(createOptions) {
        return this._createAppClass(createOptions, this.Widget);
      }

      // public API

    }, {
      key: 'getClass',
      value: function getClass(name) {
        return this._registry.getClass(name);
      }

      // public API

    }, {
      key: 'registerClass',
      value: function registerClass(name, appClass) {
        if (!this._isAppClass(appClass)) {
          throw new scrivito.ArgumentError('registerClass has to be called with a CMS object or Widget class.');
        }
        this._registry.register(name, appClass);
      }
    }, {
      key: 'allObjClasses',
      value: function allObjClasses() {
        return this._registry.allObjClasses();
      }
    }, {
      key: 'allWidgetClasses',
      value: function allWidgetClasses() {
        return this._registry.allWidgetClasses();
      }
    }, {
      key: '_createAppClass',
      value: function _createAppClass(createOptions, prototypeClass) {
        var parentClass = createOptions.extend || prototypeClass;
        var appClass = scrivito.AppClassFactory(createOptions, parentClass);
        if (createOptions.name) {
          this._registry.register(createOptions.name, appClass);
        }
        return appClass;
      }
    }, {
      key: '_isAppClass',
      value: function _isAppClass(appClass) {
        var appProto = appClass.prototype;
        return appProto instanceof this.Obj || appProto instanceof this.Widget;
      }
    }, {
      key: 'Obj',
      get: function get() {
        return this._registry.defaultClassForObjs;
      }
    }, {
      key: 'Widget',
      get: function get() {
        return this._registry.defaultClassForWidgets;
      }
    }, {
      key: 'Link',
      get: function get() {
        return this._registry.defaultClassForLinks;
      }
    }, {
      key: 'ObjSearchIterable',
      get: function get() {
        return this._registry.ObjSearchIterable;
      }
    }]);

    return Realm;
  }();

  scrivito.Realm = Realm;
})();

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Registry = function () {
    function Registry() {
      _classCallCheck(this, Registry);

      this._mapping = {};
    }

    _createClass(Registry, [{
      key: 'register',
      value: function register(name, klass) {
        this._mapping[name] = klass;
      }
    }, {
      key: 'getClass',
      value: function getClass(name) {
        return this._mapping[name];
      }
    }, {
      key: 'allObjClasses',
      value: function allObjClasses() {
        return this._allForBaseClass(this.defaultClassForObjs);
      }
    }, {
      key: 'allWidgetClasses',
      value: function allWidgetClasses() {
        return this._allForBaseClass(this.defaultClassForWidgets);
      }
    }, {
      key: 'objClassFor',
      value: function objClassFor(name) {
        return this._appClassFor(name, this.defaultClassForObjs);
      }
    }, {
      key: 'widgetClassFor',
      value: function widgetClassFor(name) {
        return this._appClassFor(name, this.defaultClassForWidgets);
      }
    }, {
      key: 'objClassNameFor',
      value: function objClassNameFor(modelClass) {
        return _underscore2.default.findKey(this._mapping, function (klass) {
          return klass === modelClass;
        });
      }
    }, {
      key: '_appClassFor',
      value: function _appClassFor(name, baseClass) {
        var appClass = this.getClass(name);

        if (appClass && baseClass.isPrototypeOf(appClass)) {
          return appClass;
        }

        return baseClass;
      }
    }, {
      key: '_allForBaseClass',
      value: function _allForBaseClass(baseClass) {
        return _underscore2.default.pick(this._mapping, function (modelClass) {
          return baseClass.isPrototypeOf(modelClass);
        });
      }
    }]);

    return Registry;
  }();

  scrivito.Registry = Registry;
})();

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var VALID_KEYS = ['attributes', 'extend', 'name'];

  var Schema = function () {
    _createClass(Schema, null, [{
      key: 'forInstance',
      value: function forInstance(model) {
        return this.forClass(model.constructor);
      }
    }, {
      key: 'forClass',
      value: function forClass(klass) {
        return klass._scrivitoPrivateSchema;
      }
    }]);

    function Schema(definition, parent) {
      _classCallCheck(this, Schema);

      definition.attributes = definition.attributes || {};

      assertDefinitionIsValid(definition);

      if (parent._scrivitoPrivateSchema) {
        definition.attributes = _underscore2.default.extend({}, parent._scrivitoPrivateSchema.attributes, definition.attributes);
      }

      this.definition = definition;
    }

    _createClass(Schema, [{
      key: 'attributeDefinition',
      value: function attributeDefinition(name) {
        var attrDefinition = this.attributes[name];
        if (attrDefinition) {
          if (_underscore2.default.isString(attrDefinition)) {
            return [attrDefinition];
          }

          return attrDefinition;
        }
      }
    }, {
      key: 'isBinary',
      value: function isBinary() {
        var _ref = this.attributeDefinition('blob') || [],
            _ref2 = _slicedToArray(_ref, 1),
            type = _ref2[0];

        return type === 'binary';
      }
    }, {
      key: 'attributes',
      get: function get() {
        return this.definition.attributes;
      }
    }, {
      key: 'name',
      get: function get() {
        return this.definition.name;
      }
    }]);

    return Schema;
  }();

  function assertDefinitionIsValid(definition) {
    assertValidAttributesHash(definition.attributes);

    var invalidKeys = _underscore2.default.without.apply(_underscore2.default, [_underscore2.default.keys(definition)].concat(VALID_KEYS));
    if (invalidKeys.length) {
      throw new scrivito.ArgumentError('Invalid key(s) ' + scrivito.prettyPrint(invalidKeys) + ' ' + ('given. Valid keys are ' + scrivito.prettyPrint(VALID_KEYS) + '.'));
    }
  }

  function assertValidAttributesHash(attributes) {
    if (attributes.constructor === Object) {
      _underscore2.default.each(attributes, function (typeInfo, attributeName) {
        if (!scrivito.attributeInflection.isCamelCase(attributeName)) {
          throw new scrivito.ArgumentError('Attribute "' + attributeName + '" is not in camel case.');
        }
        if (!(_underscore2.default.isArray(typeInfo) || _underscore2.default.isString(typeInfo))) {
          throw new scrivito.ArgumentError('Attribute definition for "' + attributeName + '" is invalid. ' + 'Should be a String or an Array.');
        }
      });
    } else {
      throw new scrivito.ArgumentError('Required key "attributes" is invalid. Should be an Object.');
    }
  }

  scrivito.Schema = Schema;
})();

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _speakingurl = __webpack_require__(11);

var _speakingurl2 = _interopRequireDefault(_speakingurl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function slug(input) {
    return (0, _speakingurl2.default)(input);
  }

  scrivito.slug = slug;
})();

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _immutable = __webpack_require__(120);

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var treeIdCounter = 0;

  // abstract interface for managing state

  var AbstractStateStore = function () {
    function AbstractStateStore() {
      _classCallCheck(this, AbstractStateStore);
    }

    _createClass(AbstractStateStore, [{
      key: 'get',


      // return current state
      value: function get() {
        throw scrivito.InternalError('implement in subclass');
      }

      // change state

    }, {
      key: 'set',
      value: function set(_newState) {
        throw scrivito.InternalError('implement in subclass');
      }

      // get a string that uniquely identifies this state

    }, {
      key: 'id',
      value: function id() {
        throw scrivito.InternalError('implement in subclass');
      }

      // subscribe to changes to state
      // the listener will be called at least once after each state change.
      // returns a function that should be invoked to unsubscribe.
      // proper unsubscription is important to avoid leaking memory.

    }, {
      key: 'subscribe',
      value: function subscribe(_listener) {
        throw new scrivito.InternalError('implement in subclass');
      }

      // reset the state back to undefined

    }, {
      key: 'clear',
      value: function clear() {
        this.set(undefined);
      }
    }, {
      key: 'subState',
      value: function subState(key) {
        return new StateTreeNode(this, key);
      }
    }, {
      key: 'setSubState',
      value: function setSubState(key, newState) {
        var priorState = this._getAssumingSubTree();

        if (!priorState) {
          this.set(_immutable2.default.Map(_defineProperty({}, key, newState)));
        } else {
          this.set(priorState.set(key, newState));
        }
      }
    }, {
      key: 'getSubState',
      value: function getSubState(key) {
        var state = this._getAssumingSubTree();
        if (state) {
          return state.get(key);
        }
      }

      // return current state, but only if it's a subtree or undefined.

    }, {
      key: '_getAssumingSubTree',
      value: function _getAssumingSubTree() {
        var getValue = this.get();
        if (getValue === undefined) {
          return getValue;
        }
        if (getValue instanceof _immutable2.default.Map) {
          return getValue;
        }
        throw new scrivito.InternalError('Tried to access subtree, but found ' + getValue + '. ' + "Parent nodes can't contain values.");
      }
    }]);

    return AbstractStateStore;
  }();

  // a state tree, which can be used to store state.
  // this is the root of the tree, which keeps the state of the entire tree.


  var StateTree = function (_AbstractStateStore) {
    _inherits(StateTree, _AbstractStateStore);

    function StateTree() {
      _classCallCheck(this, StateTree);

      var _this = _possibleConstructorReturn(this, (StateTree.__proto__ || Object.getPrototypeOf(StateTree)).call(this));

      _this._id = (treeIdCounter++).toString();
      _this.clearListeners();
      _this._batchUpdates = false;
      _this._version = 0;
      return _this;
    }

    _createClass(StateTree, [{
      key: 'get',
      value: function get() {
        return this._state;
      }
    }, {
      key: 'set',
      value: function set(newState) {
        this._state = newState;

        this._version++;

        if (!this._batchUpdates) {
          this._notifyListeners();
        }
      }
    }, {
      key: 'currentVersion',
      value: function currentVersion() {
        return this._version;
      }
    }, {
      key: 'id',
      value: function id() {
        return this._id;
      }
    }, {
      key: 'subscribe',
      value: function subscribe(listener) {
        var _this2 = this;

        if (!listener) {
          throw new scrivito.InternalError('subscribe needs an argument');
        }

        this._listeners = this._listeners.add(listener);

        return function () {
          _this2._listeners = _this2._listeners.remove(listener);
        };
      }
    }, {
      key: 'withBatchedUpdates',
      value: function withBatchedUpdates(fn) {
        var stateBefore = this._state;
        var batchBefore = this._batchUpdates;

        try {
          this._batchUpdates = true;
          fn();
        } finally {
          this._batchUpdates = batchBefore;
          if (!this._batchUpdates && stateBefore !== this._state) {
            this._notifyListeners();
          }
        }
      }

      // For test purpose only.

    }, {
      key: 'listenerCount',
      value: function listenerCount() {
        return this._listeners.size;
      }

      // public for test purpose only.

    }, {
      key: 'clearListeners',
      value: function clearListeners() {
        this._listeners = _immutable2.default.OrderedSet();
      }
    }, {
      key: '_notifyListeners',
      value: function _notifyListeners() {
        this._listeners.forEach(function (listener) {
          return listener();
        });
      }
    }]);

    return StateTree;
  }(AbstractStateStore);

  // a node of a state tree.
  // does not actually keep state, but provides
  // access scoped to a subtree of a StateTree.


  var StateTreeNode = function (_AbstractStateStore2) {
    _inherits(StateTreeNode, _AbstractStateStore2);

    function StateTreeNode(parentState, key) {
      _classCallCheck(this, StateTreeNode);

      if (!_underscore2.default.isString(key)) {
        throw new scrivito.InternalError(key + ' is not a string');
      }

      var _this3 = _possibleConstructorReturn(this, (StateTreeNode.__proto__ || Object.getPrototypeOf(StateTreeNode)).call(this));

      _this3._parentState = parentState;
      _this3._key = key;
      return _this3;
    }

    _createClass(StateTreeNode, [{
      key: 'get',
      value: function get() {
        return this._parentState.getSubState(this._key);
      }
    }, {
      key: 'set',
      value: function set(newState) {
        this._parentState.setSubState(this._key, newState);
      }
    }, {
      key: 'id',
      value: function id() {
        // first convert backslash to double-backslash
        // then convert slash to backslash-slash
        var escapedKey = this._key.replace(/\\/g, '\\\\').replace(/\//g, '\\/');

        return this._parentState.id() + '/' + escapedKey;
      }
    }, {
      key: 'subscribe',
      value: function subscribe(listener) {
        var _this4 = this;

        if (!listener) {
          throw new scrivito.InternalError('subscribe needs an argument');
        }

        var lastState = this.get();

        return this._parentState.subscribe(function () {
          var currentState = _this4.get();

          if (currentState !== lastState) {
            listener();
            lastState = currentState;
          }
        });
      }
    }]);

    return StateTreeNode;
  }(AbstractStateStore);

  // export class


  scrivito.StateTree = StateTree;
})();

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var TestHelper = {
    setup: function setup() {
      scrivito.client.init();
    },
    storeObjSearch: function storeObjSearch(_ref) {
      var query = _ref.query,
          objIds = _ref.objIds;

      query.store(objIds);
    },
    storeObjFacetSearch: function storeObjFacetSearch(_ref2) {
      var query = _ref2.query,
          attribute = _ref2.attribute,
          facets = _ref2.facets,
          _ref2$options = _ref2.options,
          options = _ref2$options === undefined ? {} : _ref2$options;

      scrivito.FacetQuery.store(attribute, options, query.params.query, {
        total: 0,
        results: [],
        facets: [buildFacetApiResult(facets)]
      });
    }
  };

  function buildFacetApiResult(facets) {
    return _underscore2.default.map(facets, function (_ref3) {
      var name = _ref3.name,
          count = _ref3.count,
          _ref3$includedObjIds = _ref3.includedObjIds,
          includedObjIds = _ref3$includedObjIds === undefined ? [] : _ref3$includedObjIds;

      var results = _underscore2.default.map(includedObjIds, function (id) {
        return { id: id };
      });
      return { value: name, total: count, results: results };
    });
  }

  scrivito.TestHelper = TestHelper;
})();

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var shouldBypassThrottle = false;

  function throttle(fn, ms, options) {
    return shouldBypassThrottle ? fn : _underscore2.default.throttle(fn, ms, options);
  }

  function bypassThrottle() {
    shouldBypassThrottle = true;
  }

  scrivito.throttle = throttle;
  scrivito.bypassThrottle = bypassThrottle;
})();

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  scrivito.typeInfo = {
    normalize: function normalize(typeInfo) {
      if (_underscore2.default.isString(typeInfo)) {
        return [typeInfo];
      }

      if (_underscore2.default.isArray(typeInfo)) {
        return typeInfo;
      }

      throw new scrivito.InternalError('Type Info needs to be a string or an array containing a string and optionally a hash');
    },
    normalizeAttrs: function normalizeAttrs(attributes) {
      var _this = this;

      return _underscore2.default.mapObject(attributes, function (_ref, name) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[0],
            typeInfo = _ref2[1];

        if (scrivito.Attribute.isSystemAttribute(name)) {
          return [value];
        }

        return [value, _this.normalize(typeInfo)];
      });
    },
    unwrapAttributes: function unwrapAttributes(attributes) {
      return _underscore2.default.mapObject(attributes, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            value = _ref4[0];

        return value;
      });
    }
  };
})();

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var INTEGER_RANGE_START = -9007199254740991;
  var INTEGER_RANGE_END = 9007199254740991;
  var BACKEND_FORMAT_REGEXP = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;

  scrivito.types = {
    deserializeAsInteger: function deserializeAsInteger(value) {
      if (_underscore2.default.isString(value)) {
        if (value.match(/^-?\d+$/)) {
          return convertToInteger(value);
        }
        return null;
      }
      return convertToInteger(value);
    },
    isValidInteger: function isValidInteger(value) {
      return isInteger(value) && INTEGER_RANGE_START <= value && value <= INTEGER_RANGE_END;
    },
    isValidFloat: function isValidFloat(value) {
      return _underscore2.default.isNumber(value) && _underscore2.default.isFinite(value);
    },
    deserializeAsDate: function deserializeAsDate(value) {
      if (!_underscore2.default.isString(value)) {
        return null;
      }

      if (!scrivito.types.isValidDateString(value)) {
        throw new scrivito.InternalError('The value is not a valid ISO date time: "' + value + '"');
      }

      return scrivito.types.parseStringToDate(value);
    },
    parseStringToDate: function parseStringToDate(dateString) {
      if (!dateString) {
        return;
      }

      var _dateString$match = dateString.match(BACKEND_FORMAT_REGEXP),
          _dateString$match2 = _slicedToArray(_dateString$match, 7),
          _match = _dateString$match2[0],
          year = _dateString$match2[1],
          month = _dateString$match2[2],
          day = _dateString$match2[3],
          hours = _dateString$match2[4],
          minutes = _dateString$match2[5],
          seconds = _dateString$match2[6];

      return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    },
    formatDateToString: function formatDateToString(date) {
      var yearMonth = '' + date.getUTCFullYear() + pad(date.getUTCMonth() + 1);
      var dateHours = '' + pad(date.getUTCDate()) + pad(date.getUTCHours());
      var minutesSeconds = '' + pad(date.getUTCMinutes()) + pad(date.getUTCSeconds());
      return '' + yearMonth + dateHours + minutesSeconds;
    },
    isValidDateString: function isValidDateString(dateString) {
      return _underscore2.default.isString(dateString) && dateString.match(/^\d{14}$/);
    }
  };

  function pad(number) {
    return number < 10 ? '0' + number : number;
  }

  function isInteger(value) {
    return _underscore2.default.isNumber(value) && _underscore2.default.isFinite(value) && Math.floor(value) === value;
  }

  function convertToInteger(valueFromBackend) {
    var intValue = parseInt(valueFromBackend, 10);

    if (intValue === 0) {
      return 0; // otherwise -0 could be returned.
    } else if (scrivito.types.isValidInteger(intValue)) {
      return intValue;
    }

    return null;
  }
})();

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function wrapInAppClass(registry, internalValue) {
    if (_underscore2.default.isArray(internalValue)) {
      return _underscore2.default.map(internalValue, function (value) {
        return wrapInAppClass(registry, value);
      });
    }

    if (internalValue instanceof scrivito.BasicObj) {
      return buildAppClassInstance(internalValue, registry.objClassFor(internalValue.objClass));
    }
    if (internalValue instanceof scrivito.BasicWidget) {
      return buildAppClassInstance(internalValue, registry.widgetClassFor(internalValue.objClass));
    }
    if (internalValue instanceof scrivito.BasicLink) {
      return registry.defaultClassForLinks.build(internalValue.buildAttributes());
    }
    return internalValue;
  }

  function buildAppClassInstance(internalValue, appClass) {
    var externalValue = Object.create(appClass.prototype);
    externalValue._scrivitoPrivateContent = internalValue;
    return externalValue;
  }

  function unwrapAppClassValues(values) {
    if (_underscore2.default.isArray(values)) {
      return _underscore2.default.map(values, unwrapSingleValue);
    }

    return unwrapSingleValue(values);
  }

  function unwrapSingleValue(value) {
    if (value && value._scrivitoPrivateContent) {
      return value._scrivitoPrivateContent;
    }

    return value;
  }

  scrivito.wrapInAppClass = wrapInAppClass;
  scrivito.unwrapAppClassValues = unwrapAppClassValues;
  scrivito.buildAppClassInstance = buildAppClassInstance;
})();

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//= require_self
//= require ./react/prop_types
//= require ./react/create_react_class
//= require_tree ./react

(function () {
  scrivito.React = {};
})();

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _window_registry = __webpack_require__(3);

(function () {
  var registry = {};

  var componentRegistry = {
    provideComponentClass: function provideComponentClass(appClass, componentClass) {
      registry[registryKeyFor(appClass)] = componentClass;
    },
    getComponentClass: function getComponentClass(appClass) {
      return registry[registryKeyFor(appClass)];
    },


    // For test purpose only.
    clear: function clear() {
      registry = {};
    }
  };

  function registryKeyFor(appClass) {
    return (0, _window_registry.getWindowRegistry)().objClassNameFor(appClass);
  }

  scrivito.componentRegistry = componentRegistry;
})();

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_context = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  // public API
  var Content = scrivito.createReactClass({
    displayName: 'scrivito.React.Content',

    propTypes: {
      content: scrivito.PropTypes.oneOfRealmType('Obj', 'Widget'),

      attribute: function attribute(props, propName, componentName) {
        var validationError = React.PropTypes.string.isRequired(props, propName, componentName);

        if (validationError) {
          return validationError;
        }

        var attributeName = props[propName];

        if (/^_/.test(attributeName)) {
          return new scrivito.ArgumentError('Component "scrivito.React.Content" received prop "attribute" with invalid value: ' + ('"' + attributeName + '" is a system attribute. Only custom attributes are allowed.'));
        }
      },


      tag: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return { tag: 'div' };
    },
    render: function render() {
      var schema = scrivito.Schema.forInstance(this.props.content);

      var attributeName = this.props.attribute;
      var attributeDefinition = schema.attributeDefinition(attributeName);

      if (!attributeDefinition) {
        throw new scrivito.ArgumentError('Component "scrivito.React.Content" received prop "attribute" with invalid value: ' + ('Attribute "' + attributeName + '" is not defined for content specified in prop "content".'));
      }

      var attributeValue = (0, _window_context.getWindowContext)().appModelAccessor.read(this.props.content, attributeName);

      if (scrivito.isEditingMode()) {
        return this._renderEditor(attributeName, attributeDefinition);
      }

      return this._renderValue(attributeDefinition, attributeValue);
    },
    _renderEditor: function _renderEditor(attributeName, attributeDefinition) {
      return React.createElement(scrivito.React.Content.Editor, {
        attributeDefinition: attributeDefinition,
        attributeName: attributeName,
        children: this.props.children,
        content: this.props.content,
        customProps: this._customProps(),
        key: this._keyForEditor(),
        tag: this.props.tag
      });
    },
    _renderValue: function _renderValue(_ref, attributeValue) {
      var _ref2 = _slicedToArray(_ref, 1),
          attributeType = _ref2[0];

      var additionalProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var propsForValue = _underscore2.default.extend({
        attributeName: this.props.attribute,
        attributeType: attributeType,
        attributeValue: attributeValue,
        children: this.props.children,
        content: this.props.content,
        customProps: this._customProps(),
        tag: this.props.tag
      }, additionalProps);

      return React.createElement(scrivito.React.Content.AttributeValue, propsForValue);
    },
    _customProps: function _customProps() {
      return _underscore2.default.omit(this.props, 'content', 'attribute', 'tag');
    },
    _keyForEditor: function _keyForEditor() {
      var content = scrivito.unwrapAppClassValues(this.props.content);

      var contentSubKey = void 0;
      if (content instanceof scrivito.BasicObj) {
        contentSubKey = content.id;
      } else {
        contentSubKey = content.obj.id + '|' + content.id;
      }

      return this.props.tag + '|' + contentSubKey + '|' + this.props.attribute;
    }
  });

  scrivito.React.Content = Content;
})();

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var AttributeValue = scrivito.createReactClass({
    displayName: 'scrivito.React.Content.AttributeValue',

    render: function render() {
      switch (this.props.attributeType) {
        case 'html':
          return this._renderHtml(this.props.attributeValue);
        case 'string':
          return this._renderString(this.props.attributeValue);
        case 'widgetlist':
          return this._renderWidgetlist(this.props.attributeValue);
      }

      return this._renderContent({ children: this.props.children });
    },
    _renderHtml: function _renderHtml(attributeValue) {
      if (this.props.children) {
        return this._renderContent({ children: this.props.children });
      }

      var props = {
        dangerouslySetInnerHTML: { __html: scrivito.InternalLinks.transformHTML(attributeValue) },
        onClick: this._onClick
      };

      return this._renderContent({ props: props });
    },
    _onClick: function _onClick(e) {
      var target = scrivito.InternalLinks.findTarget(e.target, e.currentTarget);

      if (target) {
        e.preventDefault();
        e.stopPropagation();

        scrivito.navigateTo(target);
      }
    },
    _renderString: function _renderString(attributeValue) {
      return this._renderContent({ children: this.props.children || attributeValue });
    },
    _renderWidgetlist: function _renderWidgetlist(attributeValue) {
      var children = void 0;

      if (attributeValue.length) {
        children = attributeValue.map(function (widget) {
          return React.createElement(Widget, { key: widget.id, widget: widget });
        });
      } else if (scrivito.isEditingMode()) {
        children = React.createElement(WidgetlistPlaceholder, {
          content: this.props.content,
          attributeName: this.props.attributeName });
      }

      return this._renderContent({ children: children });
    },
    _renderContent: function _renderContent(_ref) {
      var props = _ref.props,
          children = _ref.children;

      var contentProps = _underscore2.default.extend({}, this.props.customProps, props, this._editingProps());
      return React.createElement(this.props.tag, contentProps, children);
    },
    _editingProps: function _editingProps() {
      if (this.props.onClick) {
        return { onClick: this.props.onClick };
      }

      return {};
    }
  });

  var Widget = scrivito.createReactClass({
    displayName: 'scrivito.React.Content.Widget',

    propTypes: {
      widget: scrivito.PropTypes.oneOfRealmType('Widget')
    },

    getInitialState: function getInitialState() {
      return { hasFocus: false, isDragged: false };
    },
    componentDidMount: function componentDidMount() {
      if (scrivito.isEditingMode()) {
        var _extractIdsFromAppCla = extractIdsFromAppClassValues(this.props.widget),
            objId = _extractIdsFromAppCla.objId,
            widgetId = _extractIdsFromAppCla.widgetId;

        var domNode = ReactDOM.findDOMNode(this);
        scrivito.uiAdapter.registerWidgetDropZoneInDom(domNode, objId, widgetId);
      }

      this._focusToken = scrivito.WidgetFocus.subscribe({
        onFocus: this._onWidgetFocus,
        onBlur: this._onWidgetBlur
      });
    },
    componentWillUnmount: function componentWillUnmount() {
      scrivito.WidgetFocus.unsubscribe(this._focusToken);
    },
    render: function render() {
      var widgetContent = React.createElement(WidgetContent, { widget: this.props.widget });

      if (!scrivito.isEditingMode()) {
        return React.createElement(
          'div',
          null,
          widgetContent
        );
      }

      return React.createElement(
        'div',
        _extends({
          className: this._className(),
          style: this._style(),
          onMouseOver: this._onMouseOver,
          onMouseOut: this._onMouseOut
        }, this._dataProps()),
        React.createElement(MenuMarker, { widget: this.props.widget, setDragState: this._setDragState }),
        widgetContent,
        React.createElement(OptionMarker, { position: 'top', widget: this.props.widget }),
        React.createElement(OptionMarker, { position: 'bottom', widget: this.props.widget })
      );
    },
    _setDragState: function _setDragState(isDragging) {
      this.setState({ isDragging: isDragging });
    },
    _className: function _className() {
      if (this.state.hasFocus) {
        return 'scrivito_active scrivito_entered';
      }
    },
    _dataProps: function _dataProps() {
      var dataProps = {
        'data-scrivito-private-widget': true,
        'data-scrivito-private-dropzone': true
      };

      if (this._isStructureMarker()) {
        dataProps['data-scrivito-private-structure-widget'] = true;
      }

      if (this.state.isDragging) {
        dataProps['data-scrivito-private-dropback'] = true;
      }

      return dataProps;
    },
    _style: function _style() {
      if (this.state.isDragging) {
        return { opacity: 0.5 };
      }
    },
    _isStructureMarker: function _isStructureMarker() {
      var schema = scrivito.Schema.forInstance(this.props.widget);

      if (schema) {
        return _underscore2.default.some(schema.attributes, function (_definition, name) {
          var _schema$attributeDefi = schema.attributeDefinition(name),
              _schema$attributeDefi2 = _slicedToArray(_schema$attributeDefi, 1),
              type = _schema$attributeDefi2[0];

          return type === 'widgetlist';
        });
      }

      return false;
    },
    _onMouseOver: function _onMouseOver(e) {
      e.stopPropagation();
      scrivito.WidgetFocus.notifyFocus(this._focusToken);
    },
    _onMouseOut: function _onMouseOut(e) {
      e.stopPropagation();
      scrivito.WidgetFocus.notifyBlur(this._focusToken);
    },
    _onWidgetFocus: function _onWidgetFocus() {
      this.setState({ hasFocus: true });
    },
    _onWidgetBlur: function _onWidgetBlur() {
      this.setState({ hasFocus: false });
    }
  });

  var WidgetContent = scrivito.createReactClass({
    displayName: 'scrivito.React.Content.WidgetContent',

    propTypes: {
      widget: scrivito.PropTypes.oneOfRealmType('Widget')
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return this.props.widget._scrivitoPrivateContent.equals(nextProps.widget._scrivitoPrivateContent);
    },
    render: function render() {
      return React.createElement(this._componentClass(), { widget: this.props.widget });
    },
    renderOnError: function renderOnError() {
      if (scrivito.isEditingMode()) {
        return React.createElement(
          'div',
          { className: 'content_error' },
          'Widget could not be rendered due to application error.'
        );
      }

      return null;
    },
    _componentClass: function _componentClass() {
      var appClass = this.props.widget.constructor;
      var componentClass = scrivito.componentRegistry.getComponentClass(appClass);

      if (!componentClass) {
        throw new scrivito.ArgumentError('No component registered for widget class "' + this.props.widget.objClass + '".');
      }

      return componentClass;
    }
  });

  var MenuMarker = scrivito.createReactClass({
    displayName: 'scrivito.React.Content.MenuMarker',

    propTypes: {
      widget: scrivito.PropTypes.oneOfRealmType('Widget')
    },

    render: function render() {
      return React.createElement(
        'span',
        {
          className: 'scrivito_editing_marker',
          onClick: this._onClick,
          onDragStart: this._onDragStart,
          onDragEnd: this._onDragEnd,
          draggable: 'true' },
        React.createElement('i', { className: 'scrivito_icon' }),
        React.createElement(
          'span',
          { className: 'scrivito_editing_marker_title' },
          this.props.widget.objClass
        )
      );
    },
    _onClick: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      var _extractIdsFromAppCla2 = extractIdsFromAppClassValues(this.props.widget),
          objId = _extractIdsFromAppCla2.objId,
          widgetId = _extractIdsFromAppCla2.widgetId;

      scrivito.uiAdapter.showWidgetMenu(ReactDOM.findDOMNode(this), objId, widgetId);
    },
    _onDragStart: function _onDragStart(e) {
      e.dataTransfer.effectAllowed = 'move';

      var _extractIdsFromAppCla3 = extractIdsFromAppClassValues(this.props.widget),
          objId = _extractIdsFromAppCla3.objId,
          widgetId = _extractIdsFromAppCla3.widgetId;

      scrivito.uiAdapter.onDragStart(objId, widgetId);

      this.props.setDragState(true);
    },
    _onDragEnd: function _onDragEnd() {
      scrivito.uiAdapter.onDragEnd();
      this.props.setDragState(false);
    }
  });

  var OptionMarker = scrivito.createReactClass({
    displayName: 'scrivito.React.Content.OptionMarker',

    propTypes: {
      position: React.PropTypes.oneOf(['top', 'bottom']).isRequired,
      widget: scrivito.PropTypes.oneOfRealmType('Widget')
    },

    render: function render() {
      var className = 'scrivito_option_marker scrivito_' + this.props.position;

      if (scrivito.uiAdapter.alwaysShowOptionMarkers()) {
        className += ' scrivito_visible';
      }

      return React.createElement(
        'span',
        { className: className, onClick: this._onClick },
        React.createElement('i', { className: 'scrivito_icon scrivito_icon_marker_plus' })
      );
    },
    _onClick: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      var _extractIdsFromAppCla4 = extractIdsFromAppClassValues(this.props.widget),
          objId = _extractIdsFromAppCla4.objId,
          widgetId = _extractIdsFromAppCla4.widgetId;

      scrivito.uiAdapter.insertWidget(objId, widgetId, this.props.position);
    }
  });

  var WidgetlistPlaceholder = scrivito.createReactClass({
    displayName: 'scrivito.React.Content.WidgetlistPlaceholder',

    propTypes: {
      attributeName: React.PropTypes.string.isRequired,
      content: scrivito.PropTypes.oneOfRealmType('Obj', 'Widget')
    },

    componentDidMount: function componentDidMount() {
      var attributeName = this.props.attributeName;

      var _extractIdsFromAppCla5 = extractIdsFromAppClassValues(this.props.content),
          objId = _extractIdsFromAppCla5.objId,
          widgetId = _extractIdsFromAppCla5.widgetId;

      var domNode = ReactDOM.findDOMNode(this);
      scrivito.uiAdapter.registerEmptyWidgetlistDropZoneInDom({ domNode: domNode, objId: objId, attributeName: attributeName, widgetId: widgetId });
    },
    render: function render() {
      return React.createElement('div', {
        className: 'scrivito_empty_widget_field',
        'data-scrivito-private-dropzone': 'true',
        onClick: this._onClick });
    },
    _onClick: function _onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      var attributeName = this.props.attributeName;

      var _extractIdsFromAppCla6 = extractIdsFromAppClassValues(this.props.content),
          objId = _extractIdsFromAppCla6.objId,
          widgetId = _extractIdsFromAppCla6.widgetId;

      scrivito.uiAdapter.showWidgetfieldMenu(ReactDOM.findDOMNode(this), {
        objId: objId, widgetId: widgetId, attributeName: attributeName, mousePosition: { x: e.pageX, y: e.pageY }
      });
    }
  });

  function extractIdsFromAppClassValues(content) {
    var basicContent = scrivito.unwrapAppClassValues(content);

    if (basicContent instanceof scrivito.BasicObj) {
      return { objId: basicContent.id };
    }

    return { objId: basicContent.obj.id, widgetId: basicContent.id };
  }

  scrivito.React.Content.AttributeValue = AttributeValue;
})();

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_context = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var Editor = scrivito.createReactClass({
    displayName: 'scrivito.React.Content.Editor',

    getInitialState: function getInitialState() {
      return { domMode: 'None' };
    },
    componentWillMount: function componentWillMount() {
      var _this = this;

      var _props$attributeDefin = _slicedToArray(this.props.attributeDefinition, 2),
          type = _props$attributeDefin[0],
          options = _props$attributeDefin[1];

      var editorClass = scrivito.editorRegistry.editorClassFor({
        type: type, tag: this.props.tag });

      if (editorClass) {
        var attributeInfo = _underscore2.default.extend({ type: type }, _underscore2.default.pick(options, 'validClasses', 'validValues'));
        var controller = new scrivito.EditController(this.props.content, this.props.attributeName, function (domMode) {
          return _this._setDomMode(domMode);
        });
        this._editor = new editorClass({ attributeInfo: attributeInfo, controller: controller });
        this._editor.editorWillBeActivated();
      }
    },
    componentDidMount: function componentDidMount() {
      if (this._editor && this.state.domMode === 'Replace') {
        this._editor.editorDomWasMounted(ReactDOM.findDOMNode(this));
      }
    },
    componentDidUpdate: function componentDidUpdate(_prevProps, prevState) {
      var prevDomMode = prevState.domMode;
      var curDomMode = this.state.domMode;

      if (this._editor && prevDomMode !== curDomMode) {
        if (curDomMode === 'Replace') {
          this._editor.editorDomWasMounted(ReactDOM.findDOMNode(this));
        } else {
          this._editor.editorDomWasUnmounted();
        }
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      if (this._editor) {
        this._editor.editorWillBeDeactivated();
      }
    },
    render: function render() {
      var _this2 = this;

      if (this.state.domMode === 'Replace') {
        var childlessProps = _underscore2.default.omit(this.props.customProps, 'children');
        return React.createElement(this.props.tag, childlessProps);
      }

      var _props$attributeDefin2 = _slicedToArray(this.props.attributeDefinition, 1),
          attributeType = _props$attributeDefin2[0];

      var attributeValue = (0, _window_context.getWindowContext)().appModelAccessor.read(this.props.content, this.props.attributeName);

      return React.createElement(scrivito.React.Content.AttributeValue, {
        attributeName: this.props.attributeName,
        attributeType: attributeType,
        attributeValue: attributeValue,
        children: this.props.children,
        content: this.props.content,
        customProps: this.props.customProps,
        key: this.state.domMode,
        tag: this.props.tag,
        onClick: function onClick(event) {
          return _this2._onClick(event);
        }
      });
    },
    _onClick: function _onClick(event) {
      if (this._editor) {
        this._editor.onClick(new scrivito.EditorEvent(event));
      }
    },
    _setDomMode: function _setDomMode(domMode) {
      this.setState({ domMode: domMode });
    }
  });

  scrivito.React.Content.Editor = Editor;
})();

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  // public API
  var CurrentPage = scrivito.createReactClass({
    displayName: 'scrivito.React.CurrentPage',

    render: function render() {
      var currentPage = scrivito.currentPage();

      if (!currentPage) {
        return null;
      }

      var appClass = currentPage.constructor;
      var componentClass = scrivito.componentRegistry.getComponentClass(appClass);

      if (!componentClass) {
        throw new scrivito.ArgumentError('No component registered for obj class "' + currentPage.objClass + '".');
      }

      return React.createElement(componentClass, { page: currentPage });
    }
  });

  scrivito.React.CurrentPage = CurrentPage;
})();

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  function createErrorPageClass(name, _ref) {
    var isPresent = _ref.isPresent,
        defaultMessage = _ref.defaultMessage;

    return scrivito.createReactClass({
      displayName: 'scrivito.React.' + name,

      render: function render() {
        if (!isPresent()) {
          return null;
        }

        if (this.props.children) {
          return React.createElement(
            'div',
            null,
            this.props.children
          );
        }

        return defaultMessage;
      }
    });
  }

  // public API
  var NotFoundErrorPage = createErrorPageClass('NotFoundErrorPage', {
    isPresent: function isPresent() {
      return scrivito.currentPageError() instanceof scrivito.ResourceNotFoundError;
    },

    defaultMessage: React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'The page you were looking for doesn\'t exist.'
      ),
      React.createElement(
        'p',
        null,
        'You may have mistyped the address or the page may have moved.'
      )
    )
  });

  // public API
  var InternalErrorPage = createErrorPageClass('InternalErrorPage', {
    isPresent: function isPresent() {
      return scrivito.currentPageError() && !(scrivito.currentPageError() instanceof scrivito.ResourceNotFoundError);
    },

    defaultMessage: React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'We\'re sorry, but something went wrong.'
      )
    )
  });

  scrivito.React.NotFoundErrorPage = NotFoundErrorPage;
  scrivito.React.InternalErrorPage = InternalErrorPage;
})();

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  // public API
  var Image = scrivito.createReactClass({
    displayName: 'scrivito.React.Image',

    propTypes: {
      src: scrivito.PropTypes.oneOfRealmType('Obj', 'Widget', 'Binary'),
      attribute: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return { attribute: 'blob' };
    },
    render: function render() {
      var url = this._binary().url;
      var htmlOptions = _underscore2.default.omit(this.props, 'src', 'attribute');

      if (this._isBinarySrc()) {
        return React.createElement('img', _extends({ src: url }, htmlOptions));
      }

      return React.createElement(scrivito.React.Content, _extends({
        attribute: this.props.attribute,
        content: this.props.src,
        tag: 'img',
        src: url
      }, htmlOptions));
    },
    _isBinarySrc: function _isBinarySrc() {
      return this.props.src instanceof scrivito.Binary;
    },
    _binary: function _binary() {
      if (this._isBinarySrc()) {
        return this.props.src;
      }

      var schema = scrivito.Schema.forInstance(this.props.src);
      var attributeType = schema.attributes[this.props.attribute];

      if (!attributeType) {
        throw new scrivito.ScrivitoError('Component "scrivito.React.Image" received prop "src"' + (' with an object missing attribute "' + this.props.attribute + '".'));
      }

      if (attributeType === 'reference') {
        var target = this.props.src.get(this.props.attribute);

        if (target) {
          var binary = target.get('blob');

          if (!binary) {
            throw new scrivito.ScrivitoError('Component "scrivito.React.Image" received prop' + ' "attribute" with an attribute of type "reference", but the referenced object' + ' has no binary attribute "blob".');
          }

          return binary;
        }
      }

      if (attributeType === 'binary') {
        return this.props.src.get(this.props.attribute);
      }

      throw new scrivito.ScrivitoError('Component "scrivito.React.Image" received prop "src"' + (' with an object, whose attribute "' + this.props.attribute + '"') + (' is of invalid type "' + attributeType + '".') + ' Valid attribute types are "binary" and "reference".');
    }
  });

  scrivito.React.Image = Image;
})();

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  // public API
  var Link = scrivito.createReactClass({
    displayName: 'scrivito.React.Link',

    propTypes: {
      to: scrivito.PropTypes.oneOfRealmTypeOrFalsey('Obj', 'Link')
    },

    render: function render() {
      var htmlOptions = _underscore2.default.omit(this.props, 'to');

      return React.createElement(
        'a',
        _extends({ href: this._url(), onClick: this._onClick }, htmlOptions),
        this.props.children
      );
    },
    _url: function _url() {
      if (this.props.to) {
        return scrivito.urlFor(this.props.to);
      }

      return '#';
    },
    _onClick: function _onClick(e) {
      e.preventDefault();

      if (this.props.to) {
        scrivito.navigateTo(this.props.to);
      }
    }
  });

  scrivito.React.Link = Link;
})();

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _window_context = __webpack_require__(1);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var EditController = function () {
    function EditController(model, attribute, setDomMode) {
      _classCallCheck(this, EditController);

      this._model = model;
      this._attribute = attribute;
      this.setDomMode = setDomMode;
    }

    _createClass(EditController, [{
      key: 'content',
      get: function get() {
        return (0, _window_context.getWindowContext)().appModelAccessor.read(this._model, this._attribute);
      },
      set: function set(val) {
        (0, _window_context.getWindowContext)().appModelAccessor.update(this._model, _defineProperty({}, this._attribute, val));
      }
    }]);

    return EditController;
  }();

  scrivito.EditController = EditController;
})();

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var EditorEvent = function () {
    function EditorEvent(internalEvent) {
      _classCallCheck(this, EditorEvent);

      this._internalEvent = internalEvent;
    }

    _createClass(EditorEvent, [{
      key: "preventDefault",
      value: function preventDefault() {
        this._internalEvent.preventDefault();
      }
    }, {
      key: "stopPropagation",
      value: function stopPropagation() {
        this._internalEvent.stopPropagation();
      }
    }]);

    return EditorEvent;
  }();

  scrivito.EditorEvent = EditorEvent;
})();

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _window_context = __webpack_require__(1);

(function () {
  var REG_EXP = /\bobjid:([a-f0-9]{16})\b([^"']*)/g;

  var knownLinks = {};

  var InternalLinks = {
    transformHTML: function transformHTML(htmlString) {
      return htmlString.replace(REG_EXP, function (_match, objId) {
        var getObj = function getObj() {
          return (0, _window_context.getWindowContext)().Obj.get(objId);
        };

        try {
          var url = scrivito.loadWithDefault(undefined, function () {
            return scrivito.urlFor(getObj());
          });

          if (url) {
            knownLinks[url] = getObj();
            return url;
          }

          url = '#__LOADING_OBJ_WITH_ID_' + objId;
          knownLinks[url] = getObj;

          return url;
        } catch (error) {
          if (error instanceof scrivito.ResourceNotFoundError) {
            return '#__MISSING_OBJ_WITH_ID_' + objId;
          }

          throw error;
        }
      });
    },
    findTarget: function findTarget(currentNode, outermostNode) {
      if (currentNode === outermostNode) {
        return null;
      }

      if (currentNode.nodeName === 'A') {
        var target = knownLinks[currentNode.pathname] || knownLinks[currentNode.hash];

        if (target) {
          return target;
        }
      }

      return this.findTarget(currentNode.parentNode, outermostNode);
    },


    // For test purpose only.
    reset: function reset() {
      knownLinks = {};
    }
  };

  scrivito.InternalLinks = InternalLinks;
})();

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _window_context = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  // public API
  function createComponent(componentSpec) {
    if (typeof componentSpec === 'function') {
      return scrivito.createReactClass({
        render: function render() {
          return componentSpec(this.props);
        }
      });
    }

    return scrivito.createReactClass(componentSpec);
  }

  // public API
  function provideComponent(appClass, componentSpec) {
    if (componentSpec.propTypes) {
      throw new scrivito.ArgumentError('Custom props is not allowed when providing a component.');
    }

    var componentClass = createComponentForAppClass(appClass, componentSpec);
    scrivito.componentRegistry.provideComponentClass(appClass, componentClass);
  }

  function createComponentForAppClass(appClass, componentSpec) {
    var Obj = (0, _window_context.getWindowContext)().Obj;
    var Widget = (0, _window_context.getWindowContext)().Widget;

    var propName = void 0;
    var propType = void 0;

    if (appClass.prototype instanceof Obj) {
      propName = 'page';
      propType = Obj;
    } else if (appClass.prototype instanceof Widget) {
      propName = 'widget';
      propType = Widget;
    } else {
      throw new scrivito.ArgumentError(appClass + ' is not a valid application class.');
    }

    var propTypes = _defineProperty({}, propName, React.PropTypes.instanceOf(propType).isRequired);

    if (typeof componentSpec === 'function') {
      return scrivito.createReactClass({
        propTypes: propTypes,

        render: function render() {
          return componentSpec(this.props[propName]);
        }
      });
    }

    return scrivito.createReactClass(_underscore2.default.extend(componentSpec, { propTypes: propTypes }));
  }

  scrivito.createComponent = createComponent;
  scrivito.provideComponent = provideComponent;
})();

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var currentFocus = void 0;
  var currentToken = 0;
  var handlers = {};

  var WidgetFocus = {
    subscribe: function subscribe(_ref) {
      var onFocus = _ref.onFocus,
          onBlur = _ref.onBlur;

      var token = currentToken;

      handlers[token] = { onFocus: onFocus, onBlur: onBlur };
      currentToken += 1;

      return token;
    },
    unsubscribe: function unsubscribe(token) {
      delete handlers[token];
    },
    notifyFocus: function notifyFocus(token) {
      currentFocus = token;
      handlers[currentFocus].onFocus();
    },
    notifyBlur: function notifyBlur(token) {
      // Performance optimization: Only re-render the widget, which lost the focus.
      if (token === currentFocus) {
        handlers[token].onBlur();
      }
    },


    // For test purpose only.
    get handlers() {
      return handlers;
    },

    // For test purpose only.
    reset: function reset() {
      currentFocus = undefined;
      currentToken = 0;
      handlers = {};
    }
  };

  scrivito.WidgetFocus = WidgetFocus;
})();

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2015 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.4.7
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");
var util = _dereq_("./util");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype._drainQueue = function(queue) {
    while (queue.length() > 0) {
        var fn = queue.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (false) {
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (false) {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        (true ||
                         util.env("BLUEBIRD_DEBUG") ||
                         util.env("NODE_ENV") === "development"));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};

Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

return PassThroughHandlerContext;
};

},{"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", value) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (false) {
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (false) {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");

var getDomain;
if (util.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = _dereq_("./debuggability")(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }
    if (self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
}

function Promise(executor) {
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    if (executor !== INTERNAL) {
        check(this, executor);
        this._resolveFromExecutor(executor);
    }
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("expecting an object but got " +
                    "A catch statement predicate " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.4.7";
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./filter.js')(Promise, INTERNAL);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./any.js')(Promise);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (false) {
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util.tryCatch,
                    util.errorObj,
                    util.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
                toggleScheduled = true;
                div2.classList.toggle("foo");
            };

            return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string";
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    "object" !== "undefined";

function env(key) {
    return hasEnvVariables ? __webpack_require__.i({"NODE_ENV":"production"})[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(12), __webpack_require__(125).setImmediate))

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(124)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
    } else {
        root.ErrorStackParser = factory(root.StackFrame);
    }
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    function _map(array, fn, thisArg) {
        if (typeof Array.prototype.map === 'function') {
            return array.map(fn, thisArg);
        } else {
            var output = new Array(array.length);
            for (var i = 0; i < array.length; i++) {
                output[i] = fn.call(thisArg, array[i]);
            }
            return output;
        }
    }

    function _filter(array, fn, thisArg) {
        if (typeof Array.prototype.filter === 'function') {
            return array.filter(fn, thisArg);
        } else {
            var output = [];
            for (var i = 0; i < array.length; i++) {
                if (fn.call(thisArg, array[i])) {
                    output.push(array[i]);
                }
            }
            return output;
        }
    }

    function _indexOf(array, target) {
        if (typeof Array.prototype.indexOf === 'function') {
            return array.indexOf(target);
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === target) {
                    return i;
                }
            }
            return -1;
        }
    }

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame(line);
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;
                    return new StackFrame(functionName,
                        undefined,
                        locationParts[0],
                        locationParts[1],
                        locationParts[2],
                        line);
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame(
                            match[3] || undefined,
                            undefined,
                            match[2],
                            match[1],
                            undefined,
                            lines[i]
                        )
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return _map(filtered, function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');
                return new StackFrame(
                    functionName,
                    args,
                    locationParts[0],
                    locationParts[1],
                    locationParts[2],
                    line);
            }, this);
        }
    };
}));



/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Immutable = factory());
}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); }
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function(map ) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  }

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  }

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  }

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        }
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value)
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    }
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    }
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    }
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    }
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    }
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      }
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    }

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    }
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    }
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function() {
      return Range(0, this.size);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jsUri
 * https://github.com/derek-watson/jsUri
 *
 * Copyright 2013, Derek Watson
 * Released under the MIT license.
 *
 * Includes parseUri regular expressions
 * http://blog.stevenlevithan.com/archives/parseuri
 * Copyright 2007, Steven Levithan
 * Released under the MIT license.
 */

 /*globals define, module */

(function(global) {

  var re = {
    starts_with_slashes: /^\/+/,
    ends_with_slashes: /\/+$/,
    pluses: /\+/g,
    query_separator: /[&;]/,
    uri_parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };

  /**
   * Define forEach for older js environments
   * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
   */
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
      var T, k;

      if (this == null) {
        throw new TypeError(' this is null or not defined');
      }

      var O = Object(this);
      var len = O.length >>> 0;

      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
      }

      if (arguments.length > 1) {
        T = thisArg;
      }

      k = 0;

      while (k < len) {
        var kValue;
        if (k in O) {
          kValue = O[k];
          callback.call(T, kValue, k, O);
        }
        k++;
      }
    };
  }

  /**
   * unescape a query param value
   * @param  {string} s encoded value
   * @return {string}   decoded value
   */
  function decode(s) {
    if (s) {
        s = s.toString().replace(re.pluses, '%20');
        s = decodeURIComponent(s);
    }
    return s;
  }

  /**
   * Breaks a uri string down into its individual parts
   * @param  {string} str uri
   * @return {object}     parts
   */
  function parseUri(str) {
    var parser = re.uri_parser;
    var parserKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "isColonUri", "relative", "path", "directory", "file", "query", "anchor"];
    var m = parser.exec(str || '');
    var parts = {};

    parserKeys.forEach(function(key, i) {
      parts[key] = m[i] || '';
    });

    return parts;
  }

  /**
   * Breaks a query string down into an array of key/value pairs
   * @param  {string} str query
   * @return {array}      array of arrays (key/value pairs)
   */
  function parseQuery(str) {
    var i, ps, p, n, k, v, l;
    var pairs = [];

    if (typeof(str) === 'undefined' || str === null || str === '') {
      return pairs;
    }

    if (str.indexOf('?') === 0) {
      str = str.substring(1);
    }

    ps = str.toString().split(re.query_separator);

    for (i = 0, l = ps.length; i < l; i++) {
      p = ps[i];
      n = p.indexOf('=');

      if (n !== 0) {
        k = decode(p.substring(0, n));
        v = decode(p.substring(n + 1));
        pairs.push(n === -1 ? [p, null] : [k, v]);
      }

    }
    return pairs;
  }

  /**
   * Creates a new Uri object
   * @constructor
   * @param {string} str
   */
  function Uri(str) {
    this.uriParts = parseUri(str);
    this.queryPairs = parseQuery(this.uriParts.query);
    this.hasAuthorityPrefixUserPref = null;
  }

  /**
   * Define getter/setter methods
   */
  ['protocol', 'userInfo', 'host', 'port', 'path', 'anchor'].forEach(function(key) {
    Uri.prototype[key] = function(val) {
      if (typeof val !== 'undefined') {
        this.uriParts[key] = val;
      }
      return this.uriParts[key];
    };
  });

  /**
   * if there is no protocol, the leading // can be enabled or disabled
   * @param  {Boolean}  val
   * @return {Boolean}
   */
  Uri.prototype.hasAuthorityPrefix = function(val) {
    if (typeof val !== 'undefined') {
      this.hasAuthorityPrefixUserPref = val;
    }

    if (this.hasAuthorityPrefixUserPref === null) {
      return (this.uriParts.source.indexOf('//') !== -1);
    } else {
      return this.hasAuthorityPrefixUserPref;
    }
  };

  Uri.prototype.isColonUri = function (val) {
    if (typeof val !== 'undefined') {
      this.uriParts.isColonUri = !!val;
    } else {
      return !!this.uriParts.isColonUri;
    }
  };

  /**
   * Serializes the internal state of the query pairs
   * @param  {string} [val]   set a new query string
   * @return {string}         query string
   */
  Uri.prototype.query = function(val) {
    var s = '', i, param, l;

    if (typeof val !== 'undefined') {
      this.queryPairs = parseQuery(val);
    }

    for (i = 0, l = this.queryPairs.length; i < l; i++) {
      param = this.queryPairs[i];
      if (s.length > 0) {
        s += '&';
      }
      if (param[1] === null) {
        s += param[0];
      } else {
        s += param[0];
        s += '=';
        if (typeof param[1] !== 'undefined') {
          s += encodeURIComponent(param[1]);
        }
      }
    }
    return s.length > 0 ? '?' + s : s;
  };

  /**
   * returns the first query param value found for the key
   * @param  {string} key query key
   * @return {string}     first value found for key
   */
  Uri.prototype.getQueryParamValue = function (key) {
    var param, i, l;
    for (i = 0, l = this.queryPairs.length; i < l; i++) {
      param = this.queryPairs[i];
      if (key === param[0]) {
        return param[1];
      }
    }
  };

  /**
   * returns an array of query param values for the key
   * @param  {string} key query key
   * @return {array}      array of values
   */
  Uri.prototype.getQueryParamValues = function (key) {
    var arr = [], i, param, l;
    for (i = 0, l = this.queryPairs.length; i < l; i++) {
      param = this.queryPairs[i];
      if (key === param[0]) {
        arr.push(param[1]);
      }
    }
    return arr;
  };

  /**
   * removes query parameters
   * @param  {string} key     remove values for key
   * @param  {val}    [val]   remove a specific value, otherwise removes all
   * @return {Uri}            returns self for fluent chaining
   */
  Uri.prototype.deleteQueryParam = function (key, val) {
    var arr = [], i, param, keyMatchesFilter, valMatchesFilter, l;

    for (i = 0, l = this.queryPairs.length; i < l; i++) {

      param = this.queryPairs[i];
      keyMatchesFilter = decode(param[0]) === decode(key);
      valMatchesFilter = param[1] === val;

      if ((arguments.length === 1 && !keyMatchesFilter) || (arguments.length === 2 && (!keyMatchesFilter || !valMatchesFilter))) {
        arr.push(param);
      }
    }

    this.queryPairs = arr;

    return this;
  };

  /**
   * adds a query parameter
   * @param  {string}  key        add values for key
   * @param  {string}  val        value to add
   * @param  {integer} [index]    specific index to add the value at
   * @return {Uri}                returns self for fluent chaining
   */
  Uri.prototype.addQueryParam = function (key, val, index) {
    if (arguments.length === 3 && index !== -1) {
      index = Math.min(index, this.queryPairs.length);
      this.queryPairs.splice(index, 0, [key, val]);
    } else if (arguments.length > 0) {
      this.queryPairs.push([key, val]);
    }
    return this;
  };

  /**
   * test for the existence of a query parameter
   * @param  {string}  key        add values for key
   * @param  {string}  val        value to add
   * @param  {integer} [index]    specific index to add the value at
   * @return {Uri}                returns self for fluent chaining
   */
  Uri.prototype.hasQueryParam = function (key) {
    var i, len = this.queryPairs.length;
    for (i = 0; i < len; i++) {
      if (this.queryPairs[i][0] == key)
        return true;
    }
    return false;
  };

  /**
   * replaces query param values
   * @param  {string} key         key to replace value for
   * @param  {string} newVal      new value
   * @param  {string} [oldVal]    replace only one specific value (otherwise replaces all)
   * @return {Uri}                returns self for fluent chaining
   */
  Uri.prototype.replaceQueryParam = function (key, newVal, oldVal) {
    var index = -1, len = this.queryPairs.length, i, param;

    if (arguments.length === 3) {
      for (i = 0; i < len; i++) {
        param = this.queryPairs[i];
        if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        this.deleteQueryParam(key, decode(oldVal)).addQueryParam(key, newVal, index);
      }
    } else {
      for (i = 0; i < len; i++) {
        param = this.queryPairs[i];
        if (decode(param[0]) === decode(key)) {
          index = i;
          break;
        }
      }
      this.deleteQueryParam(key);
      this.addQueryParam(key, newVal, index);
    }
    return this;
  };

  /**
   * Define fluent setter methods (setProtocol, setHasAuthorityPrefix, etc)
   */
  ['protocol', 'hasAuthorityPrefix', 'isColonUri', 'userInfo', 'host', 'port', 'path', 'query', 'anchor'].forEach(function(key) {
    var method = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
    Uri.prototype[method] = function(val) {
      this[key](val);
      return this;
    };
  });

  /**
   * Scheme name, colon and doubleslash, as required
   * @return {string} http:// or possibly just //
   */
  Uri.prototype.scheme = function() {
    var s = '';

    if (this.protocol()) {
      s += this.protocol();
      if (this.protocol().indexOf(':') !== this.protocol().length - 1) {
        s += ':';
      }
      s += '//';
    } else {
      if (this.hasAuthorityPrefix() && this.host()) {
        s += '//';
      }
    }

    return s;
  };

  /**
   * Same as Mozilla nsIURI.prePath
   * @return {string} scheme://user:password@host:port
   * @see  https://developer.mozilla.org/en/nsIURI
   */
  Uri.prototype.origin = function() {
    var s = this.scheme();

    if (this.userInfo() && this.host()) {
      s += this.userInfo();
      if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
        s += '@';
      }
    }

    if (this.host()) {
      s += this.host();
      if (this.port() || (this.path() && this.path().substr(0, 1).match(/[0-9]/))) {
        s += ':' + this.port();
      }
    }

    return s;
  };

  /**
   * Adds a trailing slash to the path
   */
  Uri.prototype.addTrailingSlash = function() {
    var path = this.path() || '';

    if (path.substr(-1) !== '/') {
      this.path(path + '/');
    }

    return this;
  };

  /**
   * Serializes the internal state of the Uri object
   * @return {string}
   */
  Uri.prototype.toString = function() {
    var path, s = this.origin();

    if (this.isColonUri()) {
      if (this.path()) {
        s += ':'+this.path();
      }
    } else if (this.path()) {
      path = this.path();
      if (!(re.ends_with_slashes.test(s) || re.starts_with_slashes.test(path))) {
        s += '/';
      } else {
        if (s) {
          s.replace(re.ends_with_slashes, '/');
        }
        path = path.replace(re.starts_with_slashes, '/');
      }
      s += path;
    } else {
      if (this.host() && (this.query().toString() || this.anchor())) {
        s += '/';
      }
    }
    if (this.query().toString()) {
      s += this.query().toString();
    }

    if (this.anchor()) {
      if (this.anchor().indexOf('#') !== 0) {
        s += '#';
      }
      s += this.anchor();
    }

    return s;
  };

  /**
   * Clone a Uri object
   * @return {Uri} duplicate copy of the Uri
   */
  Uri.prototype.clone = function() {
    return new Uri(this.toString());
  };

  /**
   * export via AMD or CommonJS, otherwise leak a global
   */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return Uri;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Uri;
  } else {
    global.Uri = Uri;
  }
}(this));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(10)))

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, undefined) {
    'use strict';

    /**
     * getSlug
     * @param  {string} input input string
     * @param  {object|string} opts config object or separator string/char
     * @api    public
     * @return {string}  sluggified string
     */
    var getSlug = function getSlug(input, opts) {

        var separator = '-';
        var uricChars = [';', '?', ':', '@', '&', '=', '+', '$', ',', '/'];
        var uricNoSlashChars = [';', '?', ':', '@', '&', '=', '+', '$', ','];
        var markChars = ['.', '!', '~', '*', '\'', '(', ')'];
        var result = '';
        var diatricString = '';
        var convertSymbols = true;
        var customReplacements = {};
        var maintainCase;
        var titleCase;
        var truncate;
        var uricFlag;
        var uricNoSlashFlag;
        var markFlag;
        var symbol;
        var langChar;
        var lucky;
        var i;
        var ch;
        var l;
        var lastCharWasSymbol;
        var lastCharWasDiatric;
        var allowedChars;

        /**
         * charMap
         * @type {Object}
         */
        var charMap = {

            // latin
            'À': 'A',
            'Á': 'A',
            'Â': 'A',
            'Ã': 'A',
            'Ä': 'Ae',
            'Å': 'A',
            'Æ': 'AE',
            'Ç': 'C',
            'È': 'E',
            'É': 'E',
            'Ê': 'E',
            'Ë': 'E',
            'Ì': 'I',
            'Í': 'I',
            'Î': 'I',
            'Ï': 'I',
            'Ð': 'D',
            'Ñ': 'N',
            'Ò': 'O',
            'Ó': 'O',
            'Ô': 'O',
            'Õ': 'O',
            'Ö': 'Oe',
            'Ő': 'O',
            'Ø': 'O',
            'Ù': 'U',
            'Ú': 'U',
            'Û': 'U',
            'Ü': 'Ue',
            'Ű': 'U',
            'Ý': 'Y',
            'Þ': 'TH',
            'ß': 'ss',
            'à': 'a',
            'á': 'a',
            'â': 'a',
            'ã': 'a',
            'ä': 'ae',
            'å': 'a',
            'æ': 'ae',
            'ç': 'c',
            'è': 'e',
            'é': 'e',
            'ê': 'e',
            'ë': 'e',
            'ì': 'i',
            'í': 'i',
            'î': 'i',
            'ï': 'i',
            'ð': 'd',
            'ñ': 'n',
            'ò': 'o',
            'ó': 'o',
            'ô': 'o',
            'õ': 'o',
            'ö': 'oe',
            'ő': 'o',
            'ø': 'o',
            'ù': 'u',
            'ú': 'u',
            'û': 'u',
            'ü': 'ue',
            'ű': 'u',
            'ý': 'y',
            'þ': 'th',
            'ÿ': 'y',
            'ẞ': 'SS',

            // language specific

            // Arabic
            'ا': 'a',
            'أ': 'a',
            'إ': 'i',
            'آ': 'aa',
            'ؤ': 'u',
            'ئ': 'e',
            'ء': 'a',
            'ب': 'b',
            'ت': 't',
            'ث': 'th',
            'ج': 'j',
            'ح': 'h',
            'خ': 'kh',
            'د': 'd',
            'ذ': 'th',
            'ر': 'r',
            'ز': 'z',
            'س': 's',
            'ش': 'sh',
            'ص': 's',
            'ض': 'dh',
            'ط': 't',
            'ظ': 'z',
            'ع': 'a',
            'غ': 'gh',
            'ف': 'f',
            'ق': 'q',
            'ك': 'k',
            'ل': 'l',
            'م': 'm',
            'ن': 'n',
            'ه': 'h',
            'و': 'w',
            'ي': 'y',
            'ى': 'a',
            'ة': 'h',
            'ﻻ': 'la',
            'ﻷ': 'laa',
            'ﻹ': 'lai',
            'ﻵ': 'laa',

            // Persian additional characters than Arabic
            'گ': 'g',
            'چ': 'ch',
            'پ': 'p',
            'ژ': 'zh',
            'ک': 'k',
            'ی': 'y',

            // Arabic diactrics
            'َ': 'a',
            'ً': 'an',
            'ِ': 'e',
            'ٍ': 'en',
            'ُ': 'u',
            'ٌ': 'on',
            'ْ': '',

            // Arabic numbers
            '٠': '0',
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9',

            // Persian numbers
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',

            // Burmese consonants
            'က': 'k',
            'ခ': 'kh',
            'ဂ': 'g',
            'ဃ': 'ga',
            'င': 'ng',
            'စ': 's',
            'ဆ': 'sa',
            'ဇ': 'z',
            'စျ': 'za',
            'ည': 'ny',
            'ဋ': 't',
            'ဌ': 'ta',
            'ဍ': 'd',
            'ဎ': 'da',
            'ဏ': 'na',
            'တ': 't',
            'ထ': 'ta',
            'ဒ': 'd',
            'ဓ': 'da',
            'န': 'n',
            'ပ': 'p',
            'ဖ': 'pa',
            'ဗ': 'b',
            'ဘ': 'ba',
            'မ': 'm',
            'ယ': 'y',
            'ရ': 'ya',
            'လ': 'l',
            'ဝ': 'w',
            'သ': 'th',
            'ဟ': 'h',
            'ဠ': 'la',
            'အ': 'a',
            // consonant character combos
            'ြ': 'y',
            'ျ': 'ya',
            'ွ': 'w',
            'ြွ': 'yw',
            'ျွ': 'ywa',
            'ှ': 'h',
            // independent vowels
            'ဧ': 'e',
            '၏': '-e',
            'ဣ': 'i',
            'ဤ': '-i',
            'ဉ': 'u',
            'ဦ': '-u',
            'ဩ': 'aw',
            'သြော': 'aw',
            'ဪ': 'aw',
            // numbers
            '၀': '0',
            '၁': '1',
            '၂': '2',
            '၃': '3',
            '၄': '4',
            '၅': '5',
            '၆': '6',
            '၇': '7',
            '၈': '8',
            '၉': '9',
            // virama and tone marks which are silent in transliteration
            '္': '',
            '့': '',
            'း': '',

            // Czech
            'č': 'c',
            'ď': 'd',
            'ě': 'e',
            'ň': 'n',
            'ř': 'r',
            'š': 's',
            'ť': 't',
            'ů': 'u',
            'ž': 'z',
            'Č': 'C',
            'Ď': 'D',
            'Ě': 'E',
            'Ň': 'N',
            'Ř': 'R',
            'Š': 'S',
            'Ť': 'T',
            'Ů': 'U',
            'Ž': 'Z',

            // Dhivehi
            'ހ': 'h',
            'ށ': 'sh',
            'ނ': 'n',
            'ރ': 'r',
            'ބ': 'b',
            'ޅ': 'lh',
            'ކ': 'k',
            'އ': 'a',
            'ވ': 'v',
            'މ': 'm',
            'ފ': 'f',
            'ދ': 'dh',
            'ތ': 'th',
            'ލ': 'l',
            'ގ': 'g',
            'ޏ': 'gn',
            'ސ': 's',
            'ޑ': 'd',
            'ޒ': 'z',
            'ޓ': 't',
            'ޔ': 'y',
            'ޕ': 'p',
            'ޖ': 'j',
            'ޗ': 'ch',
            'ޘ': 'tt',
            'ޙ': 'hh',
            'ޚ': 'kh',
            'ޛ': 'th',
            'ޜ': 'z',
            'ޝ': 'sh',
            'ޞ': 's',
            'ޟ': 'd',
            'ޠ': 't',
            'ޡ': 'z',
            'ޢ': 'a',
            'ޣ': 'gh',
            'ޤ': 'q',
            'ޥ': 'w',
            'ަ': 'a',
            'ާ': 'aa',
            'ި': 'i',
            'ީ': 'ee',
            'ު': 'u',
            'ޫ': 'oo',
            'ެ': 'e',
            'ޭ': 'ey',
            'ޮ': 'o',
            'ޯ': 'oa',
            'ް': '',

            // Greek
            'α': 'a',
            'β': 'v',
            'γ': 'g',
            'δ': 'd',
            'ε': 'e',
            'ζ': 'z',
            'η': 'i',
            'θ': 'th',
            'ι': 'i',
            'κ': 'k',
            'λ': 'l',
            'μ': 'm',
            'ν': 'n',
            'ξ': 'ks',
            'ο': 'o',
            'π': 'p',
            'ρ': 'r',
            'σ': 's',
            'τ': 't',
            'υ': 'y',
            'φ': 'f',
            'χ': 'x',
            'ψ': 'ps',
            'ω': 'o',
            'ά': 'a',
            'έ': 'e',
            'ί': 'i',
            'ό': 'o',
            'ύ': 'y',
            'ή': 'i',
            'ώ': 'o',
            'ς': 's',
            'ϊ': 'i',
            'ΰ': 'y',
            'ϋ': 'y',
            'ΐ': 'i',
            'Α': 'A',
            'Β': 'B',
            'Γ': 'G',
            'Δ': 'D',
            'Ε': 'E',
            'Ζ': 'Z',
            'Η': 'I',
            'Θ': 'TH',
            'Ι': 'I',
            'Κ': 'K',
            'Λ': 'L',
            'Μ': 'M',
            'Ν': 'N',
            'Ξ': 'KS',
            'Ο': 'O',
            'Π': 'P',
            'Ρ': 'R',
            'Σ': 'S',
            'Τ': 'T',
            'Υ': 'Y',
            'Φ': 'F',
            'Χ': 'X',
            'Ψ': 'PS',
            'Ω': 'O',
            'Ά': 'A',
            'Έ': 'E',
            'Ί': 'I',
            'Ό': 'O',
            'Ύ': 'Y',
            'Ή': 'I',
            'Ώ': 'O',
            'Ϊ': 'I',
            'Ϋ': 'Y',

            // Latvian
            'ā': 'a',
            // 'č': 'c', // duplicate
            'ē': 'e',
            'ģ': 'g',
            'ī': 'i',
            'ķ': 'k',
            'ļ': 'l',
            'ņ': 'n',
            // 'š': 's', // duplicate
            'ū': 'u',
            // 'ž': 'z', // duplicate
            'Ā': 'A',
            // 'Č': 'C', // duplicate
            'Ē': 'E',
            'Ģ': 'G',
            'Ī': 'I',
            'Ķ': 'k',
            'Ļ': 'L',
            'Ņ': 'N',
            // 'Š': 'S', // duplicate
            'Ū': 'U',
            // 'Ž': 'Z', // duplicate

            // Macedonian
            'Ќ': 'Kj',
            'ќ': 'kj',
            'Љ': 'Lj',
            'љ': 'lj',
            'Њ': 'Nj',
            'њ': 'nj',
            'Тс': 'Ts',
            'тс': 'ts',

            // Polish
            'ą': 'a',
            'ć': 'c',
            'ę': 'e',
            'ł': 'l',
            'ń': 'n',
            // 'ó': 'o', // duplicate
            'ś': 's',
            'ź': 'z',
            'ż': 'z',
            'Ą': 'A',
            'Ć': 'C',
            'Ę': 'E',
            'Ł': 'L',
            'Ń': 'N',
            'Ś': 'S',
            'Ź': 'Z',
            'Ż': 'Z',

            // Ukranian
            'Є': 'Ye',
            'І': 'I',
            'Ї': 'Yi',
            'Ґ': 'G',
            'є': 'ye',
            'і': 'i',
            'ї': 'yi',
            'ґ': 'g',

            // Romanian
            'ă': 'a',
            'Ă': 'A',
            'ș': 's',
            'Ș': 'S',
            // 'ş': 's', // duplicate
            // 'Ş': 'S', // duplicate
            'ț': 't',
            'Ț': 'T',
            'ţ': 't',
            'Ţ': 'T',

            // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
            // ICAO

            'а': 'a',
            'б': 'b',
            'в': 'v',
            'г': 'g',
            'д': 'd',
            'е': 'e',
            'ё': 'yo',
            'ж': 'zh',
            'з': 'z',
            'и': 'i',
            'й': 'i',
            'к': 'k',
            'л': 'l',
            'м': 'm',
            'н': 'n',
            'о': 'o',
            'п': 'p',
            'р': 'r',
            'с': 's',
            'т': 't',
            'у': 'u',
            'ф': 'f',
            'х': 'kh',
            'ц': 'c',
            'ч': 'ch',
            'ш': 'sh',
            'щ': 'sh',
            'ъ': '',
            'ы': 'y',
            'ь': '',
            'э': 'e',
            'ю': 'yu',
            'я': 'ya',
            'А': 'A',
            'Б': 'B',
            'В': 'V',
            'Г': 'G',
            'Д': 'D',
            'Е': 'E',
            'Ё': 'Yo',
            'Ж': 'Zh',
            'З': 'Z',
            'И': 'I',
            'Й': 'I',
            'К': 'K',
            'Л': 'L',
            'М': 'M',
            'Н': 'N',
            'О': 'O',
            'П': 'P',
            'Р': 'R',
            'С': 'S',
            'Т': 'T',
            'У': 'U',
            'Ф': 'F',
            'Х': 'Kh',
            'Ц': 'C',
            'Ч': 'Ch',
            'Ш': 'Sh',
            'Щ': 'Sh',
            'Ъ': '',
            'Ы': 'Y',
            'Ь': '',
            'Э': 'E',
            'Ю': 'Yu',
            'Я': 'Ya',

            // Serbian
            'ђ': 'dj',
            'ј': 'j',
            // 'љ': 'lj',  // duplicate
            // 'њ': 'nj', // duplicate
            'ћ': 'c',
            'џ': 'dz',
            'Ђ': 'Dj',
            'Ј': 'j',
            // 'Љ': 'Lj', // duplicate
            // 'Њ': 'Nj', // duplicate
            'Ћ': 'C',
            'Џ': 'Dz',

            // Slovak
            'ľ': 'l',
            'ĺ': 'l',
            'ŕ': 'r',
            'Ľ': 'L',
            'Ĺ': 'L',
            'Ŕ': 'R',

            // Turkish
            'ş': 's',
            'Ş': 'S',
            'ı': 'i',
            'İ': 'I',
            // 'ç': 'c', // duplicate
            // 'Ç': 'C', // duplicate
            // 'ü': 'u', // duplicate, see langCharMap
            // 'Ü': 'U', // duplicate, see langCharMap
            // 'ö': 'o', // duplicate, see langCharMap
            // 'Ö': 'O', // duplicate, see langCharMap
            'ğ': 'g',
            'Ğ': 'G',

            // Vietnamese
            'ả': 'a',
            'Ả': 'A',
            'ẳ': 'a',
            'Ẳ': 'A',
            'ẩ': 'a',
            'Ẩ': 'A',
            'đ': 'd',
            'Đ': 'D',
            'ẹ': 'e',
            'Ẹ': 'E',
            'ẽ': 'e',
            'Ẽ': 'E',
            'ẻ': 'e',
            'Ẻ': 'E',
            'ế': 'e',
            'Ế': 'E',
            'ề': 'e',
            'Ề': 'E',
            'ệ': 'e',
            'Ệ': 'E',
            'ễ': 'e',
            'Ễ': 'E',
            'ể': 'e',
            'Ể': 'E',
            'ọ': 'o',
            'Ọ': 'o',
            'ố': 'o',
            'Ố': 'O',
            'ồ': 'o',
            'Ồ': 'O',
            'ổ': 'o',
            'Ổ': 'O',
            'ộ': 'o',
            'Ộ': 'O',
            'ỗ': 'o',
            'Ỗ': 'O',
            'ơ': 'o',
            'Ơ': 'O',
            'ớ': 'o',
            'Ớ': 'O',
            'ờ': 'o',
            'Ờ': 'O',
            'ợ': 'o',
            'Ợ': 'O',
            'ỡ': 'o',
            'Ỡ': 'O',
            'Ở': 'o',
            'ở': 'o',
            'ị': 'i',
            'Ị': 'I',
            'ĩ': 'i',
            'Ĩ': 'I',
            'ỉ': 'i',
            'Ỉ': 'i',
            'ủ': 'u',
            'Ủ': 'U',
            'ụ': 'u',
            'Ụ': 'U',
            'ũ': 'u',
            'Ũ': 'U',
            'ư': 'u',
            'Ư': 'U',
            'ứ': 'u',
            'Ứ': 'U',
            'ừ': 'u',
            'Ừ': 'U',
            'ự': 'u',
            'Ự': 'U',
            'ữ': 'u',
            'Ữ': 'U',
            'ử': 'u',
            'Ử': 'ư',
            'ỷ': 'y',
            'Ỷ': 'y',
            'ỳ': 'y',
            'Ỳ': 'Y',
            'ỵ': 'y',
            'Ỵ': 'Y',
            'ỹ': 'y',
            'Ỹ': 'Y',
            'ạ': 'a',
            'Ạ': 'A',
            'ấ': 'a',
            'Ấ': 'A',
            'ầ': 'a',
            'Ầ': 'A',
            'ậ': 'a',
            'Ậ': 'A',
            'ẫ': 'a',
            'Ẫ': 'A',
            // 'ă': 'a', // duplicate
            // 'Ă': 'A', // duplicate
            'ắ': 'a',
            'Ắ': 'A',
            'ằ': 'a',
            'Ằ': 'A',
            'ặ': 'a',
            'Ặ': 'A',
            'ẵ': 'a',
            'Ẵ': 'A',

            // symbols
            '“': '"',
            '”': '"',
            '‘': '\'',
            '’': '\'',
            '∂': 'd',
            'ƒ': 'f',
            '™': '(TM)',
            '©': '(C)',
            'œ': 'oe',
            'Œ': 'OE',
            '®': '(R)',
            '†': '+',
            '℠': '(SM)',
            '…': '...',
            '˚': 'o',
            'º': 'o',
            'ª': 'a',
            '•': '*',
            '၊': ',',
            '။': '.',

            // currency
            '$': 'USD',
            '€': 'EUR',
            '₢': 'BRN',
            '₣': 'FRF',
            '£': 'GBP',
            '₤': 'ITL',
            '₦': 'NGN',
            '₧': 'ESP',
            '₩': 'KRW',
            '₪': 'ILS',
            '₫': 'VND',
            '₭': 'LAK',
            '₮': 'MNT',
            '₯': 'GRD',
            '₱': 'ARS',
            '₲': 'PYG',
            '₳': 'ARA',
            '₴': 'UAH',
            '₵': 'GHS',
            '¢': 'cent',
            '¥': 'CNY',
            '元': 'CNY',
            '円': 'YEN',
            '﷼': 'IRR',
            '₠': 'EWE',
            '฿': 'THB',
            '₨': 'INR',
            '₹': 'INR',
            '₰': 'PF',
            '₺': 'TRY',
            '؋': 'AFN',
            '₼': 'AZN',
            'лв': 'BGN',
            '៛': 'KHR',
            '₡': 'CRC',
            '₸': 'KZT',
            'ден': 'MKD',
            'zł': 'PLN',
            '₽': 'RUB',
            '₾': 'GEL'

        };

        /**
         * special look ahead character array
         * These characters form with consonants to become 'single'/consonant combo
         * @type [Array]
         */
        var lookAheadCharArray = [
            // burmese
            '်',

            // Dhivehi
            'ް'
        ];

        /**
         * diatricMap for languages where transliteration changes entirely as more diatrics are added
         * @type {Object}
         */
        var diatricMap = {
            // Burmese
            // dependent vowels
            'ာ': 'a',
            'ါ': 'a',
            'ေ': 'e',
            'ဲ': 'e',
            'ိ': 'i',
            'ီ': 'i',
            'ို': 'o',
            'ု': 'u',
            'ူ': 'u',
            'ေါင်': 'aung',
            'ော': 'aw',
            'ော်': 'aw',
            'ေါ': 'aw',
            'ေါ်': 'aw',
            '်': '်', // this is special case but the character will be converted to latin in the code
            'က်': 'et',
            'ိုက်': 'aik',
            'ောက်': 'auk',
            'င်': 'in',
            'ိုင်': 'aing',
            'ောင်': 'aung',
            'စ်': 'it',
            'ည်': 'i',
            'တ်': 'at',
            'ိတ်': 'eik',
            'ုတ်': 'ok',
            'ွတ်': 'ut',
            'ေတ်': 'it',
            'ဒ်': 'd',
            'ိုဒ်': 'ok',
            'ုဒ်': 'ait',
            'န်': 'an',
            'ာန်': 'an',
            'ိန်': 'ein',
            'ုန်': 'on',
            'ွန်': 'un',
            'ပ်': 'at',
            'ိပ်': 'eik',
            'ုပ်': 'ok',
            'ွပ်': 'ut',
            'န်ုပ်': 'nub',
            'မ်': 'an',
            'ိမ်': 'ein',
            'ုမ်': 'on',
            'ွမ်': 'un',
            'ယ်': 'e',
            'ိုလ်': 'ol',
            'ဉ်': 'in',
            'ံ': 'an',
            'ိံ': 'ein',
            'ုံ': 'on',

            // Dhivehi
            'ައް': 'ah',
            'ަށް': 'ah',
        };

        /**
         * langCharMap language specific characters translations
         * @type   {Object}
         */
        var langCharMap = {

            'en': {}, // default language

            'az': { // Azerbaijani
                'ç': 'c',
                'ə': 'e',
                'ğ': 'g',
                'ı': 'i',
                'ö': 'o',
                'ş': 's',
                'ü': 'u',
                'Ç': 'C',
                'Ə': 'E',
                'Ğ': 'G',
                'İ': 'I',
                'Ö': 'O',
                'Ş': 'S',
                'Ü': 'U'
            },

            'cs': { // Czech
                'č': 'c',
                'ď': 'd',
                'ě': 'e',
                'ň': 'n',
                'ř': 'r',
                'š': 's',
                'ť': 't',
                'ů': 'u',
                'ž': 'z',
                'Č': 'C',
                'Ď': 'D',
                'Ě': 'E',
                'Ň': 'N',
                'Ř': 'R',
                'Š': 'S',
                'Ť': 'T',
                'Ů': 'U',
                'Ž': 'Z'
            },

            'fi': { // Finnish
                // 'å': 'a', duplicate see charMap/latin
                // 'Å': 'A', duplicate see charMap/latin
                'ä': 'a', // ok
                'Ä': 'A', // ok
                'ö': 'o', // ok
                'Ö': 'O' // ok
            },

            'hu': { // Hungarian
                'ä': 'a', // ok
                'Ä': 'A', // ok
                // 'á': 'a', duplicate see charMap/latin
                // 'Á': 'A', duplicate see charMap/latin
                'ö': 'o', // ok
                'Ö': 'O', // ok
                // 'ő': 'o', duplicate see charMap/latin
                // 'Ő': 'O', duplicate see charMap/latin
                'ü': 'u',
                'Ü': 'U',
                'ű': 'u',
                'Ű': 'U'
            },

            'lt': { // Lithuanian
                'ą': 'a',
                'č': 'c',
                'ę': 'e',
                'ė': 'e',
                'į': 'i',
                'š': 's',
                'ų': 'u',
                'ū': 'u',
                'ž': 'z',
                'Ą': 'A',
                'Č': 'C',
                'Ę': 'E',
                'Ė': 'E',
                'Į': 'I',
                'Š': 'S',
                'Ų': 'U',
                'Ū': 'U'
            },

            'lv': { // Latvian
                'ā': 'a',
                'č': 'c',
                'ē': 'e',
                'ģ': 'g',
                'ī': 'i',
                'ķ': 'k',
                'ļ': 'l',
                'ņ': 'n',
                'š': 's',
                'ū': 'u',
                'ž': 'z',
                'Ā': 'A',
                'Č': 'C',
                'Ē': 'E',
                'Ģ': 'G',
                'Ī': 'i',
                'Ķ': 'k',
                'Ļ': 'L',
                'Ņ': 'N',
                'Š': 'S',
                'Ū': 'u',
                'Ž': 'Z'
            },

            'pl': { // Polish
                'ą': 'a',
                'ć': 'c',
                'ę': 'e',
                'ł': 'l',
                'ń': 'n',
                'ó': 'o',
                'ś': 's',
                'ź': 'z',
                'ż': 'z',
                'Ą': 'A',
                'Ć': 'C',
                'Ę': 'e',
                'Ł': 'L',
                'Ń': 'N',
                'Ó': 'O',
                'Ś': 'S',
                'Ź': 'Z',
                'Ż': 'Z'
            },

            'sk': { // Slovak
                'ä': 'a',
                'Ä': 'A'
            },

            'sr': { // Serbian
                'љ': 'lj',
                'њ': 'nj',
                'Љ': 'Lj',
                'Њ': 'Nj',
                'đ': 'dj',
                'Đ': 'Dj'
            },

            'tr': { // Turkish
                'Ü': 'U',
                'Ö': 'O',
                'ü': 'u',
                'ö': 'o'
            }
        };

        /**
         * symbolMap language specific symbol translations
         * translations must be transliterated already
         * @type   {Object}
         */
        var symbolMap = {

            'ar': {
                '∆': 'delta',
                '∞': 'la-nihaya',
                '♥': 'hob',
                '&': 'wa',
                '|': 'aw',
                '<': 'aqal-men',
                '>': 'akbar-men',
                '∑': 'majmou',
                '¤': 'omla'
            },

            'az': {},

            'ca': {
                '∆': 'delta',
                '∞': 'infinit',
                '♥': 'amor',
                '&': 'i',
                '|': 'o',
                '<': 'menys que',
                '>': 'mes que',
                '∑': 'suma dels',
                '¤': 'moneda'
            },

            'cs': {
                '∆': 'delta',
                '∞': 'nekonecno',
                '♥': 'laska',
                '&': 'a',
                '|': 'nebo',
                '<': 'mensi nez',
                '>': 'vetsi nez',
                '∑': 'soucet',
                '¤': 'mena'
            },

            'de': {
                '∆': 'delta',
                '∞': 'unendlich',
                '♥': 'Liebe',
                '&': 'und',
                '|': 'oder',
                '<': 'kleiner als',
                '>': 'groesser als',
                '∑': 'Summe von',
                '¤': 'Waehrung'
            },

            'dv': {
                '∆': 'delta',
                '∞': 'kolunulaa',
                '♥': 'loabi',
                '&': 'aai',
                '|': 'noonee',
                '<': 'ah vure kuda',
                '>': 'ah vure bodu',
                '∑': 'jumula',
                '¤': 'faisaa'
            },

            'en': {
                '∆': 'delta',
                '∞': 'infinity',
                '♥': 'love',
                '&': 'and',
                '|': 'or',
                '<': 'less than',
                '>': 'greater than',
                '∑': 'sum',
                '¤': 'currency'
            },

            'es': {
                '∆': 'delta',
                '∞': 'infinito',
                '♥': 'amor',
                '&': 'y',
                '|': 'u',
                '<': 'menos que',
                '>': 'mas que',
                '∑': 'suma de los',
                '¤': 'moneda'
            },

            'fa': {
                '∆': 'delta',
                '∞': 'bi-nahayat',
                '♥': 'eshgh',
                '&': 'va',
                '|': 'ya',
                '<': 'kamtar-az',
                '>': 'bishtar-az',
                '∑': 'majmooe',
                '¤': 'vahed'
            },

            'fi': {
                '∆': 'delta',
                '∞': 'aarettomyys',
                '♥': 'rakkaus',
                '&': 'ja',
                '|': 'tai',
                '<': 'pienempi kuin',
                '>': 'suurempi kuin',
                '∑': 'summa',
                '¤': 'valuutta'
            },

            'fr': {
                '∆': 'delta',
                '∞': 'infiniment',
                '♥': 'Amour',
                '&': 'et',
                '|': 'ou',
                '<': 'moins que',
                '>': 'superieure a',
                '∑': 'somme des',
                '¤': 'monnaie'
            },

            'gr': {},

            'hu': {
                '∆': 'delta',
                '∞': 'vegtelen',
                '♥': 'szerelem',
                '&': 'es',
                '|': 'vagy',
                '<': 'kisebb mint',
                '>': 'nagyobb mint',
                '∑': 'szumma',
                '¤': 'penznem'
            },

            'it': {
                '∆': 'delta',
                '∞': 'infinito',
                '♥': 'amore',
                '&': 'e',
                '|': 'o',
                '<': 'minore di',
                '>': 'maggiore di',
                '∑': 'somma',
                '¤': 'moneta'
            },

            'lt': {
                '∆': 'delta',
                '∞': 'begalybe',
                '♥': 'meile',
                '&': 'ir',
                '|': 'ar',
                '<': 'maziau nei',
                '>': 'daugiau nei',
                '∑': 'suma',
                '¤': 'valiuta'
            },

            'lv': {
                '∆': 'delta',
                '∞': 'bezgaliba',
                '♥': 'milestiba',
                '&': 'un',
                '|': 'vai',
                '<': 'mazak neka',
                '>': 'lielaks neka',
                '∑': 'summa',
                '¤': 'valuta'
            },

            'my': {
                '∆': 'kwahkhyaet',
                '∞': 'asaonasme',
                '♥': 'akhyait',
                '&': 'nhin',
                '|': 'tho',
                '<': 'ngethaw',
                '>': 'kyithaw',
                '∑': 'paungld',
                '¤': 'ngwekye'
            },

            'mk': {},

            'nl': {
                '∆': 'delta',
                '∞': 'oneindig',
                '♥': 'liefde',
                '&': 'en',
                '|': 'of',
                '<': 'kleiner dan',
                '>': 'groter dan',
                '∑': 'som',
                '¤': 'valuta'
            },

            'pl': {
                '∆': 'delta',
                '∞': 'nieskonczonosc',
                '♥': 'milosc',
                '&': 'i',
                '|': 'lub',
                '<': 'mniejsze niz',
                '>': 'wieksze niz',
                '∑': 'suma',
                '¤': 'waluta'
            },

            'pt': {
                '∆': 'delta',
                '∞': 'infinito',
                '♥': 'amor',
                '&': 'e',
                '|': 'ou',
                '<': 'menor que',
                '>': 'maior que',
                '∑': 'soma',
                '¤': 'moeda'
            },

            'ro': {
                '∆': 'delta',
                '∞': 'infinit',
                '♥': 'dragoste',
                '&': 'si',
                '|': 'sau',
                '<': 'mai mic ca',
                '>': 'mai mare ca',
                '∑': 'suma',
                '¤': 'valuta'
            },

            'ru': {
                '∆': 'delta',
                '∞': 'beskonechno',
                '♥': 'lubov',
                '&': 'i',
                '|': 'ili',
                '<': 'menshe',
                '>': 'bolshe',
                '∑': 'summa',
                '¤': 'valjuta'
            },

            'sk': {
                '∆': 'delta',
                '∞': 'nekonecno',
                '♥': 'laska',
                '&': 'a',
                '|': 'alebo',
                '<': 'menej ako',
                '>': 'viac ako',
                '∑': 'sucet',
                '¤': 'mena'
            },

            'sr': {},

            'tr': {
                '∆': 'delta',
                '∞': 'sonsuzluk',
                '♥': 'ask',
                '&': 've',
                '|': 'veya',
                '<': 'kucuktur',
                '>': 'buyuktur',
                '∑': 'toplam',
                '¤': 'para birimi'
            },

            'uk': {
                '∆': 'delta',
                '∞': 'bezkinechnist',
                '♥': 'lubov',
                '&': 'i',
                '|': 'abo',
                '<': 'menshe',
                '>': 'bilshe',
                '∑': 'suma',
                '¤': 'valjuta'
            },

            'vn': {
                '∆': 'delta',
                '∞': 'vo cuc',
                '♥': 'yeu',
                '&': 'va',
                '|': 'hoac',
                '<': 'nho hon',
                '>': 'lon hon',
                '∑': 'tong',
                '¤': 'tien te'
            }
        };

        if (typeof input !== 'string') {
            return '';
        }

        if (typeof opts === 'string') {
            separator = opts;
        }

        symbol = symbolMap.en;
        langChar = langCharMap.en;

        if (typeof opts === 'object') {

            maintainCase = opts.maintainCase || false;
            customReplacements = (opts.custom && typeof opts.custom === 'object') ? opts.custom : customReplacements;
            truncate = (+opts.truncate > 1 && opts.truncate) || false;
            uricFlag = opts.uric || false;
            uricNoSlashFlag = opts.uricNoSlash || false;
            markFlag = opts.mark || false;
            convertSymbols = (opts.symbols === false || opts.lang === false) ? false : true;
            separator = opts.separator || separator;

            if (uricFlag) {
                allowedChars += uricChars.join('');
            }

            if (uricNoSlashFlag) {
                allowedChars += uricNoSlashChars.join('');
            }

            if (markFlag) {
                allowedChars += markChars.join('');
            }

            symbol = (opts.lang && symbolMap[opts.lang] && convertSymbols) ?
                symbolMap[opts.lang] : (convertSymbols ? symbolMap.en : {});

            langChar = (opts.lang && langCharMap[opts.lang]) ?
                langCharMap[opts.lang] :
                opts.lang === false || opts.lang === true ? {} : langCharMap.en;

            // if titleCase config is an Array, rewrite to object format
            if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {

                opts.titleCase.forEach(function (v) {
                    customReplacements[v + ""] = v + "";
                });

                titleCase = true;
            } else {
                titleCase = !!opts.titleCase;
            }

            // if custom config is an Array, rewrite to object format
            if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) {

                opts.custom.forEach(function (v) {
                    customReplacements[v + ""] = v + "";
                });
            }

            // custom replacements
            Object.keys(customReplacements).forEach(function (v) {

                var r;

                if (v.length > 1) {
                    r = new RegExp('\\b' + escapeChars(v) + '\\b', 'gi');
                } else {
                    r = new RegExp(escapeChars(v), 'gi');
                }

                input = input.replace(r, customReplacements[v]);
            });

            // add all custom replacement to allowed charlist
            for (ch in customReplacements) {
                allowedChars += ch;
            }

        }

        allowedChars += separator;

        // escape all necessary chars
        allowedChars = escapeChars(allowedChars);

        // trim whitespaces
        input = input.replace(/(^\s+|\s+$)/g, '');

        lastCharWasSymbol = false;
        lastCharWasDiatric = false;

        for (i = 0, l = input.length; i < l; i++) {

            ch = input[i];

            if (isReplacedCustomChar(ch, customReplacements)) {
                // don't convert a already converted char
                lastCharWasSymbol = false;
            } else if (langChar[ch]) {
                // process language specific diactrics chars conversion
                ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? ' ' + langChar[ch] : langChar[ch];

                lastCharWasSymbol = false;
            } else if (ch in charMap) {
                // the transliteration changes entirely when some special characters are added
                if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
                    diatricString += ch;
                    ch = '';
                } else if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + charMap[ch];
                    diatricString = '';
                } else {
                    // process diactrics chars
                    ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? ' ' + charMap[ch] : charMap[ch];
                }

                lastCharWasSymbol = false;
                lastCharWasDiatric = false;
            } else
            if (ch in diatricMap) {
                diatricString += ch;
                ch = '';
                // end of string, put the whole meaningful word
                if (i === l - 1) {
                    ch = diatricMap[diatricString];
                }
                lastCharWasDiatric = true;
            } else if (
                // process symbol chars
                symbol[ch] && !(uricFlag && uricChars.join('')
                    .indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.join('')
                    //.indexOf(ch) !== -1) && !(markFlag && markChars.join('')
                    .indexOf(ch) !== -1)) {

                ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
                ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : '';

                lastCharWasSymbol = true;
            } else {
                if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + ch;
                    diatricString = '';
                    lastCharWasDiatric = false;
                } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) {
                    // process latin chars
                    ch = ' ' + ch;
                }
                lastCharWasSymbol = false;
            }

            // add allowed chars
            result += ch.replace(new RegExp('[^\\w\\s' + allowedChars + '_-]', 'g'), separator);
        }

        if (titleCase) {
            result = result.replace(/(\w)(\S*)/g, function (_, i, r) {
                var j = i.toUpperCase() + (r !== null ? r : "");
                return (Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0) ? j : j.toLowerCase();
            });
        }

        // eliminate duplicate separators
        // add separator
        // trim separators from start and end
        result = result.replace(/\s+/g, separator)
            .replace(new RegExp('\\' + separator + '+', 'g'), separator)
            .replace(new RegExp('(^\\' + separator + '+|\\' + separator + '+$)', 'g'), '');

        if (truncate && result.length > truncate) {

            lucky = result.charAt(truncate) === separator;
            result = result.slice(0, truncate);

            if (!lucky) {
                result = result.slice(0, result.lastIndexOf(separator));
            }
        }

        if (!maintainCase && !titleCase) {
            result = result.toLowerCase();
        }

        return result;
    };

    /**
     * createSlug curried(opts)(input)
     * @param   {object|string} opts config object or input string
     * @return  {Function} function getSlugWithConfig()
     **/
    var createSlug = function createSlug(opts) {

        /**
         * getSlugWithConfig
         * @param   {string} input string
         * @return  {string} slug string
         */
        return function getSlugWithConfig(input) {
            return getSlug(input, opts);
        };
    };

    /**
     * escape Chars
     * @param   {string} input string
     */
    var escapeChars = function escapeChars(input) {

        return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, '\\$&');
    };

    /**
     * check if the char is an already converted char from custom list
     * @param   {char} ch character to check
     * @param   {object} customReplacements custom translation map
     */
    var isReplacedCustomChar = function (ch, customReplacements) {

        for (var c in customReplacements) {
            if (customReplacements[c] === ch) {
                return true;
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {

        // export functions for use in Node
        module.exports = getSlug;
        module.exports.createSlug = createSlug;

    } else if (true) {

        // export function for use in AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return getSlug;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    } else {

        // don't overwrite global if exists
        try {
            if (root.getSlug || root.createSlug) {
                throw 'speakingurl: globals exists /(getSlug|createSlug)/';
            } else {
                root.getSlug = getSlug;
                root.createSlug = createSlug;
            }
        } catch (e) {}

    }
})(this);

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.StackFrame = factory();
    }
}(this, function () {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
        if (functionName !== undefined) {
            this.setFunctionName(functionName);
        }
        if (args !== undefined) {
            this.setArgs(args);
        }
        if (fileName !== undefined) {
            this.setFileName(fileName);
        }
        if (lineNumber !== undefined) {
            this.setLineNumber(lineNumber);
        }
        if (columnNumber !== undefined) {
            this.setColumnNumber(columnNumber);
        }
        if (source !== undefined) {
            this.setSource(source);
        }
    }

    StackFrame.prototype = {
        getFunctionName: function () {
            return this.functionName;
        },
        setFunctionName: function (v) {
            this.functionName = String(v);
        },

        getArgs: function () {
            return this.args;
        },
        setArgs: function (v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        // NOTE: Property name may be misleading as it includes the path,
        // but it somewhat mirrors V8's JavaScriptStackTraceApi
        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
        getFileName: function () {
            return this.fileName;
        },
        setFileName: function (v) {
            this.fileName = String(v);
        },

        getLineNumber: function () {
            return this.lineNumber;
        },
        setLineNumber: function (v) {
            if (!_isNumber(v)) {
                throw new TypeError('Line Number must be a Number');
            }
            this.lineNumber = Number(v);
        },

        getColumnNumber: function () {
            return this.columnNumber;
        },
        setColumnNumber: function (v) {
            if (!_isNumber(v)) {
                throw new TypeError('Column Number must be a Number');
            }
            this.columnNumber = Number(v);
        },

        getSource: function () {
            return this.source;
        },
        setSource: function (v) {
            this.source = String(v);
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    return StackFrame;
}));


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(122);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app_adapter.es6.js": 21,
	"./browser_location.es6.js": 22,
	"./change_location.es6.js": 23,
	"./configure.es6.js": 24,
	"./current_page.es6.js": 25,
	"./editor_registry.es6.js": 26,
	"./is_editing_mode.es6.js": 27,
	"./provide_ui_config.es6.js": 28,
	"./routing.es6.js": 29,
	"./routing_path.es6.js": 30,
	"./scroll_window_to_top.es6.js": 31,
	"./url_for.es6.js": 32,
	"./window_context.es6.js": 1,
	"./window_registry.es6.js": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 126;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ajax.es6.js": 34,
	"./async_methods.es6.js": 35,
	"./attribute_inflection.es6.js": 36,
	"./attribute_serializer.es6.js": 37,
	"./batch_retrieval.es6.js": 38,
	"./batched_state_updater.es6.js": 39,
	"./binary_utils.es6.js": 40,
	"./cms_rest_api.es6.js": 41,
	"./compute_cache_key.es6.js": 42,
	"./convert_to_slug.es6.js": 43,
	"./current_workspace.es6.js": 44,
	"./deferred.es6.js": 45,
	"./error_logging.es6.js": 46,
	"./errors.es6.js": 47,
	"./facet_query.es6.js": 48,
	"./fetch.es6.js": 49,
	"./find_widget_placement.es6.js": 50,
	"./initialization.es6.js": 51,
	"./iterable.es6.js": 52,
	"./loadable/load_all_until.es6.js": 53,
	"./loadable/load_async.es6.js": 54,
	"./loadable/loadable_data.es6.js": 55,
	"./loadable/loadable_value.es6.js": 56,
	"./loadable/loadable_with_default.es6.js": 57,
	"./loadable/map_and_load_parallel.es6.js": 58,
	"./loadable/not_loaded_error.es6.js": 59,
	"./models/app_class_factory.es6.js": 60,
	"./models/app_model_accessor.es6.js": 61,
	"./models/attribute.es6.js": 62,
	"./models/attribute_content_factory.es6.js": 63,
	"./models/attribute_deserializer.es6.js": 64,
	"./models/basic_attribute_content.es6.js": 65,
	"./models/basic_field.es6.js": 66,
	"./models/basic_link.es6.js": 67,
	"./models/basic_obj.es6.js": 68,
	"./models/basic_obj_facet_value.es6.js": 69,
	"./models/basic_obj_search_iterable.es6.js": 70,
	"./models/basic_widget.es6.js": 71,
	"./models/binary.es6.js": 72,
	"./models/future_binary.es6.js": 73,
	"./models/link_factory.es6.js": 74,
	"./models/metadata_collection.es6.js": 75,
	"./models/obj_facet_value.es6.js": 76,
	"./models/obj_factory.es6.js": 77,
	"./models/obj_search_iterable_factory.es6.js": 78,
	"./models/widget_factory.es6.js": 79,
	"./next_tick.es6.js": 80,
	"./obj_data.es6.js": 81,
	"./obj_data_store.es6.js": 82,
	"./obj_patch.es6.js": 83,
	"./obj_query.es6.js": 84,
	"./obj_query_batch.es6.js": 85,
	"./obj_query_iterator.es6.js": 86,
	"./obj_query_retrieval.es6.js": 87,
	"./obj_query_store.es6.js": 88,
	"./obj_replication.es6.js": 89,
	"./obj_retrieval.es6.js": 90,
	"./parse_url.es6.js": 91,
	"./promise.es6.js": 92,
	"./public_promise.es6.js": 93,
	"./random.es6.js": 4,
	"./realm.es6.js": 94,
	"./registry.es6.js": 95,
	"./schema.es6.js": 96,
	"./session.es6.js": 6,
	"./session_keeper.es6.js": 7,
	"./slug.es6.js": 97,
	"./state_tree.es6.js": 98,
	"./test_helper.es6.js": 99,
	"./throttle.es6.js": 100,
	"./type_info.es6.js": 101,
	"./types.es6.js": 102,
	"./wrap_in_app_class.es6.js": 103
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 127;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./component_registry.es6.js": 105,
	"./components/content.js.jsx": 106,
	"./components/content/attribute_value.js.jsx": 107,
	"./components/content/editor.js.jsx": 108,
	"./components/current_page.js.jsx": 109,
	"./components/errors.js.jsx": 110,
	"./components/image.js.jsx": 111,
	"./components/link.js.jsx": 112,
	"./create_react_class.js.jsx": 8,
	"./edit_controller.es6.js": 113,
	"./editor_event.es6.js": 114,
	"./internal_links.es6.js": 115,
	"./prop_types.es6.js": 9,
	"./provide_component.es6.js": 116,
	"./widget_focus.es6.js": 117
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 128;


/***/ }),
/* 129 */,
/* 130 */,
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

__webpack_require__(13);

__webpack_require__(2);

/***/ })
/******/ ]);
