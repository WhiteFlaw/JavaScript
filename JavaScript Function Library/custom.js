/* 
 * @description 依据子对象某一属性的值切分数组
 * @param {Array} [{}, {}, ...]
 * @returns {Array} [[],[],[]] 二维数组
 */
export const chunkArrByProperty = (arr, pro) => {
    const partArr = []
    const proValTypeArr = Array.from(new Set(arr.map(obj => obj[pro])))
    proValTypeArr.forEach((valType, valTypeIndex) => {
        partArr.push([])
        arr.forEach((obj) => {
            if (obj[pro] === valType) {
                partArr[valTypeIndex].push(obj)
            }
        })
    })
    return partArr
}

/* 
 * @description 对数组内所有对象的各个属性分别求和, 返回对象, 无法执行加法的项将略过
 * @param {Array} [{}, {}, ...] 原数组 
 * @param {Array} [{}, {}, ...] (可选)需相加的属性构建数组, 数组元素顺序会影响结果对象, 不传默认从原数组第0位对象提取.
 * @param {String} Symbol(可选) 特殊后缀, 总计对象内每个属性名将增加特殊后缀.
 * @returns {Object} 
 */
export const sumAllObjOfArr = (arr = [], proArr = '', symbol = false) => { // 需要添加是否在proArr中的key仅为所有key的一部分时是否补齐其他key的判定
    const temObj = {}
    proArr = proArr === '' && Object.keys(arr[0])
    proArr.forEach((pro) => {
        temObj[symbol ? `pro_${symbol}` : pro] = arr.reduce((prevVal, currVal) => {
            return prevVal + (!isNaN(Number(currVal[pro])) ? Number(currVal[pro]) : 0)
        }, 0)
    })
    return temObj
}

/* 
 * @description 获取月总天数, 默认当年当月
 * @param {String | Number} year 年份
 * @param {String | Number} month 月份
 * @returns {`${number}${string|number}${string|number}`}
 */
export const getAllDayOfMonth = (year = new Date().getFullYear(), month = new Date.getMonth() + 1) => {
    const day = new Date(year, month, 0)
    return day.getDate()
}

/* 
 * @description 初始化日期为今日
 * @param format日期之间的间隔, 默认为-, 可传入分隔符
 * @returns {`${number}${string|number}${string|number}`}
 */
export const initNowDate = (format = '-') => {
    const time = new Date()
    const year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    return `${year}${format}${month < 10 ? `0${month}` : month}${format}${day < 10 ? `0${day}` : day}`
}

/* 
 * @description 去除时间字符串中的"-"
 * @param {String} data
 * @returns {String}
 */
export const removeDashFromTime = (date = '') => {
    if (date) {
        date = isString(date) ? date.trim() : date.toString().trim()
        const length = date.length
        if (length === 5) return date.replace(/(\d{2})([-])(\d{2})/, '$1$3')
        if (length === 8) return date.replace(/(\d{2})([-])(\d{2})([-])(\d{2})/, '$1$3$5')
    }
}

/* 
 * @description 返回当前年第一天分隔式
 * @returns {`${number}-01-01`}
 */
export function getCurrentYearStart() {
    const currentYear = new Date().getFullYear()
    return `${currentYear}-01-01`
}

/* 
 * @description 返回当前年第一天合并式
 * @returns {`${number}-01-01`}
 */
export function getCurrentYearStartRaw() {
    const currentYear = new Date().getFullYear()
    return `${currentYear}0101`
}

/* 现在能用, 但是会改变原数组
 * @description 如果参数中任何一个数组元素或对象属性值为assignedVal, 替换值为toVal.
 * @returns {}|[]
 */
function replaceAssignedValue (params = [], assignedVal = null, toVal = '') { // 简单对象, 简单数组, 复杂嵌套对象数组
  let tem
  if (Array.isArray(params)) {
    tem = params.concat() // contect无法深拷贝函数类型, 等待封装
  } else if (Object.prototype.toString.call(params) === '[object Object]') {
    tem = Object.assign(params) // 此处必须使用深拷贝方法, 等待封装
  } else {
    console.error('Type Error: The "replaceAssignedValue" only accept Val in Type Array or Object.')
    return false
  }
  (function inside(params) {
    if (Array.isArray(params)) {
      for (let i = 0; i < params.length; i++) {
        if (Object.prototype.toString.call(params[i]) === '[object Object]' || Array.isArray(params[i])) {
          inside(params[i], assignedVal, toVal)
        } else {
          params[i] === assignedVal && (params[i] = toVal)
        }
      }
    }
    if (Object.prototype.toString.call(params) === '[object Object]') {
      for (const key in params) {
        if (Object.prototype.toString.call(params[key]) === '[object Object]' || Array.isArray(params[key])) {
          inside(params[key], assignedVal, toVal)
        } else {
          params[key] === assignedVal && (params[key] = toVal)
        }
      }
    }
  })(tem)
  return tem
}
