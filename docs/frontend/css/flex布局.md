[[toc]]

参考资料：https://www.bilibili.com/video/BV1N54y1i7dG?p=4

## 一、Flex布局简介

### 1. Flex布局的主要作用

flex布局是flexible布局的缩写，字面意思就是**弹性布局**，它主要的作用是使用它可以非常方便地对html上的元素进行**水平排布**。

当flex布局还没有出现的时候，我们希望对网页元素进行水平布局往往是需要采用**浮动（float）**来实现的，但使用浮动会带来许多意想不到的问题：例如元素脱离标准流而造成**父盒子坍缩**，后面排列的元素需要使用`clear:both`等方式**消除浮动来避免前面浮动元素带来的影响**等等，此外浮动也**没有提供使水平排列的元素等分父盒子的功能**，程序员手动编写这样的功能费时费力，使我们编写页面过程中出现了许多不必要的麻烦。

### 2. Flex布局应用场景

和前面所说的一样，Flex布局就是为了开发人员能够更简单地进行元素的排版而生的，可以看到，很多大网站上水平排布元素的方式都由float实现改成了flex实现，因而学习flex布局是有益且必要的。

b站的主页：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116214040183.png" alt="image-20211116214040183" style="zoom:67%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116214113694.png" alt="image-20211116214113694" style="zoom:50%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116214132953.png" alt="image-20211116214132953" style="zoom:50%;" />

jetbrains官网：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116214317067.png" alt="image-20211116214317067" style="zoom:50%;" />

从这些大网站上可以看出flex布局已经应用到了非常多的页面之上，熟练掌握Flex布局应该是当前前端开发人员的必备技能之一。

## 二、Flex布局的使用

### 1. Flex布局的两种相关元素

Flex布局中，有两种相关的元素，一个是父元素（flex-container），即用于存放被放置元素的**容器**，例如上面b站和jetbrains官网上包围住所有小项目的父级元素；二是子元素（flex-item），即希望被有条理放置的**各个元素项**（通常是水平排列），即上面b站的每个选项和jetbrains官网上的各个介绍卡片。

因为布局的结果和父元素和子元素都相关，因此，我们需要分别对父元素和子元素分别进行设置才能得到想要的结果。

### 2. 父项属性

| 属性            | 作用                                                |
| --------------- | --------------------------------------------------- |
| flex- direction | 设置主轴的方向                                      |
| justify-content | 设置主轴上的子元素排列方式                          |
| flex-wrap       | 设置子元素是否换行                                  |
| align-content   | 设置侧轴上的子元素的排列方式(多行)                  |
| align-items     | 设置侧轴上的子元素排列方式(单行)                    |
| flex-flow       | 复合属性，相当于同时设置了flex-direction和flex-wrap |

#### 2.1 flex- direction

在flex布局中，是分为主轴和侧轴两个方向，同样的叫法有：行和列、x轴和y轴

- 默认**主轴**方向就是**x轴**方向，水平向右
- 默认**侧轴**方向就是**y轴**方向，水平向下

默认排列如下（从左到右）：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116220245325.png" alt="image-20211116220245325" style="zoom: 60%;" />

此时修改`flex-direction`属性为：

```css
.flex-container {
    display: flex;
    flex-direction: column; /*竖直排列*/
    ...
}
```

其作用是**修改主轴为y轴**，因此元素竖直排列，效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116220414047.png" alt="image-20211116220414047" style="zoom:60%;" />

`flex- direction`的所有取值和效果：

| 属性值         | 说明               |
| -------------- | ------------------ |
| row            | 从左到右（默认值） |
| column         | 从上到下           |
| row-reverse    | 从右到左           |
| column-reverse | 从下到上           |

#### 2.2 justify-content

作用是设置主轴上的元素排列，具体效果如下：

| 常用属性值    | 说明                         | 效果                                                         |
| ------------- | ---------------------------- | ------------------------------------------------------------ |
| flex-start    | 从轴的头部开始排列（默认值） | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116221728447.png" alt="image-20211116221728447" style="zoom:50%;" /> |
| flex-end      | 从轴的尾部开始排列           | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116221751321.png" alt="image-20211116221751321" style="zoom:50%;" /> |
| center        | 在主轴居中对齐               | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116221819658.png" alt="image-20211116221819658" style="zoom:50%;" /> |
| space-around  | 平分剩余空间                 | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116221844896.png" alt="image-20211116221844896" style="zoom:50%;" /> |
| space-between | 先两边贴边，再平分剩余空间   | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116222127751.png" alt="image-20211116222127751" style="zoom: 50%;" /> |
| space-evenly  | 距离相等                     | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116221917472.png" alt="image-20211116221917472" style="zoom:50%;" /> |

#### 2.3 flex-wrap

可以发现，如果上面的元素如果再增加一个，绿色的容器的第一行就无法再装下了，但事实是怎样呢？

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116223009060.png" alt="image-20211116223009060" style="zoom:60%;" />

