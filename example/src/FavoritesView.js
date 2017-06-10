import View from './View'
export default class FavoritesView extends View {
  constructor (options) {
    super(options)
    this.store = options.store
    this.shallowCompare = options.shallowCompare

    function mapStateToProps (state) {
      return {favorites: state.favorites}
    }

    this.props = mapStateToProps(this.store.getState())

    this.store.subscribe(mapStateToProps)(this.updateView.bind(this))
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

    return `<p>You liked ${props.favorites.length} device(s)</p>`

  }
}
