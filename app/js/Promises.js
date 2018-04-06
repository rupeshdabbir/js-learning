(function(self){
    if (self.Promise) return
    // Implements https://promisesaplus.com
  
    function isFunction(fn) {
      return typeof fn == 'function'
    }
  
    // Values that should never be checked for presence of a `then` method
    function simpleValue(fn) {
      return !fn || typeof fn == 'number' || typeof fn == 'boolean'
    }
  
    function scheduleFlush(callbacks) {
      setTimeout(function() {
        for (var i = 0; i < callbacks.length; i++) callbacks[i]()
        callbacks.length = 0
      }, 0)
    }
  
    function Promise(setup) {
      var state, result, initState = false, callbacks = []
  
      var setState = function(value, _state) {
        result = value
        state = _state
        // Run all callbacks that were so far registered through `then()`
        if (callbacks.length) scheduleFlush(callbacks)
      }
  
      var resolve = function(value) { setState(value, true) }
      var reject = function(value) { setState(value, false) }
  
      // Public promise resolution function. When passed a thenable object, the
      // final value will be the fulfillment of its `then` method.
      var guardedResolve = function(value) {
        if (initState) return
        initState = true
  
        var thenable
        try { thenable = !simpleValue(value) && value.then }
        catch (err) { reject(err); return }
  
        if (isFunction(thenable)) {
          new Promise(function(subResolve, subReject) {
            thenable.call(value, subResolve, subReject)
          }).then(resolve, reject)
        } else {
          resolve(value)
        }
      }
  
      // Public promise rejection function
      var guardedReject = function(value) {
        if (initState) return
        initState = true
        reject(value)
      }
  
      // Expose the public API
      try { setup(guardedResolve, guardedReject) }
      catch (err) { guardedReject(err) }
  
      this.then = function(done, fail) {
        // Generate a nested promise whose resolve/reject methods are connected to
        // the outcome of `done/fail` callbacks.
        var chainedPromise = new Promise(function(subResolve, subReject) {
          var callback = function() {
            var subResult, cb = state ? done : fail
            if (isFunction(cb)) {
              // Run the `done/fail` callback and capture the result
              try { subResult = cb(result) }
              catch (err) { subReject(err); return }
  
              if (subResult === chainedPromise) {
                subReject(new TypeError("returned promise was identical to the current promise"))
              } else {
                subResolve(subResult)
              }
            } else {
              (state ? subResolve : subReject)(result)
            }
          }
  
          callbacks.push(callback)
          if (state !== undefined) scheduleFlush(callbacks)
        })
        return chainedPromise
      }
    }
  
    // Implements http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor
  
    Promise.prototype.catch = function(fail) {
      return this.then(null, fail)
    }
  
    Promise.resolve = function(result) {
      return new Promise(function(resolve) { resolve(result) })
    }
  
    Promise.reject = function(result) {
      return new Promise(function(_, reject) { reject(result) })
    }
  
    // Resolve or reject as soon as the first promise in the list resolves or rejects
    Promise.race = function(promises) {
      return new Promise(function(resolve, reject) {
        promises.forEach(function(promise) {
          Promise.resolve(promise).then(resolve, reject)
        })
      })
    }
  
    // Resolve with collected values of all resolved promises in the list
    Promise.all = function(promises) {
      return new Promise(function(resolve, reject) {
        var numResolved = 0, values = new Array(promises.length)
        if (promises.length == 0) resolve(values)
        else promises.forEach(function(promise, i) {
          Promise.resolve(promise).then(function(value) {
            values[i] = value
            if (++numResolved == values.length) resolve(values)
          }, reject)
        })
      })
    }
  
    self.Promise = Promise
  })(typeof self !== "undefined" ? self : this)
  
  
  var test = new Promise(function(resolve, reject) {
     for (var i=0; i<10; i++) {
         if (i==7)
           resolve(i);
     } 
  });
  
  test.then((i) => {
      console.log(i);
  })