import ReactDOM from "react-dom"
import { getParent } from "@lsky/tools"
import { formats } from "./config"

// ----------------
// class name
import styles from "../style/index.less"
import pickers from "../style/picker.less"
import absolutes from "../style/absolute.less"
import inputs from "../style/input.less"
import results from "../style/result.less"
import containers from "../style/container.less"

const generateCls =
  (obj, prefix) =>
  (...args) =>
    args
      .filter((v) => !!v)
      .reduce((prev, cur) => {
        if (cur === "_") {
          prev.push(prefix)
          prev.push(obj[prefix])
          return prev
        }
        prev.push(`${prefix}-${cur}`)
        prev.push(obj[`${prefix}-${cur}`])
        return prev
      }, [])
      .join(" ")

const datepickerClass = generateCls(styles, "react-datepicker")
const pickerClass = generateCls(pickers, "react-datepicker-picker")
const absoluteClass = generateCls(absolutes, "react-datepicker-absolute")
const inputClass = generateCls(inputs, "react-datepicker-input")
const resultClass = generateCls(results, "react-datepicker-result")
const containerClass = generateCls(containers, "react-datepicker-container")

// ----------------

export const docScroll = {
  get top() {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  get left() {
    return document.documentElement.scrollLeft || document.body.scrollLeft
  },
  set top(value) {
    document.documentElement.scrollTop = value
    document.body.scrollTop = value
  },
  set left(value) {
    document.documentElement.scrollLeft = value
    document.body.scrollLeft = value
  },
}

export const docSize = {
  get width() {
    return window.innerWidth || document.documentElement.clientWidth
  },
  get height() {
    return window.innerHeight || document.documentElement.clientHeight
  },
}

/**
 * from redux.compose https://github.com/reactjs/redux/blob/master/src/compose.js
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
export function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) =>
    rest.reduceRight((composed, f) => f(composed), last(...args))
}

export function curry(f, ...args) {
  if (args.length >= f.length) {
    return f(...args)
  }

  return (...next) => curry(f.bind(f, ...args), ...next)
}

/**
 * get date format
 * @param {string} type date | time | datetime | month | year
 * @param {string} format date format  ==>  dayjs
 */
export function getFormat(type, format) {
  if (!type) return formats.datetime
  if (!format) return type
  return format
}

const RECENTLY_LENGTH = 4
/**
 * push date to recently stack
 * @param {array} recently recently picker
 * @param {string} date date
 */
export function pushToRecently(recently, date) {
  if (!date) return recently
  if (recently.length > RECENTLY_LENGTH) {
    recently.splice(0, 1, date)
    return recently
  }
  recently.unshift(date)
  return recently
}

export const isInReactDatepickerComponent = (dom) => {
  if (!dom) return false
  return !!getParent(dom, ".react-datepicker")
}

export {
  generateCls,
  datepickerClass,
  pickerClass,
  absoluteClass,
  inputClass,
  resultClass,
  containerClass,
}
