import React from 'react'
import Result from './components/result'
import Container from './components/container'

import { datepickerClass } from './tools'

class Index extends React.Component {
  render() {
    return (
      <div className={datepickerClass('_')} style={{ width: 300 }}>
        <Result />
        <Container />
      </div>
    )
  }
}

export default Index
