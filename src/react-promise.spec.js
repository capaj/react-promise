/* eslint-env jest */
'use strict'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Async from '../src/react-promise'
import Enzyme, { mount } from 'enzyme'
Enzyme.configure({ adapter: new Adapter() })

describe('async', function() {
  let prom = resolveValue =>
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(resolveValue)
      }, 10)
    })
  let rejectedProm = rejectValue =>
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(rejectValue)
      }, 10)
    })

  it('should render nothing when promise is pending', function() {
    const wrapper = mount(<Async promise={prom()} />)
    expect(wrapper.html()).toBe(null)
  })

  it('should render defaultPending when promise is pending', () => {
    Async.defaultPending = 'Loooading'
    const wrapper = mount(<Async promise={prom()} />)

    expect(wrapper.text()).toBe(Async.defaultPending)
  })

  it('should render a supplied pending prop when promise is pending', function() {
    const wrapper = mount(
      <Async promise={prom()} pending={<span>Loading ...</span>} />
    )
    expect(wrapper.html()).toBe('<span>Loading ...</span>')
  })

  it('should render a function in "then" when promise is resolved', function(done) {
    const wrapper = mount(
      <Async promise={prom('a value')} then={val => <div>{val}</div>} />
    )
    setTimeout(() => {
      expect(wrapper.text()).toBe('a value')
      done()
    }, 15)
  })

  it('should render a function in "catch" when promise is rejected', function(done) {
    const wrapper = mount(
      <Async
        promise={rejectedProm(new Error('sample error'))}
        then={val => <div>{val}</div>}
        catch={err => <div>{err.toString()}</div>}
      />
    )
    setTimeout(() => {
      expect(wrapper.text()).toBe('Error: sample error')
      done()
    }, 15)
  })

  it('should rerender with a newly rejected value if it receives a new failed promise via props', function(done) {
    const wrapper = mount(
      <Async
        promise={prom('a value')}
        then={val => <div>{val}</div>}
        catch={err => <div>{err.toString()}</div>}
      />
    )
    setTimeout(() => {
      expect(wrapper.text()).toBe('a value')
      wrapper.setProps({ promise: rejectedProm(new Error('sample error')) })
      setTimeout(() => {
        expect(wrapper.text()).toBe('Error: sample error')
        done()
      }, 15)
    }, 15)
  })

  it('should render a function in "then" when promise is resolved with a falsey value', function(done) {
    const wrapper = mount(
      <Async promise={prom(false)} then={val => <div>{String(val)}</div>} />
    )
    setTimeout(() => {
      expect(wrapper.text()).toBe('false')
      done()
    }, 15)
  })

  it('should render a function in "then" when promise is resolved with a null value', function(done) {
    const wrapper = mount(
      <Async promise={prom(null)} then={val => <div>{String(val)}</div>} />
    )
    setTimeout(() => {
      expect(wrapper.text()).toBe('null')
      done()
    }, 15)
  })

  it('should render a function in "then" when promise is resolved with an undefined value', function(done) {
    const wrapper = mount(
      <Async promise={prom(undefined)} then={val => <div>{String(val)}</div>} />
    )
    setTimeout(() => {
      expect(wrapper.text()).toBe('undefined')
      done()
    }, 15)
  })
})
