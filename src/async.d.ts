import * as React from 'react'

export interface Props<T> {
  promise?: Promise<T>
  before?: (handlePromise: () => void) => React.ReactNode
  then?: (value: T) => React.ReactNode
  catch?: (err: any) => React.ReactNode
  pending?: () => React.ReactNode | React.ReactNode
}

export interface State {
  status: 'none' | 'pending' | 'resolved' | 'rejected'
}

declare class Async<T> extends React.Component<Props<T>, State> {
  defaultPending: () => React.ReactNode | React.ReactNode
}

export default Async
