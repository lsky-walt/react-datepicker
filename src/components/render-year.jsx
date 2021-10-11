import React, { Component } from "react"
import PropTypes from "prop-types"
import { isNumber, isString } from "@lsky/tools"
import { pickerClass } from "../tools"
import { clone, formats } from "../tools/date"

const rangeYear = (year) => {
  if (isString(year)) {
    const y = +year
    return y - 5
  }
  if (isNumber(year)) {
    return year - 5
  }
  return +clone(new Date()).year()
}

export default class Index extends Component {
  handleYearClick(year) {
    const { changeYear } = this.props
    changeYear({
      year,
      mode: "month",
    })
  }

  handleYear(year) {
    const { changeYear } = this.props
    changeYear({
      year,
    })
  }

  generateYear() {
    const { year, value } = this.props
    const startYear = rangeYear(year)

    const currentYear = clone(value).format(formats.year)

    return Array.from({ length: 12 }).map((_, index) => {
      const tar = `${startYear + index}`
      return (
        <div
          className={pickerClass("year", currentYear === tar ? "current" : "")}
          key={tar}
          onClick={this.handleYearClick.bind(this, tar)}
        >
          {tar}
        </div>
      )
    })
  }

  render() {
    const { year } = this.props
    const startYear = rangeYear(year)
    return (
      <>
        <div className={pickerClass("common")}>
          <div
            className={pickerClass("no-select")}
            key="prev"
            onClick={this.handleYear.bind(this, `${startYear - 7}`)}
          >
            &lt;
          </div>
          <div className={pickerClass("no-select")} key="cur">
            {startYear}~{startYear + 11}
          </div>
          <div
            className={pickerClass("no-select")}
            key="next"
            onClick={this.handleYear.bind(this, `${startYear + 17}`)}
          >
            &gt;
          </div>
        </div>
        <div className={pickerClass("year-container")}>
          {this.generateYear()}
        </div>
      </>
    )
  }
}

Index.propTypes = {
  year: PropTypes.string,
  changeYear: PropTypes.func,
  value: PropTypes.string,
}
