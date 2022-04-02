# 定位属性position

[[toc]]

参考资料：https://www.bilibili.com/video/BV18J411S7tZ?p=4

## 一、定位属性简介

position属性是用于指定一个元素的定位方法类型的属性，它的取值有：static（默认类型）、relative、absolute、fixed。当position属性的值不为`static`（即**不为默认**）时，我们可以添加：`top`、`bottom`、`left`和`right`属性对当前元素进行具体的定位，并且可以使用`z-index`来设置层级的上下关系。

## 二、各属性值的具体功能

### 1. relative

首先先搭建出测试框架：

```html
<div id="box1"></div>
<div id="box2"></div>
<div id="box3"></div>
```

对应的css：

```css
div {
    width: 200px;
    height: 200px;
}
#box1 {
    background: #df637a;
}
#box2 {
    background: #6ad281;
}
#box3 {
    background: #72d0f6;
}
```

当前的效果为：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104131424478.png" alt="image-20211104131424478" style="zoom:33%;" />



此时我们将`#box2`（绿色div）的`position`值改为relative，并为其设置`top`和`left`属性：

```css
#box2 {
    ...
    position: relative;
    top: 200px;
    left: 200px;
}
```

此时的效果为：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104131643320.png" alt="image-20211104131643320" style="zoom: 33%;" />

可以发现，当定位属性值为relative时，元素发生偏移的**参考点**为该元素自身。此外虽然元素移动到了新的位置，但是元素**仍然会占有原有的位置**，这也是为什么蓝色div没有排到上面。

### 2. absolute

我们的测试框架仍与上面相同，初始的效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104131424478.png" alt="image-20211104131424478" style="zoom:33%;" />

此时为`#box2`开启绝对定位（`position: absolute`）：

```css
#box2 {
    background: #6ad281;
    /*使用绝对定位*/
    position: absolute;
}
```

效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104132430860.png" alt="image-20211104132430860" style="zoom:33%;" />

可以发现蓝色div不见了，此时检查元素：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104132507744.png" alt="image-20211104132507744" style="zoom:33%;" />

可以发现原来蓝色方块还在，只是放置到了绿色方块的下面。这是因为当元素启用绝对定位是，该元素就和浮动类似，**不会占用原有的空间了**，因此后面蓝色的方块就会排列在了红色方块的下面。

此时我们再设置对应的偏移：

```css
#box2 {
    ...
    /*移动元素位置*/
    top: 200px;
    left: 200px;
}
```

效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104132933949.png" alt="image-20211104132933949" style="zoom:50%;" />

可以发现此时绿色方块偏移的**参照点为浏览器的（0,0）点**，也可以理解为body元素的最左上角。

但absolute定位并不是什么情况下参照点都为浏览器的（0,0）点的，先编写以下场景：

```html
<div id="box1"></div>
<div id="box2">
    <div id="father">
        <div id="son"></div>
    </div>
</div>
<div id="box3"></div>
```

添加css：

```css
#box2 {
    width: 300px;
    height: 300px;
    background: #6ad281;
}
#father {
    width: 200px;
    height: 200px;
    background-color: plum;
}
#son {
    width: 100px;
    height: 100px;
    background-color: pink;
}
```

当前效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104133324796.png" alt="image-20211104133324796" style="zoom:50%;" />

此时为son添加absolute定位，并且设置一定的偏移量：

```css
#son {
    width: 100px;
    height: 100px;
    background-color: pink;
    position: absolute;
    top: 100px;
    left: 100px;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104133526614.png" alt="image-20211104133526614" style="zoom:50%;" />

显然，它当前的参照点还是浏览器页面的（0,0）点。

此时为`#father`元素也添加一个定位（除了`static`的定位都可以）：

```css
#father {
    ...
    position: relative;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104133749935.png" alt="image-20211104133749935" style="zoom:50%;" />

此时可以发现`#son`元素的参考点变成`#father`元素了。

因此，当使用absolute定位时，元素的参考点为：该元素向外层寻找**最近的有添加定位的父级元素**：

1. 找到了则参考点为该父级元素的左上角
2. 否则参考点设置为body元素的左上角（即浏览器页面的(0,0)点）。

### 3. fixed

当设置了fixed后元素将固定在窗口的一个位置，即相对整个窗口的位置不再发生变化。

具体例子：

```html
<div id="big">
    <div id="left-bar">侧边条</div>
</div>
```

```css
#big {
    height: 2000px;
    background-color: pink;
}
#left-bar {
    height: 300px;
    width: 100px;
    background-color: plum;

    position: fixed;
    top: 200px;
    right: 0;
}
```

测试效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211104134537524.png" alt="image-20211104134537524" style="zoom:50%;" />

此时无论如何拖动页面，这个侧边条依然会保持在窗口的左边不动，因此使用这个定位可以制作悬停效果。

## 三、三种定位属性的效果总结

| 定位属性值 | 效果                                                         |
| ---------- | ------------------------------------------------------------ |
| relative   | 元素发生偏移的**参考点**为该元素自身，虽然元素发生了移动，但是元素**仍然会占有原有的物理位置** |
| absolute   | 元素不会占用原有的物理空间，且偏移参考点为最近的有添加定位的父级元素，如果找不到则为body元素（即浏览器(0,0)点） |
| fixed      | 元素将固定在窗口的一个位置，即相对整个窗口的位置不再发生变化 |

> tips：只有添加了定位的元素中，top、bottom、left、right和z-index这些定位属性才会生效。