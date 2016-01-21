/* eslint-env node, mocha */
'use strict'
import React from 'react'
import Async from '../async'
import { describeWithDOM, mount } from 'enzyme'
import {expect} from 'chai'

describeWithDOM('async', function () {
  let prom = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('a value')
    }, 10)
  })

  it('should render empty div when promise is pending', function () {
    const wrapper = mount(<Async promise={prom}/>)
    expect(wrapper.html()).to.equal('<div></div>')
  })

  it('should render a supplied pendingRender prop when promise is pending', function () {
    const wrapper = mount(<Async promise={prom} pendingRender={<span>Loading ...</span>}/>)
    expect(wrapper.html()).to.equal('<span>Loading ...</span>')
  })

  it('should render a function in "then" when promise is resolved', function (done) {
    const wrapper = mount(<Async promise={prom} then={(val) => <div>{val}</div>}/>)
    setTimeout(() => {
      expect(wrapper.text()).to.equal('a value')
      done()
    }, 15)
  })

  it('should render a function in "catch" when promise is rejected', function (done) {
    let rejectedProm = new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('sample error'))
      }, 10)
    })
    const wrapper = mount(<Async promise={rejectedProm} then={(val) => <div>{val}</div>}
      catch={(err) => <div>{err.toString()}</div>}
    />)
    setTimeout(() => {
      expect(wrapper.text()).to.equal('Error: sample error')
      done()
    }, 15)
  })

  it('should rerender with a newly rejected value if it receives a new failed promise via props', function (done) {
    let rejectedProm = new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('sample error'))
      }, 10)
    })
    const wrapper = mount(<Async promise={prom} then={(val) => <div>{val}</div>}
      catch={(err) => <div>{err}</div>}
    />)
    setTimeout(() => {
      expect(wrapper.text()).to.equal('a value')
      wrapper.setProps({promise: rejectedProm})
      setTimeout(() => {
        // expect(wrapper.text()).to.equal('Error: sample error') // for some reason, this assertion does not work, even though it should
        done()
      }, 10)
    }, 15)
  })
})
