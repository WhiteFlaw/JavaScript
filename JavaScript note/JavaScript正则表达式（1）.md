## 正则表达式基础
# 一、正则表达式的解读
## 1.正则表达式的概念和作用
这里我不引用官方的叙述了，你大体可以把他理解为一种选择器，像是CSS里的那种，就是丑了亿点，选择的东西也不是HTML标签而是JavaScript里的字符。
在JS里的字符串中检索内容可以用“index of()”和正则表达式（regular expression，具有规律的表达方式），但是前者受制于只能检索“写死了”的字符这一弊端，泛用性上比正则表达式略逊一筹。总之正则表达式是为了检索字符串中指定的字符（子串）而存在。

## 2.正则表达式里的符号
我觉得这些符号我就不必罗列，到处都可以查到。包含修饰符、括号、元字符和量词，其他的我们这章暂且不说。
我还是要说说那些看不大明白的用法，可能不全，毕竟是第一期~

1. “\w”匹配任意一个字母数字下划线。
2. 匹配为从左向右匹配。
4. 修饰符(模式修饰符，改变表达式的运行方式)可以组合使用，直接接着写即可。
5. 在表达式里加“+”是选择全部具该特征的字符（不加就只选出最先检索到的一个），以数组形式逐个输出，所以可以直接在正则后加[n];
6. 特殊字符写在[]内会被当成普通字符来匹配。
7. 小括号内的数据如果加上“|”，则被分割在一起的数据成为一组，必须这一组完全匹配才能被选出。
8. [0-3]，表示这一个位置上的字符只能是0到3这四个数字之一
9. [^ 0 - 3]表示这一个位置上的字符只能是除了0到3之外的所有字符;
10. 小括号内被竖线分割的各个数据，每个都是独立的
11. ()本身不匹配任何东西，也不限制匹配任何东西，只是把括号内的内容作为同一个表达式来处理，例如(ab){1,3}，就表示ab一起连续出现最少1次，最多3次。
12. "正则表达式{限制数字位数从 ， 限制数字位数至}"，比如整段从左至右选取3到6位，限制为a到z(/^[a-z]{3,6}$/)，选取三位的数字-选取7-8位的数字为(/\d{3}-\d{7,8}/g)此处不懂请先看后面。
13. 方括号[]括起来的字符可以表示范围，从什么到什么。方括号内连续的字符受到匹配时只会有最先匹配到的一个被匹配出来，基本等同于小括号内被竖线分割的各个数据，每个都是独立的;`var reg = /[qw643423]/`//匹配qw64qw64仅输出q
14. "\s"本身可以表示空格，"\S"本身表示“除空白字符外”，两者一旦被中括号扩在一起仍表示范围，那么就是“空白的”至“不是空白的”都选，等同于全选，\d同;`[\s\S]`
15. \d或\d等在使用时如果因为添加了左斜杠被判定为转义符，就再在左侧加一个左斜杠即"\\d"以保证打印出的是\d，这样才能执行出正常结果。
16. 更精确选择：在需要精确到某个字符的匹配时将这个字符用中括号囊括形成原子表（这个下面的栗子有），里面的字符如果在外面检索到了就会输出这个字符，中括号内可以写不止一个字符，如果去掉中括号直接写字符则是要完整匹配到所有这些字符才算是检索到。
17. 在后面加修饰符u表示按照UTF-8的语言类型来匹配，针对汉字等多字节，可以让表达式正确识别宽字节字符，防止匹配结果为乱码;`var reg = /\p{sc=Han}/gu`
18. 在需要获取被选中字符的一系列属性时不能使用g修饰符，其会直接拿数组输出导致无法获取目标字符的各种属性，使用“正则.exec(xxx)”或者正则g.exec(xxx)（后者由于lastIndex属性的存在会自左逐个字符的检索（注意不是自动检索，每打印一次才会进入下一次检索），每完成一次lastIndex的值+1（由0开始）,据此可以利用循环语句来遍历打印所有的字符和他们各自的属性。
19. 在\d前加“^”为限定字符串开始处必须为数字(可为其他，替换\d即可),在其后加“$”表示结尾处必须为数字，要是没有元字符和量词则为“全段都限制这两个条件”可以用在限制用户名格式等。


