export class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        def(value, '__ob__', this);

        this.walk(value);
    }
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }
}