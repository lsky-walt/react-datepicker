/* eslint-disable class-methods-use-this */
import React from "react"
import Datepicker from "src"

class Index extends React.PureComponent {
  render() {
    return (
      <div>
        <p>react-datepicker</p>
        <Datepicker
          onChange={(value) => {
            console.log(value)
          }}
        />
      </div>
    )
  }
}

export default Index
