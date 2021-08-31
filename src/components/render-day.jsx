import React, { Component } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import absolute from "./absolute-container"

import { pickerClass, compose } from "../tools"
import {
  clone,
  getDaysInMonth,
  getStartWeekInMonth,
  getEndWeekInMonth,
  getPrevMonth,
  getNextMonth,
  weeks,
  formats,
  supplementZero,
} from "../tools/date"

class Index extends Component {
  constructor(props) {
    super(props)

    this.today = clone(new Date())
  }

  handleClick(date) {
    const { onChange } = this.props
    if (typeof onChange === "function") onChange(date)
  }

  getFormat() {
    const { format } = this.props
    if (!format) return formats.date
    return format
  }

  // wrap date with dayjs
  getWrapDays() {
    const { month } = this.props
    return clone(month || this.today)
  }

  changeMonth(type) {
    const { month, changeMonth } = this.props
    let tar = null
    if (type === "next") {
      tar = clone(month).add(1, "month")
    } else {
      tar = clone(month).subtract(1, "month")
    }
    changeMonth({
      month: tar.format(formats.month),
      year: tar.format(formats.year),
    })
  }

  generateDay() {
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
          className={pickerClass(
            "date",
            "not-current",
            date === value && "active"
          )}
          onMouseDown={this.handleClick.bind(this, date)}
        >
          {day}
        </div>
      )
    })
    const cur = Array.from({ length: getDaysInMonth(current) }).map(
      (_, index) => {
        const day = supplementZero(index + 1)
        const date = `${curMonthFormat}-${day}`
        return (
          <div
            key={date}
            onMouseDown={this.handleClick.bind(this, date)}
            className={pickerClass(
              "date",
              today === date && "current",
              date === value && "active"
            )}
          >
            {day}
          </div>
        )
      }
    )
    const next = Array.from({ length: 6 - getEndWeekInMonth(current) }).map(
      (_, index) => {
        const day = supplementZero(index + 1)
        const date = `${nextMonthFormat}-${day}`
        return (
          <div
            key={date}
            onMouseDown={this.handleClick.bind(this, date)}
            className={pickerClass(
              "date",
              "not-current",
              date === value && "active"
            )}
          >
            {day}
          </div>
        )
      }
    )
    return (
      <div className={pickerClass("date-container")}>
        {prev.concat(cur, next)}
      </div>
    )
  }

  render() {
    const { changeModeToMonth, month } = this.props
    return (
      <>
        <div className={pickerClass("common")}>
          <div
            className={pickerClass("no-select")}
            key="prev"
            onClick={this.changeMonth.bind(this, "prev")}
          >
            &lt;
          </div>
          <div
            className={pickerClass("no-select")}
            key="cur"
            onClick={changeModeToMonth}
          >
            {month}
          </div>
          <div
            className={pickerClass("no-select")}
            key="next"
            onClick={this.changeMonth.bind(this, "next")}
          >
            &gt;
          </div>
        </div>
        <div className={pickerClass("common")}>
          {weeks.map((v) => (
            <div key={v} className={pickerClass("week")}>
              {v}
            </div>
          ))}
        </div>
        {this.generateDay()}
      </>
    )
  }
}

Index.propTypes = {
  show: PropTypes.bool,
  month: PropTypes.string,
  className: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isRange: PropTypes.bool,
  changeModeToMonth: PropTypes.func,
  changeMonth: PropTypes.func,
}

Index.displayName = "ReactPickerRenderDay"

export default Index
