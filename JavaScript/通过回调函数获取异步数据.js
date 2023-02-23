

function getData(callback) {
    setTimeout(function () {
        let name = "zhangsan";
        callback(name);
    }, 1000)
}
/*
var callback = function(aaa) {
    console.log(aaa);
}

callback(name);

getData(function(aaa) {
    console.log(aaa);
}) */

var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let name = "zhangsan";
        resolve(name);
    }, 1000)
})

p.then((data) => {
    console.log(data);
})