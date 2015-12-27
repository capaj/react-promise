# react-async
a react.js component for general promise - no need for statefull component just to render a value hidden behind a promise.
Let's consider a this trivial example:

you have a promise such as this
```javascript
let prom = new Promise(function (resolve, reject) {
 setTimeout(function () {
   resolve('a value')
 }, 100)
})
```

and you want to make a component, which renders out in it's body 'a value'. Without react-async, such component looks like this:
```javascript
class ExampleWithoutAsync extends React.Component {
  constructor () {
    super()
    this.state = {}
    prom.then((value) => {
      this.setState({val: value})
    })
  }
  render () {
    return <div>{this.state.val}</div>
  }
```

and with react-async:
```javascript
import Async from 'react-async'

const ExampleWithAsync = (props) => <Async promise={prom} then={(val) => {return <div>{val}</div>}/>
```

Much simpler, especially if your component is read-only, like the example.
