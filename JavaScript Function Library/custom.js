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

/* 
 * @description 如果任何一个值为assignedVal, 替换值为toVal
 * @returns {`${number}-01-01`}
 */
replaceAssignedValue(params = [], assignedVal = null, toVal = '') { // 简单对象， 对象数组， 简单数组
      if (Array.isArray(params)) {
        for (let i = 0; i < params.length; i++) {
          params[i].constructor === Object || Array.isArray(params[i]) && this.replaceAssignedValue(params[i], assignedVal, toVal)
          params[i] === assignedVal && params[i] === toVal
        }
      }
      if (params.constructor === Object) {
        for (const key in params) {
          params[key] === Object || Array.isArray(params[key]) && this.replaceAssignedValue(params[key], assignedVal, toVal)
          params[key] === assignedVal && params[key] === toVal
        }
      } else {
        console.log('Error in replaceAssignedValue: Type Error.')
      }
      return params
    },
