export default class View {
  constructor (options) {
    this.options = options
    this.$el = options.$el
    this.props = options.props
  }

  template () {
  }

  render () {
    this.$el.innerHTML = this.template()
  }
}