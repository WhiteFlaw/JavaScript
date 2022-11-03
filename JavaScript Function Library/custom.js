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
 * @param {String} Symbol(可选) 特殊后缀, 总计对象内每个属性名将增加特殊后缀 
 * @returns {Object} 
 */
export const sumAllObjOfArr = (arr = [], proArr = '', symbol) => {
    const temObj = {}
    proArr = proArr === '' && Object.keys(arr[0])
    proArr.forEach((pro) => {
        temObj[pro] = arr.reduce((prevVal, currVal) => {
            if (!isNaN(Number(currVal[pro]))) {
                return prevVal + Number(currVal[pro])
            } else {
                return prevVal + 0
            }
        }, 0)
    })
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
