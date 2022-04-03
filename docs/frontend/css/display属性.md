[[toc]]

参考资料：https://www.bilibili.com/video/BV18J411S7tZ?p=5

## 一、display属性概述

根据CSS规范的规定，每一个网页元素都有一个display属性，用于确定该元素的类型，每一个元素都有默认的display属性值，比如div元素，它的默认display属性值为“block" ，称为**块元素**，而span元素的默认display属性值为“inline”，称为**行内元素**。

### 1. 块级元素和行内元素的区别

两种元素的最大区别在于块级元素是独占一行的，例如排列两个div，那么后面的div必然排列在第一个div的下面；而行内元素则是可以在同一行里排列多个。此外块级元素还可以设定对应的宽高值，而行内元素一般需要里面的内容来决定元素的具体大小。

### 2.常见的块级元素和行内元素

常见的块级元素和行内元素如下表所示：

| 元素类型 | html元素                                         |
| -------- | ------------------------------------------------ |
| 块元素   | div、h1\~h6、hr、ol、ul、li、p、table、tr        |
| 行内元素 | a、span、br、img、input、label、select、textarea |

> 参考资料：https://www.jianshu.com/p/800e6bb26590

### 3. display属性常见的属性值

各属性值和对应的效果如下所示：

| 属性值       | 效果                                                 |
| ------------ | ---------------------------------------------------- |
| none         | 隐藏对象，相当于元素被移除，不占据物理空间           |
| inline       | 指定对象为行内元素，无法设置宽高，且一行可以放置多个 |
| block        | 指定对象为块级元素，可设置宽高，且独占一行           |
| inline-block | 指定对象为行内块元素，可设置宽高，且一行可以放置多个 |
| table-cell   | 指定对象为表格单元格，一行可以放置多个，类似flex布局 |
| flex         | 弹性盒                                               |

## 二、测试display取各属性值的效果

### 1. 测试inline和block

测试代码：

```html
<div>块状元素</div>
<span>行内元素</span>
```

```css
div, span {
    height: 200px;
    width: 200px;
}
div {
    background-color: #df637a;
}
span {
    background-color: #72d0f6;
}
```

当前效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211106174832623.png" alt="image-20211106174832623" style="zoom: 50%;" />

可以看到，虽然两个元素都设置了高度和宽度，但只有块元素div拥有了对应的大小，而span的大小仅有内容决定。

此时我们可以翻转两者的属性，看下操作后的效果：

```css
div {
    ...
    display: inline;
}
span {
    ...
    display: block;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211106175043735.png" alt="image-20211106175043735" style="zoom:50%;" />

可以看到，此时反而是span元素拥有了对应的宽高，而div元素反而变成了行内元素了。因此我们可以通过设置display属性来设置元素的类型。

### 2. inline-block属性值

此时修改div和span都为行内块，即：

```css
div {
    ...
    display: inline-block;
}
span {
    ...
    display: inline-block;
}
```

效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211106175322760.png" alt="image-20211106175322760" style="zoom:50%;" />

此时可以发现两者都拥有了对应的宽高，并且可以在同一行中排列了，即行内块元素同时拥有了【设置宽高和同行排列】的特性。

### 3. table-cell属性值

修改代码为：

```html
<div>块状元素</div>
<div>块状元素</div>
<div>块状元素</div>
<div>块状元素</div>
<div>块状元素</div>
<span>行内元素</span>
```

```css
div, span {
    height: 200px;
    width: 200px;
}
div {
    background-color: #df637a;
    display: table-cell;
}
span {
    background-color: #72d0f6;
}
```

效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211106175729043.png" alt="image-20211106175729043" style="zoom:50%;" />

可以发现此时五个div排列在了同一行，而且span元素需要排列在这5个div的下面，因此我们有时也可以通过修改块状元素的display属性为table-cell来实现元素的水平排列。

### 4. none属性值

代码如下：

```html
<div>块状元素</div>
<span>行内元素</span>
```

```css
div, span {
    height: 200px;
    width: 200px;
}
div {
    background-color: #df637a;
    display: none;
}
span {
    background-color: #72d0f6;
}
```

效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211106180014463.png" alt="image-20211106180014463" style="zoom:50%;" />

可以看到div元素被隐藏了，此外它所应该占据的物理空间也没有了，这里可以对比`visibility: hidden`：

```css
div {
    ...
    visibility: hidden;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211106180148595.png" alt="image-20211106180148595" style="zoom:50%;" />

可以看到，使用`visibility: hidden`也是隐藏元素，但可以理解为元素只是变得透明了，它还是在那里的，因而物理空间也仍然被元素占据着，因此span元素上有着div元素的空间。