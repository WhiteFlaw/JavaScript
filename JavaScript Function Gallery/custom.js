const is = {
  Array: Array.isArray,
  Date: (val) => val instanceof Date,
  Set: (val) => Object.prototype.toString.call(val) === '[object Set]',
  Map: (val) => Object.prototype.toString.call(val) === '[object Map]',
  Object: (val) => Object.prototype.toString.call(val) === '[object Object]',
  Symbol: (val) => Object.prototype.toString.call(val) === '[object Symbol]',
  Function: (val) => Object.prototype.toString.call(val) === '[object Function]'
}

/* 
 * @description 依据子对象某一属性的值切分数组
 * @param {Array} [{}, {}, ...]
 * @returns {Array} [[],[],[]] 二维数组
 */
export const chunkArrByProperty = (arr, pro) => {
  const partArr = [];
  const proValTypeArr = Array.from(new Set(arr.map(obj => obj[pro])));
  proValTypeArr.forEach((valType, valTypeIndex) => {
    partArr.push([]);
    arr.forEach((obj) => {
      if (obj[pro] === valType) {
        partArr[valTypeIndex].push(obj);
      }
    })
  })
  return partArr;
}

/* 
 * @description 对对象数组内各个属性分别求和, 返回对象, 无法执行加法的项将略过
 * @param {Array} [{}, {}, ...] 原数组 
 * @param {Array} [{}, {}, ...] (可选)需相加的属性构建数组, 数组元素顺序会影响结果对象, 不传默认从原数组第0位对象提取.
 * @param {String} symbol(可选) 特殊后缀, 总计对象内每个属性名将增加特殊后缀.
 * @returns {Object} 
 */
export const sumAllObjOfArr = (arr = [], proArr = '') => { // 需要添加是否在proArr中的key仅为所有key的一部分时是否补齐其他key的判定
  const temObj = {};
  proArr = proArr === '' && Object.keys(arr[0]);
  for (let i = 0; i < proArr.length; i++) {
    temObj[pro] = arr.reduce((prevVal, currVal) => {
      return prevVal + (!isNaN(Number(currVal[pro])) ? Number(currVal[pro]) : 0);
    }, 0)
  }
  return temObj;
}

/* 
 * @description 获取月总天数, 默认当年当月
 * @param {String | Number} year 年份
 * @param {String | Number} month 月份
 * @returns {`${number}${string|number}${string|number}`}
 */
export const getAllDayOfMonth = (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
  const day = new Date(year, month, 0);
  return day.getDate();
}

/* 
 * @description 初始化日期为今日
 * @param format日期之间的间隔, 默认为-, 可传入分隔符
 * @returns {`${number}${string|number}${string|number}`}
 */
export const initNowDate = (format = '-') => {
  const time = new Date();
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  return `${year}${format}${month < 10 ? `0${month}` : month}${format}${day < 10 ? `0${day}` : day}`;
}

/* 
 * @description 去除时间字符串中的"-"
 * @param {String} data
 * @returns {String}
 */
export const removeDashFromTime = (date = '') => {
  if (date) {
    date = isString(date) ? date.trim() : date.toString().trim();
    const length = date.length;
    if (length === 5) return date.replace(/(\d{2})([-])(\d{2})/, '$1$3');
    if (length === 8) return date.replace(/(\d{2})([-])(\d{2})([-])(\d{2})/, '$1$3$5');
  }
}

/* 
 * @description 返回当前年第一天分隔式
 * @returns {`${number}-01-01`}
 */
export function getCurrentYearStart() {
  const currentYear = new Date().getFullYear();
  return `${currentYear}-01-01`;
}

/* 
 * @description 返回当前年第一天合并式
 * @returns {`${number}-01-01`}
 */
export function getCurrentYearStartRaw() {
  const currentYear = new Date().getFullYear();
  return `${currentYear}0101`;
}

/* 
 * @description 用toValue替换复杂结构中所有value值, 不改变源对象/数组
 * @param {String} params 数组|对象 value 受检索 toValue 受替换
 * @returns {Object|Array}
 */
export function replaceAssignedValue(params = [], value = null, toValue = '') {
  if (!is.Array(params) && !is.Object(params)) {
    params === value && (params = toValue);
    return params;
  }
  const newObj = is.Array(value) ? [] : {};
  for (const key in params) {
    newObj[key] = replaceAssignedValue(params[key], value, toValue);
  }
  return newObj;
}

/* 
 * @description 从数组中移除指定元素
 * @param {String} arr 数组 obj 待移除元素
 * @returns {String}
 */
export function removeObjFromArr(arr, obj) {
  arr.splice(arr.indexOf(obj), 1);
}

/* 
 * @description 依据属性从对象数组中移除对象(移除arr中所有key属性值为val的对象)
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
  const deduArr = [...new Set(arr.map(raw => JSON.stringify(raw)))].map(json => JSON.parse(json));
  return deduArr;
}

/* 
 * @description 深拷贝 拷贝原型链可选
 * @param {Object | Array} value 对象|数组
 * @returns {Object | Array}
 */
function deepCopy(value, weakMap = new WeakMap(), protoNeeded = true) {
  if (is.Function(value)) return value;
  if (is.Date(value)) return new Date(value.valueOf());
  if (is.Symbol(value)) return Symbol(value.description);
  if (is.Set(value)) {
    const newSet = new Set();
    for (const item of value) newSet.add(deepCopy(item), weakMap);
      return newSet;
  }
  if (is.Map(value)) {
    const newMap = new Map();
    for (const item of value) newMap.set(deepCopy(item[0], weakMap), deepCopy(item[1], weakMap));
      return newMap;
  }
  if (weakMap.has(value)) return weakMap.get(value);
  if (!is.Object(value) && !is.Array(value)) return value;
  const newObj = is.Array(value) ? [] : {};
  weakMap.set(value, newObj);
  for (const key in value) {
    if (is.Object(value[key]) && protoNeeded) { // 对象额外进行原型拷贝
      newObj[key] = addProto(value[key], deepCopy(value[key], weakMap));
    } else {
      newObj[key] = deepCopy(value[key], weakMap);
    } 
  }
  const symbolKeys = Object.getOwnPropertySymbols(value);
  for (const sKey of symbolKeys) {
    newObj[sKey] = deepCopy(value[sKey], weakMap);
  }
  return newObj
}

/* 
 * @description arr遍历keyArr所列属性, 检查同属性的值是否相同
 * @param {String} arr 对象数组 keyArr 受列举属性数组
 * @returns {Boolean}
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

/* 
 * @description 将oldObj原型应用到newObj
 * @param {String} arr 对象数组 keyArr 受列举属性数组
 * @returns {Boolean}
 */
function addProto(oldObj, newObj) {
   const proto = Object.getPrototypeOf(oldObj);
   return Object.assign(Object.create(proto), newObj); // 基于oldObj原型建立空对象, 将newObj并入该对象
}
