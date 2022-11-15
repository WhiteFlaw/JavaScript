# 基于switch优化
在类似多条件选取其中一部分的情况下, switch比for, 或者多if结构高效很多.

优化前: 
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

优化后:
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

---

## 基于对象映射优化
建表, 以筛选条件可变部分作属性, 处理方案可变部分为值.

优化前:
```javascript
if (refresh === 'HAND') {
  this.$message.error(this.$t('M@EBE_NOT_EXIST')) // 没有相应凭证的信息!
  return false
} else if (refresh === 'LINE') {
  this.$message.error(this.$t('M@EBE_NOT_LINE')) // 没有凭证详细信息!
  return false
} else if (refresh === 'CLOSE') {
  this.$message.error(this.$t('M@EBE_CLOSE_INTERVAL')) // 会计期间已关闭，无法进行修改与删除操作！
  return false
} else if (refresh === 'EFFC') {
  this.$message.error(this.$t('M@EBE_NO_EFFC')) // 没有打开提议日期！
  return false
} else if (refresh === 'CHECKED') {
  this.$message.error(this.$t('M@EBE_CHECKED')) // 会计部门已审核的凭证，不能修改！
  return false
} else if (refresh === 'NOPREM') {
  this.$message.error(this.$t('M@EBE_NO_PREM')) // 您没有权限修改该凭证!
  return false
} else if (refresh === 'M') {
  this.$message.error(this.$t('M@EBE_M_S')) // 账户明细余额不足!
  return false
} else if (refresh === 'R') {
  this.$message.error(this.$t('M@EBE_DEL_NOEXIST')) // 要删除的账户明细信息不存在
  return false
} else if (refresh === 'B') {
  this.$message.error(this.$t('M@EBE_NO_DEL')) //  支付票据已经抵销不能删除
  return false
} else if (refresh === 'O') {
  this.$message.error(this.$t('M@EBE_NO_ARRIVE')) // 未达信息已经结束!
  return false
} else if (refresh === 'I') {
  this.$message.error(this.$t('M@EBE_CE_NOE')) // 预定差额明细信息不存在.
  return false
} else if (refresh === 'P') {
  this.$message.error(this.$t('M@EBE_NO_IMP')) // 不存在未到在库现况
  return false
} else if (refresh === 'L') {
  this.$message.error(this.$t('M@EBE_NO_MASTER')) // 不存在将要删除的待摊费用 MASTER的收回明细信息.
  return false
} else if (refresh === 'C') {
  this.$message.error(this.$t('M@EBE_NO_AGREE')) // 不允许待摊费用折旧取消过账
  return false
}
```

优化后:
```javascript
function ju (params) {
  const actions = {
    'LINE': 'M@EBE_NOT_EXIST',
    'CLOSE': 'M@EBE_NOT_LINE',
    'EFFC': 'M@EBE_CLOSE_INTERVAL',
    'CHECKED': 'M@EBE_NO_EFFC',
    'NOPREM': 'M@EBE_NO_PREM',
    'M': 'M@EBE_M_S',
    'R': 'M@EBE_DEL_NOEXIST',
    'B': 'M@EBE_NO_DEL',
    'O': 'M@EBE_NO_ARRIVE',
    'I': 'M@EBE_CE_NOE',
    'P': 'M@EBE_NO_IMP',
    'L': 'M@EBE_NO_MASTER',
    'C': 'M@EBE_NO_AGREE'
  }
  let code = actions[params]
  this.syMessageBox(code)
}
```
