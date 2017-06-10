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
  const unsubscribe = store.subscribe(mapStateToProps, mapDispatchToProps)(function ({...stateProps, ...dispatchProps}) {
    ...
  })
  
  
  // A simple Example:
  function mapStateToProps (state) {
    return {favoriteAnimal: state.animal}
  }
  
  function listener (props) {
    console.log(props.favoriteAnimal)
  }

  store.subscribe(mapStateToProps)(listener)
  store.dispatch({type: 'dog'})
  
  // will console.log('dog')
```