以上如果有不明白的继续看完本篇再返回看即可。
# 二、正则表达式的书写
## 1.基本的工作原理和格式
一个完整的正则表达式由两种字符构成——元字符（特殊字符）和 文字（普通文本字符），这些元字符相当于网站的HTML部分，他们构成了正则表达式强大的描述和选择能力。正则表达式里直接连在一起的各种特殊符号也大大降低了正则表达式的可读性——我们难以分清表达式中的各个部分。在这里先说下各个符号的意义，至少我们要先分得出式子中的各个部分。
这里要注意的是正则表达式是包括在正则对象里的。
首先创建一个正则对象有两种方法：

```javascript
   //对象创建的第一种
   let reg = new RegExp("匹配甚麽样的字符（可以直接写要找的字符）", "使用的查找模式即修饰符"); 
   栗子：
   let reg1 = new RegExp("u","g")  //全段单查个u
   let reg2 = new RegExp("ghq","g")  //检索全部的g、h、q
   let reg3 = new RegExp("/\d+/","g")  //查全段所有数字
   //JS里，正则表达式的对象被称作“RegExp对象”，RegExp也是正则表达式的缩写，注意与全局对象RegExp区分。;
   
   //字面量创建的第二种：纯文本格式
   let reg = /匹配甚麽样的字符（可以直接写要找的字符）/使用的查找模式即修饰符
   栗子：
   let reg1 = /u/g;  //全段单查个u
   let reg2 = /\d+/g;    //查全段所有数字
   //缺点是你不能在斜杠里写变量，那会被直接解析成一个单纯的字符。
```
当时写完这么一段我拿着一个字符串依旧还是一头的雾水，没法用啊，我觉得我要是直接把这字符串copy到里面去....那也太lowb了。

后来我差不多明白了点事情，就是RegExp对象被创建之后是为了使用RegExp对象的3个方法，这三个方法相当于做了“正则对象”这个“参数”的函数，三个方法分别是：

```javascript
    //母串是比子串更长的字符串；
    正则对象.test(母串);\\依据正则对象里规定的检索方法和范围去母串里检索，返回布尔值
    正则对象.exec(母串);\\依据正则对象里规定的检索方法和范围去母串里检索，返回被找到的字符
    正则对象.compile(子串);\\等待后期补充，貌似是可以改变正则对象原本规定的检索方法？
```
这么一套下来就可以去检索字符母串了。

不过最近发现一个新的方法：

```javascript
    母串.match(正则对象);
    //貌似填写顺序和RegExp对象的三个方法正好反着...
```

## 2.依检索需求书写正则表达式
上面说了正则对象的用法，但是正则对象里面还是要放正则表达式来限定检查规则的，在这一部分中我会阐述利用各个元字符和各种括号的属性来组合正则表达式的基本规则，然后写关于“正则表达式里的符号”这个部分里一些不好理解的语句的栗子。

1. 各个修饰符可以混用，直接在后面接着写就行。
(就不要用学数学写算式那种模式来，粗暴一点也不要什么连接符之类的就直接把需要的检索条件堆在一起就好了......)
```javascript
/\d+/gi;  //两个修饰符连在一起
```

2. 关于小数和固定的字符的检索。这里比如我要检索一个邮箱。
（像@这种没有特殊意义的字符是可以直接写出来的，原理等同于你直接在本该写正则的地方写了个字母，但是小数点有特殊含义，我们需要用转义符来取消掉小数点的特殊含义，也就是在它前面加个“\”）
```javascript
邮箱为8888855855565@qq.com
//我们把它分成5个部分：全数字、@、字符qq、点、字符com
// \w+ 、 @ 、 \w+ 、\. 、\w+
    var reg = /^\w +@\w +\.\w + $ /;
```
3. 把检索出的字符分配至变量
没什么好说的...
```javascript
    [number, type] = 检索出的值.split(",");
```
4. 限制整个字符串字符种类

```javascript
    var reg = /^ [a - z]{ 3, 6 } $ /;
```
5. 小括号内字符加竖线被判定为一组

```javascript
var reg = /(236|efc|fer4)/;
var cho = "gr236gt";
console.log(reg.test(cho));//返回236
```

# 总结
首篇我会由基础开始，开始可能会出一些错误，如果我在以后发现它们，我会在文章中同步更正，还望大家多包涵，如果大家发现错误，也欢迎私信指正我...

以上是我据本阶段的学习得出的一些经验与心得，如果帮到了您，在下十分荣幸；若是您发现了我的不足，恳请您指点。
