/* eslint-env browser */
import ReactDOM from 'react-dom'
import React from 'react'
import Async from '../src/react-promise'

const AsyncShowcase = () => (
  <div>
    <Async
      pending={'loading'}
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
