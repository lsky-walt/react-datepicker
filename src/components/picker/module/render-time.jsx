import clsx from "clsx"
import React, { Component } from "react"
import PropTypes from "prop-types"

import { pickerClass } from "src/tools"
import {
  clone,
  formats,
  resetDate,
  regexFormat,
  supplementZero,
} from "src/tools/date"

export class Content extends Component {
  constructor(props) {
    super(props)

    this.today = resetDate(clone(), 0, 0, 0, 0).format(formats.datetime)
  }

  onTimeClick(type, time) {
    const { value, onChange } = this.props
    let cur = clone(value || this.today)
    cur = cur[type](+time)
    onChange(cur.format(formats.datetime))
  }

  renderPerTime(count, fmt = null) {
    const { value } = this.props
    const needToSupplement = fmt && fmt.length === 2
    let forTimeClickParams = "hour"
    if (fmt.toLowerCase().indexOf("m") !== -1) {
      forTimeClickParams = "minute"
    }
    if (fmt.toLowerCase().indexOf("s") !== -1) {
      forTimeClickParams = "second"
    }

    // 默认值为 null
    const active = value ? clone(value)[forTimeClickParams]() : null

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

  renderButton() {
    const { button } = this.props
    if (!button) return null
    return (
      <div key="time-button" className={pickerClass("time-button-container")}>
        <button type="button" className={pickerClass("time-button")}>
          确认
        </button>
      </div>
    )
  }

  render() {
    const { className } = this.props
    return [
      <div
        key="time-slider"
        className={clsx(pickerClass("time-slider"), className)}
      >
        {this.renderContent()}
      </div>,
      this.renderButton(),
    ]
  }
}

Content.propTypes = {
  className: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  button: PropTypes.bool,
  value: PropTypes.string,
}

function WrapContainer(props) {
  const { className, ...params } = props
  return (
    <div className={clsx(pickerClass("time-container"), className)}>
      <Content {...params} />
    </div>
  )
}

WrapContainer.propTypes = {
  className: PropTypes.string,
}

export default WrapContainer
