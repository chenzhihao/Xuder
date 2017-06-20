import View from './View'
export default class DeviceView extends View {
  constructor (options) {
    super(options)
    this.store = options.store
    this.props = this.store.getState()
    this.shallowCompare = options.shallowCompare
    // connect to store
    this.store.subscribe(this.updateView.bind(this))
  }

  updateView () {
    const props = this.store.getState()
    this.props = props
    this.render()
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
      if (e.target && e.target.nodeName === 'BUTTON') {
        const deviceId = e.target.getAttribute('attr-deviceId')

        const isLiked = me.props.favorites.indexOf(deviceId) > -1
        if (isLiked) {
          me.store.dispatch({type: 'deleteFavorite', payload: {favoriteId: deviceId}})
        } else {
          me.store.dispatch({type: 'addFavorite', payload: {favoriteId: deviceId}})
        }
      }
    }

    this.$el.removeEventListener('click', this._clickListener)
    this.$el.addEventListener('click', this._clickListener)
  }
}
