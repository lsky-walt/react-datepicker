import React from "react"
import { Content } from "./render-time"
import RenderDay from "./render-day"

import { pickerClass } from "../tools"

export default function Index(props) {
  return (
    <div className={pickerClass("datetime-container")}>
      <div>
        <RenderDay {...props} />
      </div>
      <div className={pickerClass("border-left")}>
        <div className={pickerClass("datetime-time-top", "border-bottom")} />
        <Content className={pickerClass("datetime-time-c")} {...props} />
      </div>
    </div>
  )
}
