import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import Date from './picker'

import { datepickerClass, pickerClass } from '../tools'

import Input from './input'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
    }

    this.onFocus = this.changeStatus.bind(this, true)
    this.onBlur = this.changeStatus.bind(this, false)
  }

  changeStatus(flag = false) {
    this.setState({
      focus: flag,
    })
  }

  render() {
    return (
      <div className={datepickerClass('container')}>
        <div className={datepickerClass('main')}>
          <div className={datepickerClass('picker-container')}>
            <div className={datepickerClass('picker')}>
              <div className={datepickerClass('picker-title')}>Datetime Picker</div>
              <div className={datepickerClass('picker-input')}>
              <Input onFocus={this.onFocus} onBlur={this.onBlur} />
              <Date className={pickerClass(this.state.focus && 'show')} />
              </div>
              <div className={datepickerClass('picker-button')}><button type="button" className={datepickerClass('picker-confirm')}>confirm</button></div>
            </div>
            <div className={datepickerClass('picker-recently')}>
              <div className={datepickerClass('picker-title')}>Recently picker</div>
            </div>
          </div>
          <div className={datepickerClass('quick-container')}>quick container</div>
        </div>
        {/* <div className={datepickerClass('main')}></div> */}
      </div>
    )
  }
}

export default Index
