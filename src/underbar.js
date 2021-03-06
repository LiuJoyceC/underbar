(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) { // all tests passed!

    // Write code here:
    return val;
    // end

  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) { // all tests passed!
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) { // all tests passed!

    // Write code here:
    return n === undefined ? array[array.length - 1] : array.slice(Math.max(array.length - n, 0));
    // end

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) { // all tests passed!

    // Write code here:
    var key;
    // Will use for loop if collection is an array, else will use for-in loop for object
    if (Array.isArray(collection)) {
      for (key = 0; key < collection.length; key++) {
        iterator(collection[key], key, collection);
      }
    } else {
      for (key in collection) {
        iterator(collection[key], key, collection);
      }
    }
    // end

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){ // all tests passed!
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) { // all tests passed!

    // Write code here:
    var result = [];

    _.each(collection, function(item) {
      if (test(item)) {
        result.push(item);
      }
    })

    return result;
    // end

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) { // all tests passed!
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    // Write code here:
    return _.filter(collection, function(item) {return !test(item)});
    // end

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) { // all tests passed!

    // Write code here:
    var result = [];

    _.each(array, function(item) {
      if (_.indexOf(result,item) === -1) {
        result.push(item);
      }
    })

    return result;
    // end

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) { // all tests passed!
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    // Write code here:
    var result = [];

    _.each(collection, function(item) {result.push(iterator(item))});

    return result;
    // end

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) { // all tests passed!
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) { // all tests passed!

    // Write code here:

    /* Old code, which only worked if collection is array:

    // Makes a copy of collection so that the original collection passed in does not get altered.
    var collCopy = collection.slice();
    // If accumulator not defined, assigned to first element of collection,
    // and takes that first element out of the collection
    accumulator = (accumulator === undefined) ? collCopy.shift() : accumulator;

    _.each(collCopy, function(item) {
      accumulator = iterator(accumulator, item);
    });

    return accumulator; */

    //New code, which works with both arrays and objects:
    var excludeKey;
    if (accumulator === undefined) {
      if (Array.isArray(collection)) {
        excludeKey = 0;
      } else {
        for (var firstKey in collection) {
          excludeKey = firstKey;
          break;
        }
      }
      accumulator = collection[excludeKey];
    }

    _.each(collection, function(item, key) {
      if (key !== excludeKey) {
        accumulator = iterator(accumulator, item, key);
      }
    });

    return accumulator;
    // end

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) { // all tests passed! (Had to modify _.reduce)
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) { // all tests passed!
    // TIP: Try re-using reduce() here.
    // Write code here:
    iterator  = iterator || _.identity;
    return _.reduce(collection, function(accumulator, item) {
      if (!accumulator) {return false;}
      return !!iterator(item);
    }, true);
    // end
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) { // all tests passed!
    // TIP: There's a very clever way to re-use every() here.
    // Write code here:
    iterator = iterator || _.identity;
    return !_.every(collection, function(val) {return !iterator(val);});
    // end
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) { // all tests passed!
    // Write code here:
    return _.reduce(arguments, function(to, from) {
      for (var key in from) {
        to[key] = from[key];
      }
      return to;
    });
    // end
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) { // all tests passed!
    // Write code here:
    // The inner _.extend returns an object identical to what we want, but fails the
    // strict equality test to obj when obj and all other arguments are empty objects
    // (test case 1). This is resolved with the outer call to _.extend.
    // [].reverse.apply(arguments) reverses order of arguments.
    return _.extend(obj, _.extend.apply(null,[].reverse.apply(arguments)));
    // end
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) { // all tests passed!
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) { // all tests passed!
    // Write code here:
    var usedParam = [];
    var storedResults = [];

    return function(arg) {
      var ind = _.indexOf(usedParam, arg);
      if (ind === -1) {
        var result = func.apply(this, arguments);
        usedParam.push(arg);
        storedResults.push(result);
        return result;
      } else {
        return storedResults[ind];
      }
    }
    // end
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) { // all tests passed!
    // Write code here:
    // In most browsers other than IE9 (or older), it works to simply invoke:
    //                setTimeout.apply(this,arguments);
    // But in order to make this work in IE9, I will write the code like this:
    var args = [].slice.call(arguments,2);
    var wrapper = function() {func.apply(this,args);};
    setTimeout(wrapper,wait);
    // end
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) { // all tests passed!
    // Write code here:
    var arrayCopy = array.slice();
    var result = [];
    while (arrayCopy.length > 1) {
      var randInd = Math.floor(Math.random() * arrayCopy.length);
      result.push(arrayCopy[randInd]);
      arrayCopy = arrayCopy.slice(0, randInd).concat(arrayCopy.slice(randInd + 1));
    }
    result.push(arrayCopy[0]);

    if (deepEqual(array, result)) { // ensures last test is passed
      return _.shuffle(array);
    } else {
      return result;
    }
    // end
  };

  // I wrote the following as a helper function:
  function deepEqual(obj1, obj2) {

    // helper function
    var containKeys = function(obj1, obj2) {
      for (var key in obj2) {
        if (!(key in obj1)) {
          return false;
        }
      }
      return true;
    }

    switch (true) {
      case (typeof obj1 != 'object' || typeof obj2 != 'object' || obj1 === null || obj2 === null):
        return obj1 === obj2;
      case (Array.isArray(obj1) != Array.isArray(obj2)):
        return false;
      case (Array.isArray(obj1) && obj1.length == obj2.length):
        for (var i = 0; i < obj1.length; i++) {
          if (!deepEqual(obj1[i], obj2[i])) {
            return false;
          }
        }
        return true;
      case (!(Array.isArray(obj1)) && containKeys(obj1,obj2) && containKeys(obj2,obj1)):
        for (var key in obj1) {
          if (!deepEqual(obj1[key], obj2[key])) {
            return false;
          }
        }
        return true;
/*        return _.reduce(obj1, function(accumulator, val, key) {
          if (!accumulator) {
            return false;
          } else {
            return deepEqual(val, obj2[key]);
          };
        }, true;); */
      default:
        return false;
    }
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) { // all tests passed!
    // Write code here:
    args = args || [];
    var result = [];
    var isFunction = typeof functionOrKey === 'function';

    _.each(collection, function(val) {
      var newVal = isFunction ? functionOrKey.apply(val,args) : val[functionOrKey](args);
      result.push(newVal);
    });
    return result;
    // end
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) { // all tests passes!
    // Write code here:
    if (collection.length === 0) {return [];}

    var iterator2 = (typeof iterator == 'function')
                ? iterator
                : function(obj) {return obj[iterator];};

    var refVal = iterator2(collection[0]);

    var isLessThan = function(item) {
      var compareVal = iterator2(item);
      if ((compareVal !== undefined) && (refVal === undefined)) {
        return true;
      } else {
        return compareVal < refVal;
      }
    }

    var lessThan = _.filter(collection.slice(1), isLessThan);
    var notLessThan = _.reject(collection.slice(1), isLessThan);

    var head = _.sortBy(lessThan, iterator).concat([collection[0]]);
    return head.concat(_.sortBy(notLessThan, iterator));

    // end
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var args = [].slice.apply(arguments);
    _.each(args, function(array, argsInd) {
      _.each(array, function(val, arrayInd) {
        if (result[arrayInd] === undefined) {
          result[arrayInd] = [];
          result[arrayInd].length = args.length;
        }

        result[arrayInd][argsInd] = val;
      });
    });
    return result;
  };

  // Takes a multidimensional ar99ray and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) { // all tests passed!
    result = result || [];
    _.each(nestedArray, function(val) {
      if (Array.isArray(val)) {
        _.flatten(val, result);
      } else {
        result.push(val);
      }
    })
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() { // all tests passed!
    var args = [].slice.apply(arguments);

    return _.filter(args[0], function(val) {
      return _.every(args.slice(1), function(array) {
        return _.contains(array, val);
      })
    })
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) { // all tests passed!
    var args = [].slice.apply(arguments);

    return _.reject(array, function(val) {
      return _.some(args.slice(1), function(collection) {
        return _.contains(collection, val);
      })
    })
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
