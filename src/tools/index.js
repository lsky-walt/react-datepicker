import styles from '../style.less'
import pickers from '../style/picker.less'

const generateCls = (obj, prefix) => (...args) => args.filter((v) => !!v).map((v) => {
  if (v === '_') return obj[prefix]
  return obj[`${prefix}-${v}`]
}).join(' ')

const datepickerClass = generateCls(styles, 'react-datepicker')
const pickerClass = generateCls(pickers, 'react-datepicker-picker')
export {
  generateCls,
  datepickerClass,
  pickerClass,
}
