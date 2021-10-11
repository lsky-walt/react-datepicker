import React, { Component } from "react"
import PropTypes from "prop-types"
import { isNumber, isString } from "@lsky/tools"
import { pickerClass } from "../tools"
import { clone, formats, resetDate } from "../tools/date"

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
  constructor(props) {
    super(props)
    // 月份为1
    this.today = resetDate(clone(), 0, 0, 0, 0, 1, 0).format(formats.datetime)
    this.state = {
      s: props.value || this.today,
    }
  }

  handleYearClick(year) {
    const { onChange, value } = this.props
    let cur = clone(value || this.today)
    cur = cur.year(+year)
    onChange(
      cur.format(formats.datetime) // 注意 value 值必须为 YYYY-MM-DD HH:mm:ss
    )
  }

  handleYear(year) {
    const { s } = this.state
    let tar = clone(s)
    tar = tar.year(+year)
    this.setState({
      s: tar.format(formats.datetime),
    })
  }

  generateYear() {
    const { value } = this.props
    const { s } = this.state
    const startYear = rangeYear(clone(s).year())

    // 注意 format 格式为 YYYY 保持统一
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
    const { s } = this.state
    const startYear = rangeYear(clone(s).year())
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
  onChange: PropTypes.func,
  value: PropTypes.string,
}
