import React, { Component } from "react"
import PropTypes from "prop-types"

import { clone, formats, supplementZero } from "../tools/date"
import { pickerClass } from "../tools"

export default class Index extends Component {
  handleMonthClick(month) {
    const { changeMonth } = this.props
    const tar = clone(month)
    changeMonth({
      month: tar.format(formats.month),
      year: tar.format(formats.year),
      mode: "day",
    })
  }

  changeMonth(type) {
    const { month, changeMonth } = this.props
    let tar = null
    if (type === "next") {
      tar = clone(month).add(1, "year")
    } else {
      tar = clone(month).subtract(1, "year")
    }
    changeMonth({
      month: tar.format(formats.month),
      year: tar.format(formats.year),
    })
  }

  generateMonth() {
    const { year, value } = this.props
    const currentMonth = clone(value).format(formats.month)
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
    const { year, changeModeToYear } = this.props
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
            onClick={changeModeToYear}
          >
            {year}
          </div>
          <div
            className={pickerClass("no-select")}
            key="next"
            onClick={this.changeMonth.bind(this, "next")}
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
  year: PropTypes.string,
  month: PropTypes.string,
  value: PropTypes.string,
  changeModeToYear: PropTypes.func,
  changeMonth: PropTypes.func,
}
