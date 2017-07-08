[![Build Status](https://travis-ci.org/chenzhihao/Xuder.svg?branch=master)](https://travis-ci.org/chenzhihao/Xuder)
[![codecov](https://codecov.io/gh/chenzhihao/Xuder/branch/master/graph/badge.svg)](https://codecov.io/gh/chenzhihao/Xuder)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard) 

# Xuder
A reasonable approximation of Redux from scratch.

## Usage

### Installation
```
$ npm install xuder
```
Or put the <i>build/xuder.js</i> file in html \<script> directly.


### APIs
Its API is as same as Redux.
```javascript
import {combineReducers, shallowCompare, createStore, applyMiddleware} from 'xuder'
```

### Build Reducers is as same as the Redux usage
```javascript
import {combineReducer} from 'xuder'

const fruitReducer = function (state = 'cherry', action) {
  switch (action.type) {
    case 'apple': {
      return 'apple'
    }
    case 'banana': {
      return 'banana'
    }
    default:
      return state
  }
}

const animalReducer = function (state = 'donkey', action) {
  switch (action.type) {
    case 'dog': {
      return 'dog'
    }
    case 'cat': {
      return 'cat'
    }
    default:
      return state
  }
}

const reducer = combineReducer({
  fruit: fruitReducer,
  animal: animalReducer,
})
```

### Create Store
```javascript
import {createStore} from 'xuder'
const store = createStore(reducer)
// or
const store = createStore(reducer, initialState)
// or
const store = createStore(reducer, enhancer)
// or
const store = createStore(reducer, initialState, enhancer)

```

### Middleware Mechanism
```javascript
import {applyMiddleware} from 'xuder'
const middlewareFirst = store => dispatch => action => {
  //...
}
const middlewareNext = store => dispatch => action => {
  //...
}

const enhancer = applyMiddleware(middlewareNext, middlewareFirst)
```


### How to subscribe a Store

```javascript
const unsubscribe = store.subscribe(function () {
//    ...
})
  
  
// A simple Example:

function listener () {
console.log(store.getState().animal)
}

store.subscribe(listener)
store.dispatch({type: 'dog'})

// will console.log('dog')
```
