[![Build Status](https://travis-ci.org/chenzhihao/Xuder.svg?branch=master)](https://travis-ci.org/chenzhihao/Xuder)
[![codecov](https://codecov.io/gh/chenzhihao/Xuder/branch/master/graph/badge.svg)](https://codecov.io/gh/chenzhihao/Xuder)

# Xuder
Build on the simplicity of Redux. A predicable state container.

## Usage

### Build Reducers is as same as the Redux usage:
```javascript
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

### Create Store:
###### todo: middleware mechanism

```javascript
  const store = new Store(reducer)
  // Store will get the initial state from reducers
  //{fruit: 'cherry', animal: 'donkey'})
  store.getState()
```


### How to subscribe a Store:

```javascript
  const unsubscribe = store.subscribe(function () {
    ...
  })
  
  
  // A simple Example:

  function listener () {
    console.log(store.getState().animal)
  }

  store.subscribe(listener)
  store.dispatch({type: 'dog'})
  
  // will console.log('dog')
```