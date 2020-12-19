import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../tools'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
    }

    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onFocus(e) {
    const { onFocus } = this.props
    this.setState({ focus: true })
    onFocus()
  }

  onBlur(e) {
    const { onBlur } = this.props
    this.setState({ focus: false })
    onBlur()
  }

  onChange(e) {
    console.log('onChange: ', e.target.value)
  }

  render() {
    const { focus } = this.state
    const { value } = this.props
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={datepickerClass('input', focus && 'input-active')}>
        <input key="input" onFocus={this.onFocus} onBlur={this.onBlur} value={value} onChange={this.onChange} />
      </label>
    )
  }
}

Index.propTypes = {
  value: PropTypes.string,
}

export default Index
