import React, { Component } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { obtain } from "@lsky/tools"
import absolute from "./absolute-container"
import RenderDay from "./render-day"
import RenderMonth from "./render-month"
import RenderYear from "./render-year"
import RenderTime from "./render-time"

import { pickerClass, compose } from "../tools"
import { clone, formats } from "../tools/date"

class Index extends Component {
  constructor(props) {
    super(props)

    this.today = clone(new Date())

    this.state = {
      mode: obtain(props, "type", "date"),
      month: props.value
        ? clone(props.value).format(formats.month)
        : this.today.format(formats.month),
      year: props.value
        ? clone(props.value).format(formats.year)
        : this.today.format(formats.year),
    }

    this.changeStateForChild = this.changeStateForChild.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { value, type } = this.props
    if (prevProps.value !== value) {
      const tar = clone(value)
      this.changeStateForChild({
        month: tar.format(formats.month),
        year: tar.format(formats.year),
      })
    }

    if (prevProps.type !== type) {
      this.setState({ mode: type })
    }
  }

  changeMode(mode) {
    this.setState({ mode })
  }

  changeStateForChild(data) {
    this.setState(data)
  }

  switchMode() {
    const { mode, month, year } = this.state
    const { value, format, onChange } = this.props
    let render = null
    switch (mode) {
      case "date":
        render = this.renderDay()
        break
      case "month":
        render = (
          <RenderMonth
            month={month}
            format={format}
            year={year}
            value={value}
            changeModeToYear={this.changeMode.bind(this, "year")}
            changeMonth={this.changeStateForChild}
          />
        )
        break
      case "year":
        render = (
          <RenderYear
            year={year}
            format={format}
            value={value}
            changeYear={this.changeStateForChild}
          />
        )
        break
      case "time":
        render = (
          <RenderTime
            value={value}
            format={format}
            // changeTime={this.changeStateForChild}
            onChange={onChange}
          />
        )
        break
      default:
        break
    }
    return render
  }

  renderDay() {
    const { value, format, onChange } = this.props
    const { month } = this.state
    return (
      <RenderDay
        value={value}
        format={format}
        onChange={onChange}
        month={month}
        changeModeToMonth={this.changeMode.bind(this, "month")}
        changeMonth={this.changeStateForChild}
      />
    )
  }

  render() {
    const { className, show } = this.props
    return (
      <div className={clsx(pickerClass("_", show && "show"), className)}>
        {this.switchMode()}
      </div>
    )
  }
}

Index.propTypes = {
  type: PropTypes.oneOf(["time", "date", "datetime", "month", "year"]),
  show: PropTypes.bool,
  className: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isRange: PropTypes.bool,
}

Index.displayName = "Picker"

export default compose(absolute({ type: "picker" }))(Index)
