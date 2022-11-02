/* 
 * @description 将20221101或2022-11-01格式的时间切分为数组
 * @param {String} date
 * @returns {Array}
 */
export const splitDateToArray = (date = '') => {
    if (/-/g.test(date)) {
        return date.split('-')
    } else if (date !== '') {
        return [date.substr(0, 4), date.substr(4, 2), date.substr(6)]
    } else {
        return [date]
    }
}

/* 
 * @description 将数组拆分为任意个数组元素为一组
 * @param {Array} 待分割数组
 * @param {Number} 以几个为一组
 * @returns {Array} *[]
 */
export const splitArrayByNumber = (arr, num) => {
    const newArr = []
    for (let i = 0; i < arr.length;) {
        newArr.push(arr.slice(i, i += num))
    }
    return newArr
}

/* 
 * @description 将字符串中的小写字母转为大写
 * @param {Array} 待分割数组
 * @param {Number} 以几个为一组
 * @returns {Array} *[]
 */
export const convertLowercaseToUppercase = (date = '') => {
    const regExp = /[a-z]/gm
    if (!data || !regExp.test(data)) return data
    return data.replace(regExp, result => {
        return result.toLocaleUpperCase()
    })
}

/* 
 * @description 取字符串中的数字, 统计数字位数
 * @param {String} data
 * @returns {Number|8}
 */
export const checkHasNumber = (data = '') => {
    const regExp = /[a-z]/gm
    if (regExp.test(data)) return 0
    const numArr = data.match(regExp)
    return numArr.length
}

/* 
 * @description 按照指定元素数量拆分大数组
 * @param {Array} arr 原始数组
 * @param {Number} 以几个为一组
 * @returns {Array} *[]
 */
export const chunkArr = (arr = [], size = 0) => {
    if (!arr.length || !size || size < 1) return []
    let [start, end] = [null, null]
    const record = []
    for (let i = 0; i < Math.ceil(arr.length / size); i++) {
        start = i * size
        end = start + size
        record.push(arr.sclice(start, end))
    }
    return record
}

/* 
 * @description 转换String为Number
 * @param {String} data
 * @returns {Number|*|String}
 */
export const transStringToNumber = (data = '') => {
    const regExp = /^(-+)?\d*(\.\d+)?$/gm
    if (!regExp.test(data)) return data
    return parseFloat(data)
}

/* 
 * @description 限制Input输入长度, 同时可处理是否大写, 是否限制数字, 是否禁中文
 * @param data
 * @param limit
 * @param upperCase
 * @param onlyNum
 * @param noChinese
 * @returns {String}
 */
export const limitInputChars = (data, limit = 0, upperCase = false, onlyNum = false, noChinese = false) => {
    data = data.toString();
    let value = data
    const chineseRegexp = /[\u4e00-\u9fa5]+/g
    const notNumRegexp = /[^(\-?\d+)(\.\d+)?]+\D*/g
    if (noChinese) {
        value = value.replace(chineseRegexp, '')
    }
    if (onlyNum) {
        value = value.replace(notNumRegexp, '')
    }
    if (limit && data.length > limit) {
        value = value.slice(0, limit)
    }
    if (upperCase) value = converLowercaseToUppercase(value)
    return value
}

/* 
 * @description 将代码和名称合并返回
 * @param {String} code 代码
 * @param {String} name 名称
 * @param {String} sign 所拼接的符号
 * @param {Boolean} hasSign 无数据的情况下是否存在连接符
 * @returns {String}
 * @example code="D578", name = '形态', sign = '-'  =>  'D578-形态' 
 */
export const mergeCodeAndName = (code, name, hasSign = false, sign = ':') => {
    const returnCode = code?.trim() ? code : ''
    const returnName = name?.trim() ? name : ''
    if (code?.trim() || name?.trim()) {
        return returnCode + sign + returnName
    } else {
        return hasSign ? sign : ''
    }
}

