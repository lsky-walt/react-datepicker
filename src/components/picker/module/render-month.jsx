import React, { Component } from "react"
import PropTypes from "prop-types"

import { clone, formats, supplementZero, resetDate } from "src/tools/date"
import { pickerClass } from "src/tools"

export default class Index extends Component {
  constructor(props) {
    super(props)
    // 月份为1
    this.today = resetDate(clone(), 0, 0, 0, 0, 1).format(formats.datetime)
    this.state = {
      s: props.value || this.today,
    }
  }

  handleMonthClick(month) {
    const { onChange, value } = this.props
    let cur = clone(value || this.today)
    const tar = clone(month)
    cur = cur.year(tar.year())
    cur = cur.month(tar.month())
    onChange(
      cur.format(formats.datetime) // 注意 value 值必须为 YYYY-MM-DD HH:mm:ss
    )
  }

  changeYear(type) {
    const { s } = this.state
    let tar = null
    if (type === "next") {
      tar = clone(s).add(1, "year")
    } else {
      tar = clone(s).subtract(1, "year")
    }
    this.setState({
      s: tar.format(formats.datetime),
    })
  }

  generateMonth() {
    // value 值存在两种情况
    // 1. 2021-10-01 00:00:00 // type = month 的情况
    // 2. 2021-10-11 12:31:23 // type = date / datetime 的情况
    // 所以需要格式化为 YYYY-MM 用于对比
    const { value } = this.props
    const { s } = this.state

    const year = clone(s).year()

    // 注意 format 格式为 YYYY-MM 保持统一
    const currentMonth = clone(value).format("YYYY-MM")
    return Array.from({ length: 12 }).map((_, index) => {
      const tar = `${year}-${supplementZero(index + 1)}`
      return (
        <div
          className={pickerClass("month", tar === currentMonth && "current")}
          key={tar}
          onClick={this.handleMonthClick.bind(this, tar)}
        >
          {supplementZero(index + 1)}
        </div>
      )
    })
  }

  render() {
    const { changeMode } = this.props
    const { s } = this.state
    return (
      <>
        <div className={pickerClass("common")}>
          <div
            className={pickerClass("no-select")}
            key="prev"
            onClick={this.changeYear.bind(this, "prev")}
          >
            &lt;
          </div>
          <div
            className={pickerClass("no-select")}
            key="cur"
            onClick={changeMode}
          >
            {clone(s).year()}
          </div>
          <div
            className={pickerClass("no-select")}
            key="next"
            onClick={this.changeYear.bind(this, "next")}
          >
            &gt;
          </div>
        </div>
        <div className={pickerClass("month-container")}>
          {this.generateMonth()}
        </div>
      </>
    )
  }
}

Index.propTypes = {
  value: PropTypes.string,
  changeMode: PropTypes.func,
  onChange: PropTypes.func,
}