可以发现，加入这个元素之后，这个元素并没有放置在下一行，而是**挤在了第一行**，此外**所有元素的宽度都被压缩**了。

原因：默认情况下，item都排在一条线( 轴线) 上。flex-wrap属性定义 , flex布局中**默认是不换行的**（`flex-wrap`默认值为`no-wrap`）。

当排不下需要换行时，设置`flex-wrap: wrap`即可：

```css
.flex-container {
    flex-wrap: wrap;
    ...
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116223717094.png" alt="image-20211116223717094" style="zoom:60%;" />

#### 2.4 align-items

作用：设置**侧轴上**子元素的排列方式（单行）

| 属性值     | 说明                       | 效果                                                         |
| ---------- | -------------------------- | ------------------------------------------------------------ |
| flex-start | 从上到下（默认值）         | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116224309161.png" alt="image-20211116224309161" style="zoom:50%;" /> |
| flex-end   | 从下到上                   | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116224342988.png" alt="image-20211116224342988" style="zoom:50%;" /> |
| center     | 挤到一起居中（垂直居中）   | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116224404149.png" alt="image-20211116224404149" style="zoom:50%;" /> |
| stretch    | 拉伸（子元素不能设置高度） | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116224536795.png" alt="image-20211116224536795" style="zoom:50%;" /> |

#### 2.5 align-content

和`align-items`的作用非常类似，都是用于设置**侧轴上**子元素的排列方式，但`align-content`是用于设置多行子元素的排列（单行元素无效），并且还有侧轴两边贴边等的效果。

| 属性值        | 说明                         | 效果                                                         |
| ------------- | ---------------------------- | ------------------------------------------------------------ |
| center        | 多行元素居中                 | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116231843242.png" alt="image-20211116231843242" style="zoom:50%;" /> |
| space-around  | 平分剩余空间                 | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116231935399.png" alt="image-20211116231935399" style="zoom:50%;" /> |
| space-between | 先上下行贴边，再平分剩余空间 | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116231959612.png" alt="image-20211116231959612" style="zoom:50%;" /> |

#### 2.6 flex-flow

可以一次设置`flex-direction`和`flex-wrap`两个属性，如：

```css
.flex-container {
    flex-flow: wrap column;
}
```

### 3. 子项属性

| 属性名     | 作用                             |
| ---------- | -------------------------------- |
| flex       | 子项目占的份数                   |
| align-self | 控制子项自己在侧轴的排列方式     |
| order      | 属性定义子项的排列顺序(前后顺序) |

#### 3.1 flex

flex属性定义子项目**分配剩余空间**，用flex来表示**占多少份数**。

语法：

```css
.item {
    flex: <number>;
}
```

案例：模拟京东商城的搜索栏，即左右两个部分的宽度固定，而中间的宽度自适应。

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116233638692.png" alt="image-20211116233638692" style="zoom: 67%;" />

```html
<div class="flex-container">
    <div></div>
    <div></div>
    <div></div>
</div>
```

```css
.flex-container {
    ...
    display: flex;
}
.flex-container > div:nth-child(1) {
    width: 100px;
    height: 100%;
    background-color: plum;
}
.flex-container > div:nth-child(2) {
    background-color: salmon;
    flex: 1; /*这里取了全部的剩余空间*/
}
.flex-container > div:nth-child(3) {
    width: 100px;
    height: 100%;
    background-color: #6ad281;
}
```

效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116233902623.png" alt="image-20211116233902623" style="zoom:60%;" />

因为div1和div3分别占用了100px的宽度，而div2使用flex占据剩余空间，因此div2就占据了中间所有的空间。

此时改变页面的宽度，可以发现**中间部分会自适应变化**，而两边宽度不变。可见，使用flex布局非常容易就可以实现圣杯布局的核心部分。

因为flex可以按比例分，因此我们可以摆脱使用百分比分配的困扰：

```css
.flex-container > div:nth-child(1) {
    flex: 1;
    background-color: plum;
}
.flex-container > div:nth-child(2) {
    flex: 1;
    background-color: salmon;
}
.flex-container > div:nth-child(3) {
    flex: 2;
    background-color: #6ad281;
}
```

效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116234458904.png" alt="image-20211116234458904" style="zoom:60%;" />

可以看到紫色和橙色各占用一份空间，而绿色占用了两份的空间。

#### 3.2 align-self

作用：改变单个元素在侧轴上的排列。

初始效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116235116280.png" alt="image-20211116235116280" style="zoom:60%;" />

添加：

```css
.flex-container > div:last-child {
    align-self: flex-end;
}
```

效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116235205967.png" alt="image-20211116235205967" style="zoom:60%;" />

#### 3.3 order

子元素的order值都默认是0，设置的order值越小，就排列在flex容器的越前面的位置。

初始：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116235408408.png" alt="image-20211116235408408" style="zoom:60%;" />

修改：

```css
.flex-container > div:nth-child(3) {
    order: -1;
}
```

效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211116235545456.png" alt="image-20211116235545456" style="zoom:60%;" />