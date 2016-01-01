"format es6"
import React, {PropTypes} from 'react'

class Async extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps (nP) {
    if (nP.promise !== this.props.promise) {
      this.state = {}
      this.forceUpdate()
      this.handlePromise(nP.promise)
    }
  }
  handlePromise (prom) {
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
    this.handlePromise(this.props.promise)
  }
  render () {
    const {props, state} = this
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
  }
}

Async.propTypes = {
  then: PropTypes.func,
  catch: PropTypes.func,
  pendingRender: PropTypes.node,
  promise: PropTypes.object.isRequired
}

export default Async