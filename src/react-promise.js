import React from 'react'
import PropTypes from 'prop-types'

const statusTypes = {
  none: 'none',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved'
}

class Async extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: statusTypes.none
    }
  }
  componentWillReceiveProps(nP) {
    if (nP.promise !== this.props.promise) {
      this.setState({
        status: statusTypes.none
      })
      this.handlePromise(nP.promise)
    }
  }
  handlePromise(prom) {
    this.promise = prom
    this.setState({
      status: statusTypes.pending
    })
    prom.then(
      res => {
        if (this.promise !== prom) {
          return // this promise has been switched for some other before it resolved, so we can early return
        }
        if (!this.unmounted) {
          this.setState({
            status: statusTypes.resolved,
            value: res
          })
        }
      },
      err => {
        if (this.promise !== prom) {
          return // this promise has been switched for some other before it rejected, so we can early return
        }
        if (!this.unmounted) {
          this.setState({
            status: statusTypes.rejected,
            value: err
          })
        }
      }
    )
  }
  componentWillMount() {
    if (this.props.promise) {
      this.handlePromise(this.props.promise)
    }
  }
  componentWillUnmount() {
    this.unmounted = true
  }

  render() {
    const { props, state } = this

    switch (state.status) {
      case statusTypes.none:
        if (props.before) {
          return props.before(this.handlePromise.bind(this))
        }
        break
      case statusTypes.pending:
        if (props.pending) {
          if (typeof props.pending === 'function') {
            return props.pending()
          } else {
            return props.pending
          }
        } else if (Async.defaultPending) {
          if (typeof Async.defaultPending === 'function') {
            return Async.defaultPending()
          } else {
            return Async.defaultPending
          }
        }
        break
      case statusTypes.resolved:
        if (props.then) {
          return props.then(state.value)
        }
        break
      case statusTypes.rejected:
        if (props.catch) {
          return props.catch(state.value)
        }
        break
    }

    return null
  }
}

Async.propTypes = {
  before: PropTypes.func, // renders it's return value before promise is handled
  then: PropTypes.func, // renders it's return value when promise is resolved
  catch: PropTypes.func, // renders it's return value when promise is rejected
  pending: PropTypes.oneOfType([PropTypes.node, PropTypes.func]), // renders it's value when promise is pending
  promise: PropTypes.object // promise itself
}

export default Async
