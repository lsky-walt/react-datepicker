import React, { Component } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { obtain } from "@lsky/tools"
import { pickerClass, compose } from "src/tools"
import { clone } from "src/tools/date"

import absolute from "../absolute-container"

import RenderDay from "./module/render-day"
import RenderMonth from "./module/render-month"
import RenderYear from "./module/render-year"
import RenderTime from "./module/render-time"
import RenderDatetime from "./module/render-datetime"

const list = ["date", "month", "year"]

const renderMap = {
  date: RenderDay,
  month: RenderMonth,
  year: RenderYear,
  time: RenderTime,
  datetime: RenderDatetime,
}

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
    const Render = renderMap[mode]
    if (!Render) return null

    const index = list.indexOf(mode)
    let changeMode
    if (index !== -1 && index <= list.length - 2) {
      changeMode = this.changeMode.bind(this, list[index + 1])
    }
    return (
      <Render
        value={value}
        format={format}
        onChange={this.onChange}
        changeMode={changeMode}
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
