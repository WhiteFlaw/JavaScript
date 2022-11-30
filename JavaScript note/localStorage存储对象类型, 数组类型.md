# localStorage存储对象类型, 数组类型
在用VueX处理报表的数据时发现这张报表存在页面关闭后数据滞留的问题.
照常理来说vuex中的数据会在该页面关闭后销毁.

现在希望将页面初始状态下干净的vuex存储下来, 即 将整个state存储到本地.
因为有关闭页面仍旧保存这个干净状态的需求, 所以没有采用sessionStorage, 操作完得记得清理一下localStorage.

但是对象类型直接向localStorage中存储会得到字符串`[Object Object]`, 所以先JSON化一下对象再向localStorage中存储:
```javascript
const rawState201 = JSON.stringify(copy);
localStorage.setItem('rawState', rawState201);
```

获取的时候自然也会获取JSON格式, 那么将JSON反过来解析回对象即可:
```javascript
copy = JSON.parse(localStorage.getItem('rawState201'));
```

然后销毁存储:
```javascript
localStorage.removeItem('rawState201');
```
