import { useEffect, useState, useRef } from 'react'

type PromiseState<T> = {
  loading: true
  error: null
  value: undefined
} | {
  loading: false
  error: null
  value: T
} | {
  loading: false
  error: Error
  value: undefined
};

export default function usePromise<T>(
  promiseOrFn: (() => Promise<T>) | Promise<T>
): PromiseState<T> {
  const [state, setState] = useState<PromiseState<T>>({
    loading: !!promiseOrFn,
    error: null,
    value: undefined
  })
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    if (!promiseOrFn) {
      setState({
        loading: false,
        error: new TypeError(`The argument passed to usePromise must be either a promise or a function, but you passed a ${typeof promiseOrFn}`),
        value: undefined
      })
    } else {
      if (state.loading === false) {
        setState({
          loading: true,
          error: null,
          value: undefined
        })
      }
      let promise: Promise<T>
      if (typeof promiseOrFn === 'function') {
        promise = promiseOrFn()
      } else {
        promise = promiseOrFn
      }

      promise
        .then((value) => {
          if (isMounted.current) {
            setState({
              loading: false,
              error: null,
              value
            })
          }
        })
        .catch((error) => {
          if (isMounted.current) {
            setState({
              loading: false,
              error,
              value: undefined
            })
          }
        })
    }

    return () => {
      isMounted.current = false
    }
  }, [promiseOrFn])

  return state
}
