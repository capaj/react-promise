# react-promise

[![NPM badge](https://nodei.co/npm/react-promise.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-promise/)

a react.js hook for general promise written in typescript.
Let's consider a trivial example: you have a promise such as this

```javascript
let prom = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('a value')
  }, 100)
})
```

and you want to make a component, which renders out in it's body 'a value'. Without react-promise, such component looks like this:

```javascript
class ExampleWithoutAsync extends React.Component { // you can't use stateless component because you need a state
  constructor () {
    super()
    this.state = {}
  }
  componentDidMount() {
    prom.then((value) => {
      this.setState({val: value})
    })
  }
  render () {
    if (!this.state.val) return null
    return <div>{this.state.val}</div>
  }

// or you could use a combination of useEffect and useState hook, which is basically the implementation of this small library
```

and with react-promise:

```tsx
import Async from 'react-promise';

const ExampleWithAsync = (props) => {
  const {value, loading} = usePromise<string>(prom)
  if (loading) return null
  return <div>{value}</div>}
}
```

## API

The only argument can be a promise or a promise resolving thunk:

```ts
usePromise<T>(
  promiseOrFn: (() => Promise<T>) | Promise<T>
)
```

it might be desirable to let the usePromise call the promise returnig function, because you often don't want to do that inside the render of your functional component.

Full state object interface returned by the hook looks like:

```ts
{
  loading: boolean
  error: Error | null
  value: T | undefined // where T is your shape of the resolved data you expect obviously
}
```

## install

With npm:

```
npm i react-promise
```

[For version 2 docs, refer to the old readme](https://github.com/capaj/react-promise/tree/1691b7202be806db5f41784d6e2cc9d231a3975c#react-promise).
