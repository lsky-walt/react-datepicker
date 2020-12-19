import dayjs, { format } from 'dayjs'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const formats = {
  date: 'YYYY-MM-DD',
  time: 'hh:mm:ss',
  datetime: 'YYYY-MM-DD hh:mm:ss',
}

/**
 * All dates must meet dayjs requirements
 */

const clone = (date) => dayjs(date)

// date
const resetDate = (date, ...args) => {
  let cur = dayjs(date)
  const [millisecond, seconds, minutes, hours, days, ms, years] = args
  if (typeof millisecond === 'number') {
    cur = cur.millisecond(millisecond)
  }
  if (typeof seconds === 'number') {
    cur = cur.second(seconds)
  }
  if (typeof minutes === 'number') {
    cur = cur.minute(minutes)
  }
  if (typeof hours === 'number') {
    cur = cur.hour(hours)
  }
  if (typeof days === 'number') {
    cur = cur.date(days)
  }
  if (typeof ms === 'number') {
    cur = cur.month(ms)
  }
  if (typeof years === 'number') {
    cur = cur.year(years)
  }

  return cur
}

// month
const getDaysInMonth = (date) => dayjs(date).daysInMonth()
const getStartInMonthDate = (date) => resetDate(date, 0, 0, 0, 0, 1)
const getEndInMonthDate = (date) => resetDate(date, 0, 0, 0, 0, getDaysInMonth(date))
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
  return cur.subtract(1, 'month')
}
const getNextMonth = (date) => {
  const cur = getStartInMonthDate(date)
  return cur.add(1, 'month')
}
const getMonth = (date) => months[dayjs(date).month()]

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
}
