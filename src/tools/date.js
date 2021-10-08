import { isEmpty } from "@lsky/tools"
import dayjs from "dayjs"
import { months, weeks, formats } from "./config"

/**
 * All dates must meet dayjs requirements
 */

const clone = (date) => dayjs(date)

// date
const resetDate = (date, ...args) => {
  let cur = dayjs(date)
  const [millisecond, seconds, minutes, hours, days, ms, years] = args
  if (typeof millisecond === "number") {
    cur = cur.millisecond(millisecond)
  }
  if (typeof seconds === "number") {
    cur = cur.second(seconds)
  }
  if (typeof minutes === "number") {
    cur = cur.minute(minutes)
  }
  if (typeof hours === "number") {
    cur = cur.hour(hours)
  }
  if (typeof days === "number") {
    cur = cur.date(days)
  }
  if (typeof ms === "number") {
    cur = cur.month(ms)
  }
  if (typeof years === "number") {
    cur = cur.year(years)
  }

  return cur
}

// month
const getDaysInMonth = (date) => dayjs(date).daysInMonth()
const getStartInMonthDate = (date) => resetDate(date, 0, 0, 0, 0, 1)
const getEndInMonthDate = (date) =>
  resetDate(date, 0, 0, 0, 0, getDaysInMonth(date))
const getStartWeekInMonth = (date) => {
  const cur = getStartInMonthDate(date)
  return cur.day()
}
const getEndWeekInMonth = (date) => {
  const cur = getEndInMonthDate(date)
  return cur.day()
}
const getPrevMonth = (date) => {
  const cur = getStartInMonthDate(date)
  return cur.subtract(1, "month")
}
const getNextMonth = (date) => {
  const cur = getStartInMonthDate(date)
  return cur.add(1, "month")
}

// 转义
const getMonth = (date) => months[dayjs(date).month()]

// 补0操作
const supplementZero = (number) =>
  number > 9 ? number.toString() : `0${number}`

const regexFormat = (fmt = "") => {
  const o = ["Y+", "M+", "D+", "H+", "m+", "s+"]
  return o.map((match) => {
    const res = fmt.match(new RegExp(match, "g"))
    if (res) {
      return res[0]
    }
    return null
  })
}

const replaceTargetDateFormat = (fmt = "", tar = "", value) => {
  if (isEmpty(fmt) || isEmpty(tar) || isEmpty(value)) return fmt
  if (new RegExp(`(${tar})`).test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      RegExp.$1.length === 1 ? value : `00${value}`.substring(`${value}`.length)
    )
  }
  return fmt
}

export {
  clone,
  resetDate,
  getDaysInMonth,
  getStartWeekInMonth,
  getEndWeekInMonth,
  getStartInMonthDate,
  getMonth,
  weeks,
  formats,
  getPrevMonth,
  getNextMonth,
  supplementZero,
  regexFormat,
  replaceTargetDateFormat,
}
