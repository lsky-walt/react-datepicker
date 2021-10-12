import React, { Component } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { getParent, addEventListener } from "@lsky/tools"
import Picker from "./picker"
import absolute from "./absolute-container"

import { containerClass, pushToRecently, compose } from "../tools"

import Input from "./input"

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      date: props.value,
    }

    this.show = this.isFocus.bind(this, true)
    this.close = this.isFocus.bind(this, false)
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
    this.apply = this.apply.bind(this)

    this.doc = null

    // recently picker
    this.recently = []
  }

  componentDidMount() {
    this.doc = addEventListener(document, "mousedown", this.onBlur)
  }

  componentDidUpdate(prevProps) {
    // const { date } = this.state
    // if (prevProps.value !== date) {
    //   this.onChange(prevProps.value)
    // }
  }

  componentWillUnmount() {
    if (this.doc) {
      this.doc.remove()
    }
  }

  onChange(date) {
    this.setState({ date })
  }

  onBlur(e) {
    const { focus } = this.state
    if (
      getParent(e.target, ".react-datepicker-container-input") ||
      focus === false
    )
      return
    this.close()
  }

  apply() {
    const { date } = this.state
    const { onChange, close } = this.props
    onChange(date)
    this.recently = pushToRecently(this.recently, date)
    close()
  }

  isFocus(focus = false) {
    this.setState({
      focus,
    })
  }

  renderQuick() {
    const { quickSelect } = this.props
    if (!quickSelect) return null
    return <div className={containerClass("quick")}>quick container</div>
  }

  render() {
    const { editable } = this.props
    const { focus, date } = this.state

    return (
      <div className={containerClass("_")}>
        <div className={containerClass("main")}>
          <div className={containerClass("picker")}>
            <div className={containerClass("title")}>Datetime Picker</div>
            <span className={clsx(containerClass("input"), "picker-input")}>
              <Input
                readOnly={!editable}
                onFocus={this.show}
                focus={focus}
                value={date}
              />
              <Picker value={date} onChange={this.onChange} show={focus} />
            </span>
            <div className={containerClass("button")}>
              <button
                type="button"
                className={containerClass("button-confirm")}
                onClick={this.apply}
              >
                Confirm
              </button>
            </div>
          </div>
          <div className={containerClass("recently")}>
            <div className={containerClass("title")}>Recently picker</div>
            <div className={containerClass("recently-container")}>
              {this.recently.map((value) => {
                if (value && typeof value === "string") {
                  return (
                    <div className={containerClass("quick-item")} key={value}>
                      {value}
                    </div>
                  )
                }
                // will support range
                return null
              })}
            </div>
          </div>
        </div>
        {this.renderQuick()}
      </div>
    )
  }
}

Index.propTypes = {
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  format: PropTypes.string,
  close: PropTypes.func,
  value: PropTypes.string,
  quickSelect: PropTypes.bool,
  bindResetContainerDateFunc: PropTypes.func,
}

Index.displayName = "Container"

// need absolute component wrap
export default compose(absolute({ type: "container" }))(Index)
