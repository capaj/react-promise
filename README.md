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
    if (!this.state.val) return
    return <div>{this.state.val}</div>
  }
```

and with react-async:
```javascript
import Async from 'react-async'

const ExampleWithAsync = (props) => <Async promise={prom} then={(val) => {return <div>{val}</div>}/>
```

Much simpler, especially if your component is read-only, like the example.

## install

With jspm:
```
jspm i npm:react-promise
```
or with npm:
```
npm i react-promise
```

## [Available props](https://github.com/capaj/react-async/blob/master/async.js#L48):

- **promise** a promise you want to wait for
- **then**(optional) runs when promise is resolved. Async will run function provided in it's render passing a resolved value as first parameter.
- **catch**(optional) runs when promise is rejected. Async will run function provided in it's render passing an error as first parameter.
- **pendingRender**(optional) is a node which will be outputted from Async render method while promise is pending. If none is provided, defaults to `<div/>`
