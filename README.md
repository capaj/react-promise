# react-promise

[![NPM badge](https://nodei.co/npm/react-promise.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-promise/)

a react.js component for general promise - no need for stateful component just to render a value hidden behind a promise or for a simple form.
Let's consider a trivial example: you have a promise such as this

```javascript
let prom = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('a value')
  }, 100)
})
```

and you want to make a component, which renders out in it's body 'a value'. Without react-async, such component looks like this:

```javascript
class ExampleWithoutAsync extends React.Component { // you can't use stateless component because you need a state
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
import Async from 'react-promise'

const ExampleWithAsync = props => (
  <Async promise={prom} then={val => <div>{val}</div>} />
)
```

Much simpler, right?
Because the latter code handles that promise declaratively instead of imperatively.
In case you need user input before you can make the async call, there is a `before` property. Assign a function into it if you need to render a form for example.

```javascript
<Async
  before={handlePromise => {
    return (
      <form>
        <input />
        <button
          onClick={() => {
            handlePromise(Promise.resolve('awesome data'))
          }}
        >
          do something async like a POST request
        </button>
      </form>
    )
  }}
/>
```

The form is rendered before the promise is resolved. If you ever need to reset the Async to `before` after promise has resolved/rejected get the Async ref and use

```javascript
ref.setState({ status: 'none' })
```

## install

With npm:

```
npm i react-promise
```

## defaultPending

You can define a single pending state for all instances of `<Async />` by defining a `defaultPending` property on the `Async` component class. Full example here:

```javascript
import Async from 'react-promise'

Async.defaultPending = (
  <h1>my uber loading spinner/text/whatever used for all</h1>
)
```

## [Available props](https://github.com/capaj/react-promise/blob/master/src/react-promise.js#L60):

All props are optional

* **promise** a promise you want to wait for
* **before** if no promise is provided, Async will invoke this inside it's render method-use for forms and such
* **then** runs when promise is resolved. Async will run function provided in it's render passing a resolved value as first parameter.
* **catch** runs when promise is rejected. Async will run function provided in it's render passing an error as first parameter.
* **pending** can be a React node which will be outputted from Async render method while promise is pending. Can be a function too. If none is provided and `defaultPending` is set, then outputs the default.

## To use with Typescript

```typescript
import Async, { Props as AsyncProps } from 'react-promise'

const StringAsync = Async as { new (props: AsyncProps<string>): Async<string> }
```

The type used for the generic will be matched against the type for the promise's value. This workaround is necessary because currently there's no way to directly supply generic types in Typescript.
