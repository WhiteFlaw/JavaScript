/* 
 * @description 返回鼠标坐标, 参考左上坐标系
 * @param 事件对象
 * @returns {}
 */
function getMousePosition(e) {
    const position = {
        x: e.clientX,
        y: e.clientY
    }
    return position;
}

/* 
 * @description 返回鼠标坐标, 参考中央坐标系
 * @param 事件对象
 * @returns {}
 */
function getDistanceOfCenter(e) {
    const position = {
        x: e.clientX - window.innerWidth / 2,
        y: window.innerHeight / 2 - e.clientY
    }
    return position;
}

/* 
 * @description 返回鼠标相对于视口中央的角度
 * @param 事件对象
 * @returns Number
 */
function getRangeOfCenter(e) {
    const mouse = { x: e.clientX, y: e.clientY }
    const angle = Math.atan2((window.innerHeight / 2) - mouse.y, mouse.x - (window.innerWidth / 2));
    const theta = angle * (180 / Math.PI);
    return theta;
}

/* 
 * @description 返回两点之间距离的绝对值, 两点参考的坐标系必须一致
 * @param 起点 终点
 * @returns {}
 */
function getDistance(start, end) {
    const distance = {
        x: Math.abs(end.x - start.x),
        y: Math.abs(end.y - start.y)
    }
    return distance;
}

/* 
 * @description 返回两点连线与x轴的角度, 两点参考坐标系必须一致
 * @param 近端点 远端点
 * @returns {}
 */
function getRange(vertex, point) {
    const angle = Math.atan2(vertex.y - point.y, point.x - vertex.x);
    const theta = angle * (180 / Math.PI);
    return theta;
}

/* 
 * @description 返回元素四边offset, 参考左上坐标系
 * @param dom
 * @returns {}
 */
function eleOffset(ele) {
    const temObj = ele.getBoundingClientRect();
    return temObj;
}

/* 
 * @description 计算元素四边offset, 参考中央坐标系
 * @param dom
 * @returns {}
 */
function eleOffsetCenter(ele) {
    const temObj = ele.getBoundingClientRect();
    const offsets = {};
    offsets['left'] = temObj.left - (window.innerWidth / 2);
    offsets['right'] = temObj.right - (window.innerWidth / 2);
    offsets['top'] = window.innerHeight / 2 - temObj.top;
    offsets['bottom'] = window.innerHeight / 2 - temObj.bottom;
    return offsets;
}

/* 
 * @description 计算元素四角顶点坐标, 参考左上坐标系
 * @param dom
 * @returns {}
 */
function eleVertex(ele) {
    const temObj = ele.getBoundingClientRect();
    const points = {}
    points['tl'] = { left: temObj.left, top: temObj.top }
    points['tr'] = { left: temObj.left + temObj.width, top: temObj.top }
    points['bl'] = { left: temObj.left, top: temObj.top + temObj.height }
    points['br'] = { left: temObj.left + temObj.width, top: temObj.top + temObj.height }
    return points;
}

/* 
 * @description 计算元素四顶点坐标, 参考中央坐标系
 * @param dom
 * @returns {}
 */
function eleVertexCenter(ele) {
    const temObj = ele.getBoundingClientRect();
    const center = { top: window.innerHeight / 2, left: window.innerWidth / 2 }
    const points = {}
    points['tl'] = { left: temObj.left - center.left, top: center.top - temObj.top }
    points['tr'] = { left: temObj.left + temObj.width - center.left, top: center.top - temObj.top }
    points['bl'] = { left: temObj.left - center.left, top: center.top - temObj.top + temObj.height }
    points['br'] = { left: temObj.left + temObj.width - center.left, top: center.top - temObj.top + temObj.height }
    return points;
}

/* 
 * @description 返回页面滚动后元素位置信息, 单位像素
 * @param dom
 * @returns {}
 */
function eleScroll(ele) {
    const temObj = ele.getBoundingClientRect();
    const scroll = {
        scrollTop: ele.scrollTop,
        scrollLeft: ele.scrollLeft,
        top: temObj.top,
        left: temObj.left,
    }
    return scroll;
}
