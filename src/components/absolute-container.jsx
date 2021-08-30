import React from "react"
import PropTypes from "prop-types"
import { absoluteClass, curry } from "../tools"
import { inputWidth, pickerWidth, containerWidth } from "../tools/config"

const absoluteWrap = (options, Component) => {
  class Index extends React.Component {
    constructor(props) {
      super(props)

      this.ref = this.ref.bind(this)

      this.didmount = false
    }

    componentWillUnmount() {
      console.log("will unmount")
    }

    getParents() {
      const { parent } = this.props
      return parent || this.absoluteContainer.parentNode
    }

    // set in view
    // getBoundingClientRect ?
    getStyles() {
      const { absolute } = this.props
      // const rect = this.absoluteContainer.getBoundingClientRect()
      if (!absolute) return {}
      const parent = this.getParents()

      const { left, top } = parent.getBoundingClientRect()
      // const position = ''
      const style = {}
      if (left < 0) {
        style.right = 0
      } else {
        style.left = 0
      }

      if (top <= 0) {
        style.bottom = 0
      } else {
        style.top = 0
      }
      return style
    }

    ref(node) {
      this.absoluteContainer = node
    }

    render() {
      const { show } = this.props
      if (!show && !this.didmount) return null
      this.didmount = true
      return (
        <div
          className={absoluteClass("_", show && "show")}
          style={this.getStyles()}
          ref={this.ref}
        >
          <Component {...this.props} />
        </div>
      )
    }
  }

  Index.propTypes = {
    parent: PropTypes.element,
    children: PropTypes.node,
    absolute: PropTypes.bool,
    show: PropTypes.bool,
  }

  Index.displayName = "Absolute"

  return Index
}

export default curry(absoluteWrap)
