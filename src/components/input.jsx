import React, { Component } from "react"
import PropTypes from "prop-types"
import { inputClass } from "../tools"

class Index extends Component {
  constructor(props) {
    super(props)
    this.onFocus = this.onFocus.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onFocus(e) {
    const { onFocus } = this.props
    onFocus()
  }

  onChange(e) {
    console.log("onChange: ", e.target.value)
  }

  render() {
    const { value, focus, readOnly } = this.props
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={inputClass("_", focus && "active")}>
        <input
          key="input"
          type="text"
          readOnly={readOnly}
          onFocus={this.onFocus}
          value={value || ""}
          onChange={this.onChange}
        />
      </label>
    )
  }
}

Index.propTypes = {
  value: PropTypes.string,
  focus: PropTypes.bool,
  onFocus: PropTypes.func,
  readOnly: PropTypes.bool,
}

Index.displayName = "Input"

export default Index
