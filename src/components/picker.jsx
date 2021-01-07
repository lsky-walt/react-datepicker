import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import absolute from './absolute-container'

import { pickerClass, compose } from '../tools'
import {
  clone,
  getDaysInMonth,
  getStartWeekInMonth,
  getEndWeekInMonth,
  getMonth,
  getStartInMonthDate,
  getPrevMonth,
  getNextMonth,
  weeks,
  formats,
  resetDate,
  supplementZero,
} from '../tools/date'

class Index extends Component {
  constructor(props) {
    super(props)

    this.today = clone(new Date())

    this.state = {
      picker: null,
      current: this.today.format(formats.month),
    }

    // this.handleClick = this.handleClick.bind(this)
    this.prevMonthClick = this.prevMonthClick.bind(this)
    this.nextMonthClick = this.nextMonthClick.bind(this)
  }

  handleClick(date) {
    const { onChange } = this.props
    onChange(date)
  }

  getFormat() {
    const { format } = this.props
    if (!format) return formats.date
    return format
  }

  // wrap date with dayjs
  getWrapDays() {
    return clone(this.state.current)
  }

  prevMonthClick() {
    this.setState({
      current: getPrevMonth(this.getWrapDays()).format(formats.month),
    })
  }

  nextMonthClick() {
    this.setState({
      current: getNextMonth(this.getWrapDays()).format(formats.month),
    })
  }

  renderDay() {
    const { picker } = this.state
    const { value } = this.props

    const current = this.getWrapDays()

    const prevMonth = getPrevMonth(current)
    const daysInPrevMonth = prevMonth.daysInMonth()
    const startWeek = getStartWeekInMonth(current)

    const today = this.today.format(formats.date)

    // prev month format
    const prevMonthFormat = prevMonth.format(formats.month)
    const curMonthFormat = current.format(formats.month)
    const nextMonthFormat = getNextMonth(current).format(formats.month)

    const prev = Array.from({ length: startWeek }).map((_, index) => {
      const day = daysInPrevMonth - startWeek + 1 + index
      const date = `${prevMonthFormat}-${day}`
      return (
        <div
          key={date}
          className={pickerClass('date', date === value && 'active')}
          onMouseDown={this.handleClick.bind(this, date)}
        >
          {day}
        </div>
      )
    })
    const cur = Array.from({ length: getDaysInMonth(current) })
      .map((_, index) => {
        const day = supplementZero(index + 1)
        const date = `${curMonthFormat}-${day}`
        return (
          <div
            key={date}
            onMouseDown={this.handleClick.bind(this, date)}
            className={pickerClass('date', today === date && 'current', date === value && 'active')}
          >
          {day}
          </div>
        )
      })
    const next = Array.from({ length: 6 - getEndWeekInMonth(current) })
      .map((_, index) => {
        const day = supplementZero(index + 1)
        const date = `${nextMonthFormat}-${day}`
        return (
          <div
            key={date}
            onMouseDown={this.handleClick.bind(this, date)}
            className={pickerClass('date', date === value && 'active')}
          >
          {day}
          </div>
        )
      })
    return (
      <div className={pickerClass('date-container')}>{prev.concat(cur, next)}</div>
    )
  }

  render() {
    return (
      <div className={clsx(pickerClass('_', this.props.show && 'show'), this.props.className)}>
        <div className={pickerClass('common')}>
          <div className={pickerClass('no-select')} key="prev" onClick={this.prevMonthClick}>&lt;</div>
          <div className={pickerClass('no-select')} key="cur">{getMonth(this.getWrapDays())}</div>
          <div className={pickerClass('no-select')} key="next" onClick={this.nextMonthClick}>&gt;</div>
        </div>
        <div className={pickerClass('common')}>
          {weeks.map((v) => (<div key={v} className={pickerClass('week')}>{v}</div>))}
        </div>
        {this.renderDay()}
      </div>
    )
  }
}

Index.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

Index.displayName = 'Picker'

export default compose(absolute({ type: 'picker' }))(Index)
