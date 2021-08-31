import React, { Component } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import absolute from "./absolute-container"
import RenderDay from "./render-day"
import RenderMonth from "./render-month"
import RenderYear from "./render-year"

import { pickerClass, compose } from "../tools"
import { clone, formats } from "../tools/date"

class Index extends Component {
  constructor(props) {
    super(props)

    this.today = clone(new Date())

    this.state = {
      mode: "day",
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
    const { value } = this.props
    if (prevProps.value !== value) {
      const tar = clone(value)
      this.changeStateForChild({
        month: tar.format(formats.month),
        year: tar.format(formats.year),
      })
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
    const { value } = this.props
    let render = null
    switch (mode) {
      case "day":
        render = this.renderDay()
        break
      case "month":
        render = (
          <RenderMonth
            month={month}
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
            value={value}
            changeYear={this.changeStateForChild}
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
  show: PropTypes.bool,
  className: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isRange: PropTypes.bool,
}

Index.displayName = "Picker"

export default compose(absolute({ type: "picker" }))(Index)
