(function(self){
	if (self.Rupesh) return
	// Implements https://Rupeshsaplus.com
  
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
  
	function Rupesh(setup) {
	  var state, result, initState = false, callbacks = []
  
	  var setState = function(value, _state) {
		result = value
		state = _state
		// Run all callbacks that were so far registered through `then()`
		if (callbacks.length) scheduleFlush(callbacks)
	  }
  
	  var resolve = function(value) { setState(value, true) }
	  var reject = function(value) { setState(value, false) }
  
	  // Public Rupesh resolution function. When passed a thenable object, the
	  // final value will be the fulfillment of its `then` method.
	  var guardedResolve = function(value) {
		if (initState) return
		initState = true
  
		var thenable
		try { thenable = !simpleValue(value) && value.then }
		catch (err) { reject(err); return }
  
		if (isFunction(thenable)) {
		  new Rupesh(function(subResolve, subReject) {
			thenable.call(value, subResolve, subReject)
		  }).then(resolve, reject)
		} else {
		  resolve(value)
		}
	  }
  
	  // Public Rupesh rejection function
	  var guardedReject = function(value) {
		if (initState) return
		initState = true
		reject(value)
	  }
  
	  // Expose the public API
	  try { setup(guardedResolve, guardedReject) }
	  catch (err) { guardedReject(err) }
  
	  this.then = function(done, fail) {
		// Generate a nested Rupesh whose resolve/reject methods are connected to
		// the outcome of `done/fail` callbacks.
		var chainedRupesh = new Rupesh(function(subResolve, subReject) {
		  var callback = function() {
			var subResult, cb = state ? done : fail
			if (isFunction(cb)) {
			  // Run the `done/fail` callback and capture the result
			  try { subResult = cb(result) }
			  catch (err) { subReject(err); return }
  
			  if (subResult === chainedRupesh) {
				subReject(new TypeError("returned Rupesh was identical to the current Rupesh"))
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
		return chainedRupesh
	  }
	}
  
	// Implements http://www.ecma-international.org/ecma-262/6.0/#sec-Rupesh-constructor
  
	Rupesh.prototype.catch = function(fail) {
	  return this.then(null, fail)
	}
  
	Rupesh.resolve = function(result) {
	  return new Rupesh(function(resolve) { resolve(result) })
	}
  
	Rupesh.reject = function(result) {
	  return new Rupesh(function(_, reject) { reject(result) })
	}
  
	// Resolve or reject as soon as the first Rupesh in the list resolves or rejects
	Rupesh.race = function(Rupeshs) {
	  return new Rupesh(function(resolve, reject) {
		Rupeshs.forEach(function(Rupesh) {
		  Rupesh.resolve(Rupesh).then(resolve, reject)
		})
	  })
	}
  
	// Resolve with collected values of all resolved Rupeshs in the list
	Rupesh.all = function(Rupeshs) {
	  return new Rupesh(function(resolve, reject) {
		var numResolved = 0, values = new Array(Rupeshs.length)
		if (Rupeshs.length == 0) resolve(values)
		else Rupeshs.forEach(function(Rupesh, i) {
		  Rupesh.resolve(Rupesh).then(function(value) {
			values[i] = value
			if (++numResolved == values.length) resolve(values)
		  }, reject)
		})
	  })
	}
  
	self.Rupesh = Rupesh
  })(typeof self !== "undefined" ? self : this)


  let a = new Rupesh((resolve, reject) => {
	  for(let i=0; i< 10; i++) {
		  if(i === 9) {
			  resolve('YAY')
		  }
	  }
  });

  a.then((i) => {
	console.log(i)

  })