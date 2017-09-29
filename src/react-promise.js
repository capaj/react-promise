import React from 'react'
import PropTypes from 'prop-types'

const Status = {
  none: 'none',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved'
}

class Async extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: Status.none
    }
  }
  componentWillReceiveProps (nP) {
    if (nP.promise !== this.props.promise) {
      this.state = {
        status: Status.none
      }
      this.forceUpdate()
      this.handlePromise(nP.promise)
    }
  }
  handlePromise (prom) {
    this.setState({
      status: Status.pending
    })
    prom.then((res) => {
      this.setState({
        status: Status.resolved,
        value: res
      })
    }, (err) => {
      this.setState({
        status: Status.rejected,
        value: err
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

    switch (state.status) {
      case Status.none:
        if (props.before) {
          return props.before(this.handlePromise.bind(this))
        }
        break
      case Status.pending:
        if (props.pendingRender) {
          return props.pendingRender  // custom component to indicate load in progress
        }
        break
      case Status.resolved:
        if (props.then) {
          return props.then(state.value)
        }
        break
      case Status.rejected:
        if (props.catch) {
          return props.catch(state.value)
        }
        break
    }

    return <div /> // return empty placeholder as a fallback
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
