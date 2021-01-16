import React from 'react'
import PropTypes from 'prop-types'
import Result from './components/result'
import Input from './components/input'
import Container from './components/container'

import { datepickerClass, addEventListener, getParent } from './tools'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      date: '',
      show: false,
    }

    this.onFocus = this.changeShow.bind(this, true)
    this.onClose = this.changeShow.bind(this, false)
    this.onBlur = this.onBlur.bind(this)

    this.event = null
  }

  componentDidMount() {
    this.event = addEventListener(document, 'mousedown', this.onBlur)
  }

  componentWillUnmount() {
    if (this.event) this.event.remove()
  }

  onBlur(e) {
    const { show } = this.state
    if (getParent(e.target, '.react-datepicker-absolute') || show === false) return
    this.onClose()
  }

  onChange(date) {
    const { onChange } = this.props
    if (typeof onChange === 'function') onChange(date)
    this.setState({ date })
  }

  changeShow(show) {
    this.setState({
      show,
    })
  }

  render() {
    const { date, show } = this.state
    return (
      <div className={datepickerClass('_')} style={{ width: 300 }}>
        <Input readOnly onFocus={this.onFocus} value={date} />
        <Container
          value={date}
          show={show}
          onChange={this.onChange}
          close={this.onClose}
        />
      </div>
    )
  }
}

Index.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  format: PropTypes.string,
}

Index.displayName = 'ReactPicker'

export default Index
