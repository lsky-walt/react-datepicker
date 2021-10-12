import React, { Component } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { obtain } from "@lsky/tools"
import absolute from "./absolute-container"
import RenderDay from "./render-day"
import RenderMonth from "./render-month"
import RenderYear from "./render-year"
import RenderTime, { Content } from "./render-time"

import { pickerClass, compose } from "../tools"
import { clone } from "../tools/date"

const list = ["date", "month", "year"]

class Index extends Component {
  constructor(props) {
    super(props)

    this.today = clone(new Date())

    this.state = {
      mode: obtain(props, "type", "date"),
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props

    if (prevProps.type !== type) {
      this.setState({ mode: type })
    }
  }

  onChange(value) {
    const { mode } = this.state
    const { onChange, type } = this.props
    // 如果 type === mode
    if (type === mode) {
      onChange(value)
      return
    }
    const index = list.indexOf(mode)
    if (index <= 0) {
      onChange(value)
      return
    }
    this.setState(
      {
        mode: list[index - 1],
      },
      () => {
        onChange(value)
      }
    )
  }

  changeMode(mode) {
    this.setState({ mode })
  }

  switchMode() {
    const { mode } = this.state
    // 请注意：value为 format之后的string
    const { value, format } = this.props
    let render = null
    switch (mode) {
      case "date":
        render = (
          <RenderDay
            key="date"
            value={value}
            onChange={this.onChange}
            changeModeToMonth={this.changeMode.bind(this, "month")}
          />
        )
        break
      case "month":
        render = (
          <RenderMonth
            key="month"
            value={value}
            changeModeToYear={this.changeMode.bind(this, "year")}
            onChange={this.onChange}
          />
        )
        break
      case "year":
        render = (
          <RenderYear key="year" value={value} onChange={this.onChange} />
        )
        break
      case "time":
        render = (
          <RenderTime
            key="time"
            value={value}
            format={format}
            onChange={this.onChange}
          />
        )
        break
      case "datetime":
        render = (
          <div className={pickerClass("datetime-container")}>
            <div>
              <RenderDay
                key="date"
                value={value}
                onChange={this.onChange}
                changeModeToMonth={this.changeMode.bind(this, "month")}
              />
            </div>
            <div className={pickerClass("border-left")}>
              <div
                className={pickerClass("datetime-time-top", "border-bottom")}
              />
              <Content
                className={pickerClass("datetime-time-c")}
                key="time"
                value={value}
                format={format}
                onChange={this.onChange}
              />
            </div>
          </div>
        )
        break
      default:
        break
    }
    return render
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
