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
} from '../tools/date'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      picker: null,
    }

    this.current = clone(new Date())

    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick(date) {
    const { dateClick } = this.props
    console.log('date: ', date)
  }

  getFormat() {
    const { format } = this.props
    if (!format) return formats.date
    return format
  }

  renderDay() {
    const { picker } = this.state

    const prevMonth = getPrevMonth(this.current)
    const daysInPrevMonth = prevMonth.daysInMonth()
    const startWeek = getStartWeekInMonth(this.current)

    const currentDate = this.current.date()

    // prev month format
    const prevMonthFormat = prevMonth.format('YYYY-MM')
    const curMonthFormat = this.current.format('YYYY-MM')
    const nextMonthFormat = getNextMonth(this.current).format('YYYY-MM')

    const prev = Array.from({ length: startWeek }).map((_, index) => {
      const date = daysInPrevMonth - startWeek + 1 + index
      return (
        <div key={`${prevMonthFormat}-${date}`} className={pickerClass('date')} onMouseDown={this.handleClick.bind(this, `${prevMonthFormat}-${date}`)}>{date}</div>
      )
    })
    const cur = Array.from({ length: getDaysInMonth(this.current) }).map((_, index) => <div key={`${curMonthFormat}-${index + 1}`} onMouseDown={this.handleClick.bind(this, `${curMonthFormat}-${index + 1}`)} className={pickerClass('date', currentDate === index + 1 && 'current')}>{index + 1}</div>)
    const next = Array.from({ length: 6 - getEndWeekInMonth(this.current) }).map((_, index) => <div key={`${nextMonthFormat}-${index + 1}`} onMouseDown={this.handleClick.bind(this, `${nextMonthFormat}-${index + 1}`)} className={pickerClass('date')}>{index + 1}</div>)
    return (
      <div className={pickerClass('date-container')}>{prev.concat(cur, next)}</div>
    )
  }

  render() {
    return (
      <div className={clsx(pickerClass('_', this.props.show && 'show'), this.props.className)}>
        <div className={pickerClass('common')}>
          <div key="prev">&lt;</div>
          <div key="cur">{getMonth(this.current)}</div>
          <div key="next">&gt;</div>
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
}

export default compose(absolute({ type: 'picker' }))(Index)
