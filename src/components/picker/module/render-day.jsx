import React, { Component } from "react"
import PropTypes from "prop-types"

import { pickerClass } from "src/tools"
import {
  clone,
  getDaysInMonth,
  getStartWeekInMonth,
  getEndWeekInMonth,
  getPrevMonth,
  getNextMonth,
  resetDate,
  weeks,
  formats,
  supplementZero,
} from "src/tools/date"
import { isEmpty } from "@lsky/tools/lib/value"

class Index extends Component {
  constructor(props) {
    super(props)

    this.today = resetDate(clone(), 0, 0, 0, 0).format(formats.datetime)

    this.state = {
      s: props.value || this.today,
    }
  }

  // value 发生变化  重置
  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (prevProps.value !== value) {
      // 这里需要更新 state.s
      this.setState({ s: value })
    }
  }

  handleClick(date) {
    const { onChange, value } = this.props
    // 请注意  这里需要 reset 0
    // format date 的情况下
    let cur = clone(value || this.today)
    const tar = clone(date)
    cur = cur.date(tar.date())
    onChange(cur.format(formats.datetime))
  }

  changeMonth(type) {
    const { s } = this.state
    let tar = null
    if (type === "next") {
      tar = clone(s).add(1, "month")
    } else {
      tar = clone(s).subtract(1, "month")
    }
    // state.s是 YYYY-MM-DD HH:mm:ss 格式
    this.setState({
      s: tar.format(formats.datetime),
    })
  }

  generateDay() {
    // 注意  value 的格式必须为 YYYY-MM-DD HH:mm:ss
    const { value } = this.props
    const { s } = this.state

    // active
    const active = isEmpty(value) ? null : clone(value).format(formats.date)
    const t = clone(this.today).format(formats.date)

    // current 使用 dayjs foramt
    // 请注意 current 的值
    const current = clone(s)

    const prevMonth = getPrevMonth(current)
    const daysInPrevMonth = prevMonth.daysInMonth()
    const startWeek = getStartWeekInMonth(current)

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
            date === active && "active"
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
              date === t && "current",
              date === active && "active"
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
              date === active && "active"
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
    const { changeMode } = this.props
    const { s } = this.state
    return (
      <>
        <div className={pickerClass("common", "border-bottom")}>
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
            onClick={changeMode}
          >
            {clone(s).format(formats.month)}
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
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  changeMode: PropTypes.func,
}

Index.displayName = "ReactPickerRenderDay"

export default Index
