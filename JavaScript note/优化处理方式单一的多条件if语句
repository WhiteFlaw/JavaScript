# 优化过多条件 + 单一处理方式的if语句

## if判定
```javascript
const id = getUsrId
if(id === '32100122' ||
id === '32100002' ||
id === '32100121' ||
id === '32100753' ||
id === '32072380' ||
id === '32089342' ||
id === '32100003' ||
id === '32000359' ||
id === '32100775' ||
id === '32500122' ||
id === '32100363' ||
id === '32100948' ||
) {
 // xxx
}
```

## 基于switch优化

在类似多条件选取其中一部分的情况下, switch比for, 或者多if结构高效很多.
```javascript
checkIdf() {
  switch (this.getUsrId()) {
    case '32100122':
    case '32100002':
    case '32100121':
    case '32100753':
    case '32072380':
    case '32089342':
    case '32100003':
    case '32000359':
    case '32100775':
    case '32500122':
    case '32100363':
    case '32100948': // idf默认N, 不需要处理
      this.idf = 'N'
      break
    default:
      this.idf = 'Y'
  }
},
```
