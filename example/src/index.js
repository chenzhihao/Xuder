import DeviceView from './DeviceView'
import FavoritesView from './FavoritesView'

const {Store, combineReducers, shallowCompare} = window.xuder

const deviceReducer = function (state = [], action) {
  switch (action.type) {
    case 'addDevice': {
      const newState = state.concat(action.payload)
      return newState
    }
    case 'deleteDevice': {
      const newState = state.filter(device => device.id !== action.payload.id)
      return newState
    }
    default:
      return state
  }
}

const favoriteReducer = function (state = [], action) {
  switch (action.type) {
    case 'addFavorite': {
      const newState = state.concat(action.payload.favoriteId).filter(function (id, index, me) {
        return index == me.indexOf(id);
      })

      return newState
    }
    case 'deleteFavorite': {
      const newState = state.filter(favoriteId => favoriteId !== action.payload.favoriteId)
      return newState
    }
    default:
      return state
  }
}

const store = new Store(combineReducers({
  devices: deviceReducer,
  favorites: favoriteReducer
}))

const deviceView = new DeviceView({
  $el: document.querySelector('.header'),
  store,
  shallowCompare
})
deviceView.render()

const favoritesView = new FavoritesView({
  $el: document.querySelector('.like-counting'),
  store,
  shallowCompare
})
favoritesView.render()

for (let i = 0; i < 20; i++) {
  store.dispatch({type: 'addDevice', payload: {name: `device${i}`, id: `${i}`}})
}
