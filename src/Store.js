export const ActionTypes = {
  INIT: '@@xuder/INIT'
}

export default class Store {
  constructor (reducer) {
    this.reducer = reducer
    this.state = {}
    this.subscribers = []
    this.dispatch = this._dispatch.bind(this)
    this.dispatch(ActionTypes.INIT)
  }

  _dispatch (action) {
    this.state = this.reducer(this.state, action)

    this
      .subscribers
      .forEach(subscriber => subscriber())
  }

  subscribe (subscriber) {
    const me = this
    me.subscribers = me
      .subscribers
      .concat(subscriber)

    // unsubscribe
    return () => {
      const index = me.subscribers.indexOf(subscriber)
      me.subscribers.splice(index, 1)
    }
  }

  getState () {
    return this.state
  }
}
