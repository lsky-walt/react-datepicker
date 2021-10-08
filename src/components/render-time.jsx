import clsx from "clsx"
import React, { Component } from "react"
import PropTypes from "prop-types"

import { pickerClass } from "../tools"
import {
  regexFormat,
  supplementZero,
  replaceTargetDateFormat,
} from "../tools/date"

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      h: null,
      m: null,
      s: null,
    }

    this.onConfirmClick = this.onConfirmClick.bind(this)
  }

  onTimeClick(type, value) {
    this.setState({ [type]: value })
  }

  onConfirmClick() {
    const { h, m, s } = this.state
    const { onChange, format } = this.props
    const [, , , ...arr] = regexFormat(format)
    const value = [h, m, s]
      .map((v, index) => ({ type: arr[index], value: v }))
      .reduce(
        (acc, cur) => replaceTargetDateFormat(acc, cur.type, cur.value),
        format
      )
    onChange(value)
  }

  renderPerTime(count, fmt = null) {
    const needToSupplement = fmt && fmt.length === 2
    let forTimeClickParams = "h"
    if (fmt.toLowerCase().indexOf("m") !== -1) {
      forTimeClickParams = "m"
    }
    if (fmt.toLowerCase().indexOf("s") !== -1) {
      forTimeClickParams = "s"
    }
    const active = this.state[forTimeClickParams]

    return (
      <div key={fmt} className={pickerClass("time")}>
        {Array.from({ length: count }).map((_, h) => (
          <div
            key={h}
            className={clsx(
              pickerClass("time-per"),
              active === h && pickerClass("time-active")
            )}
            onClick={this.onTimeClick.bind(this, forTimeClickParams, h)}
          >
            {needToSupplement ? supplementZero(h) : h}
          </div>
        ))}
      </div>
    )
  }

  renderContent() {
    const { format } = this.props
    const [, , , ...arr] = regexFormat(format)
    // arr => [HH, mm, ss]
    return arr.map((m) => {
      if (!m) return null
      if (m.indexOf("H") !== -1) return this.renderPerTime(24, m)
      if (m.indexOf("m") !== -1 || m.indexOf("s") !== -1)
        return this.renderPerTime(60, m)
      return null
    })
  }

  render() {
    return (
      <div className={pickerClass("time-container")}>
        <div className={pickerClass("time-slider")}>{this.renderContent()}</div>
        <div className={pickerClass("time-button-container")}>
          <button
            type="button"
            className={pickerClass("time-button")}
            onClick={this.onConfirmClick}
          >
            确认
          </button>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  format: PropTypes.string,
  onChange: PropTypes.func,
}

export default Index
