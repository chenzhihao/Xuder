import View from './View'
export default class FavoritesView extends View {
  constructor (options) {
    super(options)
    this.store = options.store
    this.props = this.store.getState()
    this.shallowCompare = options.shallowCompare

    this.store.subscribe(this.updateView.bind(this))
  }

  updateView () {
    const props = this.store.getState()
    this.props = props
    this.render()
  }

  template () {
    const props = this.props

    return `<p>You liked ${props.favorites.length} device(s)</p>`
  }
}
