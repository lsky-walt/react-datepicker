import React from "react"
import PropTypes from "prop-types"
import { isNumber, isFunc, addEventListener, isString } from "@lsky/tools"
import Input from "./components/input"
import Picker from "./components/picker"

import { datepickerClass, isInReactDatepickerComponent } from "./tools"
import { formats, clone } from "./tools/date"

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    let date
    if (isNumber(date) || isString(date)) {
      date = new Date(date) && clone(date).format(this.getFormat())
    }
    this.state = {
      date, // 注意：这里类型必须为 YYYY-MM-DD HH:mm:ss | undefined
      show: false,
    }

    this.onFocus = this.changeShow.bind(this, true)
    this.onClose = this.changeShow.bind(this, false)
    this.onBlur = this.onBlur.bind(this)

    this.event = null
  }

  componentDidMount() {
    this.event = addEventListener(document, "mousedown", this.onBlur)
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ date: value })
    }
  }

  componentWillUnmount() {
    if (this.event) this.event.remove()
  }

  onBlur(e) {
    const { show } = this.state
    if (isInReactDatepickerComponent(e.target) || show === false) return
    this.onClose()
  }

  onChange(date) {
    const { onChange } = this.props
    if (isFunc(onChange)) onChange(date)
    this.setState({ date })
  }

  getFormat() {
    const { format, type } = this.props
    if (!format) return formats[type]
    return format
  }

  /**
   * check range props is available
   * @returns boolean
   */
  isRange() {
    const { range } = this.props
    if (typeof range === "boolean" && range) return true
    if (isNumber(range) && range > 0) return true
    return false
  }

  changeShow(show) {
    this.setState({
      show,
    })
  }

  renderContent() {
    const { show, date } = this.state
    const { type } = this.props
    const isRange = this.isRange()
    if (isRange) {
      return null
    }
    return (
      <Picker
        format={this.getFormat()}
        show={show}
        value={date}
        type={type}
        onChange={this.onChange}
      />
    )
  }

  render() {
    const { date } = this.state
    return (
      <div className={datepickerClass("_")} style={{ width: 300 }}>
        <Input
          readOnly
          onFocus={this.onFocus}
          value={date}
          format={this.getFormat()}
        />
        {this.renderContent()}
      </div>
    )
  }
}

Index.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  format: PropTypes.string,
  range: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
}

Index.defaultProps = {
  type: "datetime",
}

Index.displayName = "ReactPicker"

export default Index
