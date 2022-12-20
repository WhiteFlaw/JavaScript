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
export const getAllDayOfMonth = (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
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

/* 现在能用, 但是会改变原数组 考虑用Map替换闭包方案
 * @description 如果参数中任何一个数组元素或对象属性值为assignedVal, 替换值为toVal.
 * @returns {}|[]
 */
export function replaceAssignedValue (params = [], assignedVal = null, toVal = '') { // 简单对象, 简单数组, 复杂嵌套对象数组
  let tem
  if (Array.isArray(params)) {
    tem = params.concat() // concat无法深拷贝函数类型, 等待封装
  } else if (Object.prototype.toString.call(params) === '[object Object]') {
    tem = Object.assign(params) // 此处必须使用深拷贝方法, 等待封装
  } else {
    console.error('Type Error: The "replaceAssignedValue" only accept Val in Type Array or Object.')
    return false
  }
  (function inside(params) {
    if (Array.isArray(params)) {
      for (let i = 0; i < params.length; i++) {
        if (typeof params[i] === 'Object') {
          inside(params[i], assignedVal, toVal)
        } else {
          params[i] === assignedVal && (params[i] = toVal)
        }
      }
    }
    if (Object.prototype.toString.call(params) === '[object Object]') {
      for (const key in params) {
        if (typeof params[key] === 'Object') {
          inside(params[key], assignedVal, toVal)
        } else {
          params[key] === assignedVal && (params[key] = toVal)
        }
      }
    }
  })(tem)
  return tem
}

/* 
 * @description 从数组中移除指定元素(也可为对象数组)
 * @param {String} arr 数组 obj 待移除元素
 * @returns {String}
 */
export function removeObjFromArr(arr, obj) {
  arr.splice(arr.indexOf(obj), 1)
}

/* 
 * @description 依据属性从对象数组中移除对象(移除Arr中所有key属性值为val的对象)
 * @param {String} arr 数组 key 属性 val 属性值
 * @returns {String}
 */
export function removeObjFromArrByAttr(arr, key, val) {
  const targets = arr.filter(obj => obj[key] === val).map(obj => arr.indexOf(obj));
  for (let i = 0; i < targets.length; i++) {
    arr.splice(targets[i], 1);
  }
}

/* 
 * @description 对象数组去重
 * @param {String} arr 对象数组
 * @returns {Array}
 */
export function deduObjArr(arr = []) {
  const deduArr = [...new Set(arr.map(raw => JSON.stringify(raw)))].map(json => JSON.parse(json))
  return deduArr
}

/* 
 * @description 深拷贝对象
 * @param {String} target 目标对象
 * @returns {String}
 */

/* 
 * @description 检查对象数组中所列属性是否均相同, 需要添加属性值为数组/对象时的特殊比较方法
 * @param {String} arr 对象数组
 * @returns {Array}
 */
export function deduObjArr (arr, keyArr) {
  let tem = true
  for (let i = 0; i < keyArr.length; i++) {
    if (!arr.every(item => item[keyArr[i]] === arr[0][keyArr[i]])) {
      tem = false
      break
    }
  }
  return tem
}