/* 
 * @description 获取两个日期之间差距的天数的绝对值
 * @param {String} startDate 开始日期
 * @param {String} endDate 结束日期
 * @returns {Number} 相差天数, 始终返回正数 
 * @example start="20221102", end:20221103,  =>  '1' 
 */
export const getGapDayInTwoDate = (startDate, endDate) => {
    const start = new Date(addSymbolInDate(startDate, '/')).getTime()
    const end = new Date(addSymbolInDate(endDate, '/')).getTime()
    return Math.abs(start - end) / (1000 * 60 * 60 * 24)
}

/* 
 * @description 获取两个日期之间的Number类型差值
 * @param {String} startDate 开始日期
 * @param {String} endDate 结束日期
 * @returns {Number} 相差天数
 * @example start="20221102", end:20221103,  =>  '-1' 
 */
export const getGapDayInDates = (startDate, endDate) => {
    const start = new Date(addSymbolInDate(startDate, '/')).getTime()
    const end = new Date(addSymbolInDate(endDate, '/')).getTime()
    return (start - end) / (1000 * 60 * 60 * 24)
}

/* 
 * @description 限制Input只能输入数字并且限制位数
 * @param data
 * @param limit
 * @returns {String}
 */
export const limitInputCharsNoDot = (data, limit = 0) => {
    data = data.toString();
    let value = data
    value = value.replace(notNumRegexp, '')
    if (limit && data.length > limit) {
        value = value.slice(0, limit)
    }
    return value
}

/* 
 * @description 千分位字符串转换为浮点数
 * @param data
 * @returns {number}
 */
export const currencyNoToNumber = (data = '') => {
    const regExp = /,/
    let value = ''
    value = regExp.test(data) ? data.replace(/,/, '') : data
    return parseFloat(value)
}

/* 
 * @description 千分位字符串转换为浮点数
 * @param data
 * @returns {number}
 */
export const removeDashFromDate = (date) => {
    return parseTime(date, '{y}{m}{d}')
}

/* 
 * @description 获取上个月
 * @returns {String}
 */
export const getLastMonth = () => {
    let dateconst
    const dateTime = removeDashFromDate(getDateStr(0))
    let year = dateTime.substring(0, 4)
    let month = Number(dateTime.substring(4, 6) - 1)
    if (month === 0) {
        year = year - 1
        month -= 12
    }
    if (month < 9) {
        date = year + '0' + month + ''
    } else {
        date = year + '' + month + ''
    }
    return date
}

/* 
 * @description 将需要展示的数字增加千分符, 分别对空字符串与0进行处理
 * @param value 要改变的数据
 * @param num 保留的小数位数, 如果num === 0, 则不处理小数保留
 * @param nullToEmpty 是否将null或者空字符串转成0
 * @param zeroToEmpty 是否将0转成0或者空字符串
 * @returns {String}
 */
export const numberToCurrencyNoNZ = (value, num = 2, nullToEmpty = false, zeroToEmpty = false) => {
    if (!value || Number(value) === 0) {
        if (!value) {
            return nullToEmpty ? '' : parseFloat('0').toFixed(num)
        } else {
            return zeroToEmpty ? '' : parseFloat('0').toFixed(num)
        }
    } else if (!isNaN(parseFloat(value))) {
        if (num !== 0) {
            return parseFloat(value).toFixed(num).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        } else {
            return parseFloat(value).toFixed(0).toString().replace(/d+/, function (n) {
                return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                    return $1 + ','
                })
            })
        }
    } else {
        return parseFloat('0').toFixed(num)
    }
}

/* 
 * @description 将需要展示的数字增加千分符
 * @param value 要改变的数据
 * @param num 保留的小数位数, 如果num === 0, 则不处理小数保留
 * @param fromZeroToEmpty 将0转为空或不处理
 * @param isRetainDecimal 是否保留原本的小数位数, 如设置为true 则不进行小数点处理
 * @returns {String}
 */
