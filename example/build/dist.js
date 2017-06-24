(function () {
'use strict';

class View {
  constructor (options) {
    this.options = options;
    this.$el = options.$el;
    this.props = options.props;
  }

  template () {
  }

  render () {
    this.$el.innerHTML = this.template();
  }
}

class DeviceView extends View {
  constructor (options) {
    super(options);
    this.store = options.store;
    this.props = this.store.getState();
    this.shallowCompare = options.shallowCompare;
    // connect to store
    this.store.subscribe(this.updateView.bind(this));
  }

  updateView () {
    const props = this.store.getState();
    this.props = props;
    this.render();
  }

  template () {
    const props = this.props;

    return `<ul>${props.devices.map(device => {
      const isLiked = props.favorites.indexOf(device.id) > -1;
      return isLiked ? `<li> <button attr-deviceId=${device.id} class="liked">Dislike</button><span>${device.name}</span></li>`
        : `<li> <button attr-deviceId=${device.id} >Like</button><span>${device.name}</span></li>`
    }).join('')}</ul>`
  }

  render () {
    const me = this;
    super.render();

    this._clickListener = this._clickListener || function (e) {
      if (e.target && e.target.nodeName === 'BUTTON') {
        const deviceId = e.target.getAttribute('attr-deviceId');

        const isLiked = me.props.favorites.indexOf(deviceId) > -1;
        if (isLiked) {
          me.store.dispatch({type: 'deleteFavorite', payload: {favoriteId: deviceId}});
        } else {
          me.store.dispatch({type: 'addFavorite', payload: {favoriteId: deviceId}});
        }
      }
    };

    this.$el.removeEventListener('click', this._clickListener);
    this.$el.addEventListener('click', this._clickListener);
  }
}

class FavoritesView extends View {
  constructor (options) {
    super(options);
    this.store = options.store;
    this.props = this.store.getState();
    this.shallowCompare = options.shallowCompare;

    this.store.subscribe(this.updateView.bind(this));
  }

  updateView () {
    const props = this.store.getState();
    this.props = props;
    this.render();
  }

  template () {
    const props = this.props;

    return `<p>You liked ${props.favorites.length} device(s)</p>`
  }
}

const {createStore, combineReducers, shallowCompare} = window.xuder;

const deviceReducer = function (state = [], action) {
  switch (action.type) {
    case 'addDevice': {
      const newState = state.concat(action.payload);
      return newState
    }
    case 'deleteDevice': {
      const newState = state.filter(device => device.id !== action.payload.id);
      return newState
    }
    default:
      return state
  }
};

const favoriteReducer = function (state = [], action) {
  switch (action.type) {
    case 'addFavorite': {
      const newState = state.concat(action.payload.favoriteId).filter(function (id, index, me) {
        return index == me.indexOf(id)
      });

      return newState
    }
    case 'deleteFavorite': {
      const newState = state.filter(favoriteId => favoriteId !== action.payload.favoriteId);
      return newState
    }
    default:
      return state
  }
};

const store = createStore(combineReducers({
  devices: deviceReducer,
  favorites: favoriteReducer
}));

window.store = store;

const deviceView = new DeviceView({
  $el: document.querySelector('.header'),
  store,
  shallowCompare
});
deviceView.render();

const favoritesView = new FavoritesView({
  $el: document.querySelector('.like-counting'),
  store,
  shallowCompare
});
favoritesView.render();

for (let i = 0; i < 20; i++) {
  store.dispatch({type: 'addDevice', payload: {name: `device${i}`, id: `${i}`}});
}

}());
//# sourceMappingURL=dist.js.map
