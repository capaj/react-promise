import { useEffect, useState } from 'react'

export default function usePromise<T>(promise: Promise<T>) {
  const [state, setState] = useState<{
    loading: boolean
    error: Error | null
    value: T | undefined
  }>({
    loading: !!promise,
    error: null,
    value: undefined
  })

  useEffect(() => {
    let unmounted = false

    if (!promise) {
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
  }, [promise])

  return state
}
