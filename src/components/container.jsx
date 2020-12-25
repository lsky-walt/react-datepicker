import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Picker from './picker'
import absolute from './absolute-container'

import {
  datepickerClass, pickerClass, getParent, addEventListener, containerClass,
  compose,
} from '../tools'

import Input from './input'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
    }

    this.show = this.changeStatus.bind(this, true)
    this.close = this.changeStatus.bind(this, false)
    this.onBlur = this.onBlur.bind(this)

    this.doc = null
  }

  componentDidMount() {
    this.doc = addEventListener(document, 'mousedown', this.onBlur)
  }

  componentWillUnmount() {
    if (this.doc) {
      this.doc.remove()
    }
  }

  onBlur(e) {
    if (getParent(e.target, '.picker-input')) return false
    this.close()
    return true
  }

  changeStatus(flag = false) {
    this.setState({
      focus: flag,
    })
  }

  render() {
    // need absolute component wrap
    console.log('container render')

    return (
      <div className={containerClass('_')}>
          <div className={containerClass('main')}>
            <div className={containerClass('picker')}>
              <div className={containerClass('title')}>Datetime Picker</div>
              <div className={clsx(containerClass('input'), 'picker-input')}>
                <Input onFocus={this.show} />
                <Picker show={this.state.focus} />
              </div>
              <div className={containerClass('button')}><button type="button" className={containerClass('button-confirm')}>confirm</button></div>
            </div>
            <div className={containerClass('recently')}>
              <div className={containerClass('title')}>Recently picker</div>
            </div>
          </div>
          <div className={containerClass('quick')}>quick container</div>
      </div>
    )
  }
}

export default compose(absolute({ type: 'container' }))(Index)
