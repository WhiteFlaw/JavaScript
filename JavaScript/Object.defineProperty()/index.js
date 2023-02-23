// 为纳入控制的变量做响应式处理, 这些响应式值改变的时候会触发各自的setter, 在setter内做出压栈操作
// 还是压到同一个栈
//但是怎么在需要撤回的时候精确方便的把值回退回去
// 能不能用函数传参建立联系
// 用函数传参


import { stack } from './stack.js';

let obj1 = {};

Object.defineProperty(obj1, 'pro1', {
    enumerable: true,
    configurable: true,
    set: (newVal) => {setter(newVal)}
});

function setter(newVal) {
    const firstOne = stack.peekSomeone('obj1') === undefined ? undefined : stack.peekSomeone('obj1').value
    if (firstOne !== newVal) {
        console.log(`pro1 has been changed to ${newVal}`);
        stack.push('obj1', newVal, (oldVal) => {
            obj1.pro1 = oldVal
            console.log(`use backup val '${oldVal}' to obj1`);
        })
    }
}

// 封装一个处理方法, 传进不同数据类型的值进去直接自动处理, 加响应式.

obj1.pro1 = 77;
obj1.pro1 = 1;
obj1.pro1 = 723;
obj1.pro1 = 7;
obj1.pro1 = [1, ,2, ,3 ];
obj1.pro1 = 72;

stack.pop('obj1')