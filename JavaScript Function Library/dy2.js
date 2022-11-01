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
 * @description 返回当前年第一天分隔式
 * @returns {`${number}-01-01`}
 */
export function getCurrentYearStart() {
    const currentYear = new Date().getFullYear()
    return `${currentYear}-01-01`
}

/* 
 * @description 将无分割的日期时间字符串转为正常日期时间格式
 * @returns {String}
 */
export function addSymbolInDate(data = '', sign = '') {
    sign = sign || '-'
    if (data) {
        data = isString(data) ? data.trim() : data.toString().trim()
        const length = data.length
        if (length === 6) return data.replace(/(\d{4})(\d{2})/, `$1${sign}$2`)
        if (length === 4) return data.replace(/(\d{4})(\d{2})/, `$1${sign}$2`)
        if (length === 8) return data.replace(/(\d{4})(\d{2})(\d{2})/, `$1${sign}$2${sign}$3`)
        if (length >= 12 && length < 14) return data.replace(/(\d{4})(\d{2})(\d{2})(\s?)(\d{2})(\d{2})/, `$1${sign}$2${sign}$3 $5:$6`)
        if (length >= 6) return data.replace(/(\d{4})(\d{2})(\d{2})(\s?)(\d{2})(\d{2})(\d{2})/, `$1${sign}$2${sign}$3 $5:$6:$7`)
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
 * @description 输入日期时, 自动填充 - , 形成标准日期格式: YYYY-MM-DD
 * @param {String} value
 * @returns {String}
 */
export const dateInputFormat = (date = '') => {
    const date = value.replaceAll(/[^\d]/g, '')
    const year = date.substring(0, 4)
    const month = date.substring(4, 6)
    const day = date.substring(6, 8)
    if (date.length > 4) {
        value = year + '-' + month
        if (date.length > 6) {
            value = year + '-' + month + '-' + day
        }
    }
}

/* 
 * @description 去除时间字符串中的":"
 * @param {String} data
 * @returns {String}
 */
export const removeColonFromTime = (data = '') => {
    if (data) {
        data = isString(data) ? data.trim() : data.toString().trim()
        const length = data.length
        if (length === 5) return data.replace(/(\d{2})([:])(\d{2})/, '$1$3')
        if (length === 8) return data.replace(/(\d{2})([:])(\d{2})([:])(\d{2})/, '$1$3$5')
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