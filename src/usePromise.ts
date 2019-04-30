import { useEffect, useState } from 'react'

export default function usePromise<T>(
  promiseOrFn: (() => Promise<T>) | Promise<T>
): {
  loading: boolean
  error: Error | null
  value: T | undefined
} {
  const [state, setState] = useState<{
    loading: boolean
    error: Error | null
    value: T | undefined
  }>({
    loading: !!promiseOrFn,
    error: null,
    value: undefined
  })

  useEffect(() => {
    let unmounted = false

    if (!promiseOrFn) {
      setState({
        loading: false,
        error: null,
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
          if (!unmounted) {
            setState({
              loading: false,
              error: null,
              value
            })
          }
        })
        .catch((error) => {
          if (!unmounted) {
            setState({
              loading: false,
              error,
              value: undefined
            })
          }
        })
    }

    return () => {
      unmounted = true
    }
  }, [promiseOrFn])

  return state
}
