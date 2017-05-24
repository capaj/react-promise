import * as React from 'react'

export interface Props<T> {
  promise?: Promise<T>
  before?: (handlePromise: () => void) => React.ReactNode
  then?: (value: T) => React.ReactNode
  catch?: (err: any) => React.ReactNode
  pendingRender?: React.ReactNode
}

export interface State {
  started: boolean
  resolved: boolean
  finished: boolean
  rejected: boolean
}

declare class Async<T> extends React.Component<Props<T>, State> { }

export default Async
