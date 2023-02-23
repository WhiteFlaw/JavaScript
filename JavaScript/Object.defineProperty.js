var temObj = {
    a: 'a',
    b: 'b'
}

for (key in temObj) {
    Object.defineProperty(temObj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log(`${key} is being read`)
        },
        set(newVal) {
            console.log(`${key} has been change from ${temObj.key} to ${newVal}`)
        }
    })
}

console.log(temObj.a)
temObj.a = 1

temObj.b = 'f'