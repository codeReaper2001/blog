# JavaScript补充知识点和v-model的使用

[[toc]]
## 一、JavaScript补充知识点

### 1. ES6补充知识

#### 块级作用域

ES6之前都是使用`var`关键字来声明变量的，这样的变量没有块级作用域，也就是作用范围不被 `大括号` 所约束，例如：

```js
// var没有块级作用域,let有
{
  var name="123";
  console.log(name);
}
console.log(name);

//let有
{
  let name_new="123";
  console.log(name_new);
}
// console.log(name_new);// 会报错
```

#### 对象字面量增强写法

当对象的`key名`和`对应value的变量名`相同时，可以简写：

例如我们希望把这几个变量`set`到对象中：

```js
const name = "why"
const age = 18;
const height = 1.88
```

在`ES5`中我们会使用：

```js
// ES5
const obj = {
  name: name,
  age: age,
  height: height
}
```

而在`ES6`中我们可以这样简写：

```js
//ES6
const obj = {
  name,
  age,
  height
}
```

当我们希望填写成员函数时：

`ES5`中：

```js
const obj1={
  run: function(){
		...
  },
  eat: function(){
		...
  }
}
```

`ES6`中：

```js
const obj1={
  run(){
		...
  },
  eat(){
		...
  }
}
```

即可以省略 `function` 关键字。

### 2. JS高阶函数

学习了`Java`的`lambda`表达式后，可以知道高阶函数的三板斧即为 `filter`、`map`、`reduce`，现在我们来学习在`JavaScript`中高阶函数的使用。

在`JavaScript`中，这三个函数都是`Array`的成员函数，我们可以直接使用 `list.xxx` 的方式使用它们。

#### filter函数

在`filter`函数中我们需要提供一个带有一个参数，且返回值为`boolean`类型的回调函数，类似 `Java` 中的 `Predict` 型 `lambda` 表达式。

```js
// 1.filter
const nums = [10, 20, 111, 222, 40, 50];
// 1.filter函数的使用
// 为true时可以通过，false被过滤掉
let newNums = nums.filter(function (x) {
  return x < 100;
})
console.log(newNums);
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808143710029.png" alt="image-20210808143710029" style="zoom:80%;" />



#### map函数

`map` 函数需要一个带一个参数，一个返回值的回调函数，类似 `Java` 中的 `Function` 型 `lambda` 表达式。

```js
// 2.map
let new2Nums = newNums.map(function (x) {
  return x * 2;
})
console.log(new2Nums);
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808144214410.png" alt="image-20210808144214410" style="zoom:80%;" />

#### reduce函数

`map` 函数需要填入两个参数

①一个带两个参数，一个返回值的回调函数，类似 `Java` 中的 `BiFunction` 型 `lambda` 表达式。

②`preValue` 的初始值

```js
// 3.reduce 
res = new2Nums.reduce(function (preValue, n) {
  return preValue + n;
}, 0)
console.log("求和结果："+res);
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808144545014.png" alt="image-20210808144545014" style="zoom:80%;" />

#### 链式操作

```js
// 链式操作
res = nums.filter(function (x) {
  return x < 100;
}).map(function (x) {
  return x * 2;
}).reduce(function (preValue, x) {
  return preValue + x;
}, 0)
console.log("链式结果", res);
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808144900817.png" alt="image-20210808144900817" style="zoom:80%;" />



### 3. 箭头函数

对比普通函数和箭头函数：

```js
// 普通函数
const func1 = function () {
	...
}
// ES6箭头函数
const func = ()=>{
	...
}
```

主要的区别是箭头函数去掉了 `function` 关键字，并多了 `=>` 的箭头表达式，使人看代码感觉更加的直观。



#### 基本语法

```js
(参数列表)=> {
  函数体
}
```

#### 单个参数时的省略

当参数为单个时，可以省略参数列表的括号：

```js
const power = num => {
  return num*num;
}
```

#### 函数体为单行时的省略

当函数体为单行时，可以省略函数体的括号：

```js
const mul = (num1, num2)=> num1*num2;
```

这个语句其实不止省略了括号，同时省略了 `return` 语句的编写，即若返回值不为空且只有一句时，可以省略 `return` 语句。



## 二、v-model的使用

官网的解释：

> 你可以用 v-model 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件来更新数据，并在某种极端场景下进行一些特殊处理。

作用范围：`<input>`、`<textarea>` 及 `<select>` 元素

作用：创建`双向数据绑定`，当这些被作用的`DOM元素`上的值发生改变时，`js`变量的值也会随之发生改变。

本质：语法糖

### 1. 简单使用

```js
var app = new Vue({
  el: '#app',
  data: {
    message: "Hello World"
  }
});
```

```html
<div id="app">
  <input type="text" v-model="message">
  {{message}}
</div>
```

运行效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808150807636.png" alt="image-20210808150807636" style="zoom:80%;" />

当我们改变输入框的值时，例如修改为 `CodeReaper`：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808150859542.png" alt="image-20210808150859542" style="zoom:80%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808151042132.png" alt="image-20210808151042132" style="zoom:80%;" />

可以发现`message`变量的值也随之发生改变。

### 2. v-model原理

`v-model`的原理其实就是

1. 将`value`等`property` 和变量动态绑定在一起，即 `:value="xxx"`
2. 监听输入事件（即：`v-on:input="xxx()"`），然后将输入的信息更新到变量中，参考官方解释：

> `v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
>
> - text 和 textarea 元素使用 `value` property 和 `input` 事件；
> - checkbox 和 radio 使用 `checked` property 和 `change` 事件；
> - select 字段将 `value` 作为 prop 并将 `change` 作为事件。

`input`示例：

```js
var app = new Vue({
  el: '#app',
  data: {
    message: "hello world"
  },
  methods: {
    inputChange(event) {
      this.message = event.target.value;
    }
  }
});
```

```html
<div id="app">
  <input type="text" :value="message" v-on:input="inputChange">
  {{message}}
</div>
```

运行效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808151659288.png" alt="image-20210808151659288" style="zoom:80%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210808151719454.png" alt="image-20210808151719454" style="zoom:80%;" />

### 3. v-model结合radio的使用

```html
<div id="app">
  <label for="male">
    <input type="radio" id="male" value="男" v-model="gender"> 男
  </label>
  <label for="female">
    <input type="radio" id="female" value="女" v-model="gender"> 女
  </label>
  <h2>您选择的性别是：{{gender}}</h2>
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    gender: '男'
  }
});
```