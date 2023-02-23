export class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    isEmpty() {
        return this.count === 0;
    }
    push(target, val, callback) {
        this.items[this.count] = {
            target: target,
            value: val,
            callback: callback
        }
        this.count++
    }
    pop(target) {
        if (this.isEmpty()) return undefined;
        delete this.peekSomeone(target);
        let result = this.peekSomeone(target);
        result.callback(result.value);
        return result;
    }
    peek() {
        if(this.isEmpty()) return undefined
        return this.items[this.count - 1];
    }
    size() {
        return this.count;
    } 
    clear() {
        this.items = {};
        this.count = 0;
    }
    peekSomeone(target) { // peekSomeone现在是从栈底开始找, 改一下这里就行了
        let result = undefined;
        for (let key in this.items) {
            if (target == this.items[key].target) {
                result = this.items[key];
                return result;
            }
        }
    }
}

export const stack = new Stack();