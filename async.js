import React, {PropTypes} from 'react'

class Async extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      started: false
    }
  }
  componentWillReceiveProps (nP) {
    if (nP.promise !== this.props.promise) {
      this.state = {}
      this.forceUpdate()
      this.handlePromise(nP.promise)
    }
  }
  handlePromise (prom) {
    this.setState({
      started: true
    })
    prom.then((res) => {
      this.setState({
        resolved: res,
        finished: true
      })
    }, (err) => {
      this.setState({
        rejected: err,
        finished: true
      })
    })
  }
  componentWillMount () {
    if (this.props.promise) {
      this.handlePromise(this.props.promise)
    }
  }
  render () {
    const {props, state} = this
    if (state.started) {
      if (!state.finished) {
        if (props.pendingRender) {
          return props.pendingRender  // custom component to indicate load in progress
        }
        return <div></div>
      }
      if (props.then && state.resolved) {
        return props.then(state.resolved)
      }
      if (props.catch && state.rejected) {
        return props.catch(state.rejected)
      }
    } else {
      return this.props.before(this.handlePromise.bind(this))
    }
  }
}

Async.propTypes = {
  before: PropTypes.func, // renders it's return value before promise is handled
  then: PropTypes.func, // renders it's return value when promise is resolved
  catch: PropTypes.func, // renders it's return value when promise is rejected
  pendingRender: PropTypes.node, // renders it's value when promise is pending
  promise: PropTypes.object // promise itself
}

export default Async
