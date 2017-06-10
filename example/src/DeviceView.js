import View from './View'
export default class DeviceView extends View {
  constructor (options) {
    super(options)
    this.store = options.store
    this.shallowCompare = options.shallowCompare

    // connect to store
    function mapStateToProps (state) {
      return {devices: state.devices, favorites: state.favorites}
    }

    function mapDispatchToProps (dispatch) {
      return {
        actions: {
          addFavorite: payload => dispatch({type: 'addFavorite', payload}),
          deleteFavorite: payload => dispatch({type: 'deleteFavorite', payload})
        }
      }
    }

    // initial props
    this.props = mapStateToProps(this.store.getState())

    this.store.subscribe(mapStateToProps, mapDispatchToProps)(this.updateView.bind(this))
  }

  updateView (props) {
    if (this.shallowCompare(this.props, props)) {
      this.props = props
      this.render()
    }

    this.props = props
  }

  template () {
    const props = this.props

    return `<ul>${props.devices.map(device => {
      const isLiked = props.favorites.indexOf(device.id) > -1
      return isLiked ? `<li> <button attr-deviceId=${device.id} class="liked">Dislike</button><span>${device.name}</span></li>`
        : `<li> <button attr-deviceId=${device.id} >Like</button><span>${device.name}</span></li>`
    }).join('')}</ul>`
  }

  render () {
    const me = this
    super.render()

    this._clickListener = this._clickListener || function (e) {
        if (e.target && e.target.nodeName == 'BUTTON') {
          const deviceId = e.target.getAttribute('attr-deviceId')

          const isLiked = me.props.favorites.indexOf(deviceId) > -1
          if (isLiked) {
            me.props.actions.deleteFavorite({favoriteId: deviceId})
          } else {
            me.props.actions.addFavorite({favoriteId: deviceId})
          }

        }
      }

    this.$el.removeEventListener('click', this._clickListener)
    this.$el.addEventListener('click', this._clickListener)
  }
}
