import React from "react"
import PropTypes from "prop-types"
import { addEventListener } from "@lsky/tools/lib/dom"
import Result from "./components/result"
import Input from "./components/input"
import Container from "./components/container"
import Picker from "./components/picker"

import { datepickerClass, isInReactDatepickerComponent } from "./tools"

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      date: props.value,
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
      this.setState({ data: value })
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
    if (typeof onChange === "function") onChange(date)
    this.setState({ date })
  }

  /**
   * check range props is available
   * @returns boolean
   */
  isRange() {
    const { range } = this.props
    if (typeof range === "boolean" && range) return true
    if (typeof range === "number" && range > 0) return true
    return false
  }

  changeShow(show) {
    this.setState({
      show,
    })
  }

  renderContent() {
    const { show, date } = this.state
    const isRange = this.isRange()
    if (isRange) {
      return (
        <Container
          value={date}
          show={show}
          onChange={this.onChange}
          close={this.onClose}
        />
      )
    }
    return <Picker isRange show={show} value={date} onChange={this.onChange} />
  }

  render() {
    const { date } = this.state
    return (
      <div className={datepickerClass("_")} style={{ width: 300 }}>
        <Input readOnly onFocus={this.onFocus} value={date} />
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

Index.displayName = "ReactPicker"

export default Index