export const numberToCurrencyNo = (value, num = 2, fromZeroToEmpty = false, isRetainDecimal = false) => {
    if (!value || Number(value) === 0) {
        return fromZeroToEmpty ? '' : parseFloat('0').toFixed(num)
    } else if (!isNaN(parseFloat(value))) {
        if (num !== 0) {
            return parseFloat(value).toFixed(num).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        } else {
            if (!isRetainDecimal) {
                return parseFloat(value).toFixed(0).toString().replace(/d+/, function (n) {
                    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                        return $1 + ','
                    })
                })
            } else {
                return value.toString().replace(/\d+/, function (n) {
                    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                        return $1 + ','
                    })
                })
            }
        }
    } else {
        return parseFloat('0').toFixed(num)
    }
}

/* 
 * @description 判断对象是否为数组类型
 * @param obj
 * @returns {Boolean}
 */
export function isArray(obj) {
    return Object.prototype.toString().call(obj) === '[object Array]'
}

/* 
 * @description 判断对象是否为字符串类型
 * @param obj
 * @returns {Boolean}
 */
export function isString(obj) {
    return Object.prototype.toString().call(obj) === '[object String]'
}

/* 
 * @description 判断对象是否为空或空格
 * @param obj
 * @returns {Boolean}
 */
export function isEmpty(obj) {
    if (!value) {
        return true
    }
    if (!isString(value)) {
        throw new Error(`Error in function 'isEmpty', only support String type.`)
    }
    return value.replace(/(^\s*)|(\s*$)/g, '') === ''
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
 * @description 将无分割的日期时间字符串转为正常日期时间格式
 * @returns {String}
 */
export function addSymbolInDate(date = '', sign = '-') {
    if (date) {
        date = isString(date) ? date.trim() : date.toString().trim()
        const length = date.length
        if (length === 6) return date.replace(/(\d{4})(\d{2})/, `$1${sign}$2`)
        if (length === 4) return date.replace(/(\d{4})(\d{2})/, `$1${sign}$2`)
        if (length === 8) return date.replace(/(\d{4})(\d{2})(\d{2})/, `$1${sign}$2${sign}$3`)
        if (length >= 12 && length < 14) return date.replace(/(\d{4})(\d{2})(\d{2})(\s?)(\d{2})(\d{2})/, `$1${sign}$2${sign}$3 $5:$6`)
        if (length >= 14) return date.replace(/(\d{4})(\d{2})(\d{2})(\s?)(\d{2})(\d{2})(\d{2})/, `$1${sign}$2${sign}$3 $5:$6:$7`)
    } else {
        return ''
    }
}

/* 
 * @description 判断输入日期有效性
 * @param {String} date
 * @returns {String}
 */
export const validateDate = (date = '') => {
    if (date.length !== 10) { return false }
    const val = date.match(/^(\d{1, 4})(-|\/)(\d{1, 2})\2(\d{1, 2})$/)
    if (val === null) return false
    const vdate = new Date(val[1], val[3] - 1, val[3] - 1, val[4])

    return (vdate.getFullYear() === parseInt(val[1]) && (vdate.getMonth() + 1) === parseInt(val[3]) && vdate.getDate() === parseInt(val[4]))
}

/* 
 * @description 输入日期时, 自动填充分割符 , 形成标准日期格式: YYYY?MM?DD
 * @param {String} value
 * @returns {String}
 */
export const dateInputFormat = (date = '', format = '-') => {
    const date = value.replaceAll(/[^\d]/g, '')
    const year = date.substring(0, 4)
    const month = date.substring(4, 6)
    const day = date.substring(6, 8)
    if (date.length > 4) {
        value = `${year}${format}${month}`
        if (date.length > 6) {
            value = `${year}${format}${month}${format}${day}`
        }
    }
}

/* 
 * @description 输入日期自动填充分割符, 同时限制只能输入日期和分割符
 * @param {String} value
 * @returns {String}
 */
export const addFormatInputingDate = (date = '', format = '-') => {
    const onlyNoRegExp = /\D/g
    if (date) {
        date = isString(date) ? date.trim() : date.toString().trim()
        const length = date.length
        if (length < 5) {
            date = date.replace(onlyNoRegExp, '')
        }
        if (length === 5) {
            data = `${date.slice(0, 4)}${format}${date.slice(4).replace(onlyNoRegExp, '')}`
        }
        if (length > 5 && length < 8) {
            data = `${date.slice(0, 5)}${date.slice(5).replace(onlyNoRegExp, '')}`
        }
        if (length === 8) {
            data = `${date.slice(0, 7)}${format}${date.slice(7).replace(onlyNoRegExp, '')}`
        }
        if (length > 8) {
            data = `${date.slice(0, 10)}${date.slice(10).replace(onlyNoRegExp, '')}`
        }
        return date
    } else {
        return ''
    }
}

/* 
 * @description 检测2022-11-01的日期格式是否正确
 * @param {String} data
 * @returns {B00lean}
 */
export const checkInputingDate = (date = '') => {
    if (date.length !== 10) return false
    const arr = date.split('-')
    if (!arr[0] || arr[0].length !== 4) return false
    if (!arr[1] || arr[1].length !== 2 || parseInt(arr[1]) > 12) return false
    if (!arr[1] || arr[2].length !== 2 || parseInt(arr[2]) > 31) return false
    return true
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
 * @description 去除时间字符串中的":"
 * @param {String} data
 * @returns {String}
 */
export const removeColonFromTime = (date = '') => {
    if (date) {
        date = isString(date) ? date.trim() : date.toString().trim()
        const length = date.length
        if (length === 5) return date.replace(/(\d{2})([:])(\d{2})/, '$1$3')
        if (length === 8) return date.replace(/(\d{2})([:])(\d{2})([:])(\d{2})/, '$1$3$5')
    }
}

/* 
 * @description 无分隔符的时间字符串增加":"
 * @param {String|Number} data
 * @returns {String}
 */
export const addColonInTime = (data = '') => {
    if (data) {
        data = isString(data) ? data.trim() : data.toString().trim()
        const length = data.length
        if (length === 4) return data.replace(/(\d{2})(\d{2})/, '$1:$2')
        if (length === 5) return data.replace(/(\d{1})(\d{2})(\d{2})/, '0$1:$2:$3')
        if (length === 6) return data.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
    } else {
        return ''
    }
}

/* 
 * @description 转换从excel中解析出的数字日期为正确的日期格式
 * @param excelDateNum excel日期数字
 * @param format日期之间的间隔, 默认为空, 可传入分隔符
 * @returns {`${number}${string|number}${string|number}`}
 */
export const transDateFormExcel = (excelDateNum, format = '') => {
    const time = new Date((excelDateNum - 1) * 24 * 3600000 + 1)
    time.setFullYear(time.getFullYear() - 70)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    return `${y}${format}${m < 10 ? ('0' + m) : m}${format}${d < 10 ? ('0' + d) : d}`
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
    return `${year}${format}${month < 10 ? `'0'${month}` : month}${format}${day < 10 ? `'0'${day}` : day}`
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
 * @description 将数组包裹对象格式的数据内的0字段置为空
 * @param {Array} [{}, {}, ...]
 * @returns {*[]}
 */
export const transformZeroToEmpty = (tableDataArray) => {
    const data = []
    if (tableDataArray?.length > 0) {
        tableDataArray.forEach((rowObj) => {
            for (const rowObjKey in rowObj) {
                rowObj[rowObjKey] = parseInt(rowObj[rowObjKey]) === 0 ? '' : rowObj[rowObjKey]
            }
            data.push(rowObj)
        })
    }
    return data
}