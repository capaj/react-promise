import usePromise from './usePromise'
import { renderHook, act } from 'react-hooks-testing-library'

describe('usePromise', () => {
  it('works for resolved promise', (done) => {
    let prom = new Promise((resolve) => {
      setTimeout(function() {
        act(() => {
          resolve('a value')
        })
      }, 49)
    })

    renderHook(() => {
      act(() => {
        expect(usePromise(prom)).toMatchSnapshot()
      })

      setTimeout(() => {
        done()
      }, 50)
    })
  })

  it('works for rejected promise', (done) => {
    let prom = new Promise((_, reject) => {
      setTimeout(function() {
        act(() => {
          reject(new Error('an error'))
        })
      }, 49)
    })
    renderHook(() => {
      act(() => {
        expect(usePromise(prom)).toMatchSnapshot()
      })

      setTimeout(() => {
        done()
      }, 50)
    })
  })

  it('works when providing a promise thunk', (done) => {
    let promThunk = () =>
      new Promise((resolve) => {
        setTimeout(function() {
          act(() => {
            resolve('a value from promise returning thunk')
          })
        }, 49)
      })

    renderHook(() => {
      act(() => {
        expect(usePromise(promThunk)).toMatchSnapshot()
      })

      setTimeout(() => {
        done()
      }, 50)
    })
  })
})
