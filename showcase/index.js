/* eslint-env browser */
import ReactDOM from 'react-dom'
import React from 'react'
import Async from '../src/react-promise'

Async.defaultPending = <h1>looooad</h1>

const AsyncShowcase = () => (
  <div>
    <h2>With default pending state</h2>
    <Async
      then={response => {
        return (
          <div>
            got back:
            {response}
          </div>
        )
      }}
      before={handlePromise => {
        return (
          <div>
            <button
              onClick={() => {
                handlePromise(
                  fetch('https://www.reddit.com/r/javascript.json').then(res =>
                    res.text()
                  )
                )
              }}
            >
              fetch
            </button>
          </div>
        )
      }}
    />
    <h2>With custom pending state</h2>
    <Async
      pending={'Loading'}
      then={response => {
        return (
          <div>
            got back:
            {response}
          </div>
        )
      }}
      before={handlePromise => {
        return (
          <div>
            <button
              onClick={() => {
                handlePromise(
                  fetch('https://www.reddit.com/r/javascript.json').then(res =>
                    res.text()
                  )
                )
              }}
            >
              fetch
            </button>
          </div>
        )
      }}
    />
  </div>
)

ReactDOM.render(<AsyncShowcase />, window.reactApp)
