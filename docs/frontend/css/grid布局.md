[[toc]]

参考资料：https://www.bilibili.com/video/BV1Bk4y197xm

## 一、Grid布局简介

从某种程度上说，grid布局是flex布局的升级版，主要用于**元素在平面上的布局**，例如我当前博客皮肤主页上每个随笔卡片的排布：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117143841375.png" alt="image-20211117143841375" style="zoom:50%;" />

bilibili首页上图片链接的排版：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117144048876.png" alt="image-20211117144048876" style="zoom:50%;" />

可以看出，grid布局往往用于在平面上排列元素，而且可以达到不错的效果。

这也是grid布局和flex布局的主要差异，即：

- flex布局一般用于**一个维度排布元素项**（item），例如横向或纵向一个方向排布
- grid布局主要用于**在整个平面上**（二维）对元素项进行排布，例如单子商城的各个商品项，文章管理系统的各个文章，使用grid布局可以达到非常好的浏览效果。

## 二、Grid布局的一些概念

和flex布局类似，grid布局也涉及**容器元素**和**子元素**，我们可能需要在两种元素内都设置相应的css属性才能得到希望的结果。

grid布局中的基本概念如下图所示：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117145236179.png" alt="image-20211117145236179" style="zoom: 33%;" />

要启用grid布局，和flex布局一样，只需要修改容器元素的`display`css属性为`grid`即可，如：

```css
.grid-container {
    display: grid;
}
```

## 三、 容器元素属性

### 1. grid-template-\*

#### 1.1 网格行和列的设置

首先是`grid-template-columns`，它可以用于设置当前排列元素有多少列以及每列的宽度，例如设置：

```css
.grid-container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    ...
}
```

这样设置代表排列元素为三列，每列的宽度为100px，效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117151113497.png" alt="image-20211117151113497" style="zoom: 60%;" />

同理，我们也可以设置排列元素的行数以及每一行的高度：

```css
.grid-container {
    ...
    grid-template-rows: 100px 100px 100px 100px;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117151234599.png" alt="image-20211117151234599" style="zoom:60%;" />

调试工具下的效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117151431048.png" alt="image-20211117151431048" style="zoom:60%;" />

#### 1.2 repeat的使用

像刚才那样设置元素的行列可能会遇到一种麻烦的情况，例如如果列数有10列，那么我们则需要写10次列的宽度，此时我们就可以使用`repeat`写法进行简化，即：

```css
.grid-container {
    grid-template-columns: repeat(3, 100px); /* => 100px 100px 100px */
}
```

第一个参数是数量，第二个参数是大小。

此外，`repeat`里的第一个参数也可以设置为`auto-fill`，这样子元素就会根据父元素的宽度大小进行自适应排列了，例如：

- 容器宽度为600px
    <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117152305766.png" alt="image-20211117152305766" style="zoom:60%;" />
- 容器宽度为400px
    <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117152505217.png" alt="image-20211117152505217" style="zoom:60%;" />

#### 1.3 使用fr

fr可以方便地表示比例关系，和flex布局中给子元素设置flex属性表示自己的占比类似。

例如在这里希望容器分成三列，并且每列等分容器的宽度，那么我们可以这样写：

```css
.grid-container {
    grid-template-columns: repeat(3, 1fr);
}
```

这代表着每行的每个元素都占据一份的**剩余空间**，因此可以实现三等分的效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117153130160.png" alt="image-20211117153130160" style="zoom:60%;" />

我们也可以自定义比例，例如：

```css
.grid-container {
    grid-template-columns: 1fr 2fr 3fr;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117153244609.png" alt="image-20211117153244609" style="zoom:60%;" />

可以看出，各列的宽度变成了`1:2:3`。

#### 1.4 auto关键字

例子如下：

```css
.grid-container {
    grid-template-columns: 100px auto 100px;
}
```

此时代表左右两列各占用100px宽度，而中间则自动填充满，这样既是我们前面使用flex布局所得到的三栏布局：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117153728665.png" alt="image-20211117153728665" style="zoom:60%;" />

### 2. row-gap, column-gap

显而易见，这两个属性都是用于设置子元素之间间距的大小的

- row-gap设置行间距
- column-gap设置列间距

例如设置行间距：

```css
.grid-container {
    ...
    row-gap: 20px;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117154511168.png" alt="image-20211117154511168" style="zoom:60%;" />

列间距是类似的，这里不赘述了。

此外还可以直接使用`gap`来简化两个间距的设置：

```css
.grid-container {
    ...
    gap: 20px;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117154715585.png" alt="image-20211117154715585" style="zoom:60%;" />

### 3. grid-auto-flow

这个属性主要用于设置元素是以行优先还是列优先进行排列的，默认为行优先，因此我们进行这样的修改：

```css
.grid-container {
    grid-auto-flow: column;
}
```

效果如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117155359205.png" alt="image-20211117155359205" style="zoom:60%;" />

**dense关键字**

例如一些这种情况：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117155659251.png" alt="image-20211117155659251" style="zoom:60%;" />

这里1号和2号元素的宽度都比较大，2号元素无法放在1号元素的右边，因此1号元素右边就出现了一个空位，而此时我们希望3号元素能够向上占据这个空位进行紧密的排列，此时我们就可以在`grid-auto-flow`属性后添加`dense`关键字：

```css
.grid-container {
    grid-auto-flow: row dense;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117155915580.png" alt="image-20211117155915580" style="zoom:60%;" />

可以看到，此时完成了我们紧密排列的需求。

### 4. items对齐

#### 4.1 justify-items

这个属性用于设置子元素元素在网格内的**水平方向**上的对齐。

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117160122917.png" alt="image-20211117160122917" style="zoom:50%;" />

这个属性即用于设置子元素在规定的网格中是以什么样的方式进行对齐的，具体效果如上图所示，其**默认值**为`stretch`（拉伸），这也就是为什么我们看到**子元素占满了各自的网格**。

#### 4.2 align-items

同理，这个属性用于设置子元素元素在网格内的**垂直方向**上的对齐，这里不展开了。

#### 4.3 place-items

这个属性是上面两个属性的简写，即：

```css
.grid-container {
	place-items: center center; /* => justify-items:center; align-items: center; */
}
```

### 5. content对齐

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117160835686.png" alt="image-20211117160835686" style="zoom: 50%;" />

这里的“整个内容区域”指的是前面红色概念图中的红色方框区域，**并不是值整个容器**，例如原来的例子中的content为下图**绿色边框**包围的最外围区域：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117161052008.png" alt="image-20211117161052008" style="zoom:60%;" />

因此，这个属性是用于**设置content关于整个容器的对齐关系**的。

因而我们可以设置整个部分垂直居中和水平居中：

```css
.grid-container {
    ...
    justify-content: center;
    align-content: center;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117161359160.png" alt="image-20211117161359160" style="zoom:60%;" />

其他的对齐方式和flex中展现的类似，在此不再赘述。

### 6. grid-auto-columns/grid-auto-rows

这两个属性分别用于设置多出来的项目的宽和高：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117161705490.png" alt="image-20211117161705490" style="zoom:50%;" />

### 7. 定义区域

使用方式如下案例所示：

```css
.grid-container {
    grid-template-areas:
        'a b b'
        'a c d'
        'a e f';
}
```

这里区域的命名可以是任意的英文单词，上面代码所对应的实际区域为：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117163224127.png" alt="image-20211117163224127" style="zoom:60%;" />

这里只是**定义区域**，在子元素属性上进行相应的设置可以使该子元素占据某个区域。

## 四、item（子元素）属性

### 1. grid-column，grid-row

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117162055153.png" alt="image-20211117162055153" style="zoom:50%;" />

简写：

```css
.item {
    grid-column: 1 / 3; 
    /* 
    =>	grid-column-start: 1;
    	grid-column-end: 3; 
    */
}
```

**另一种写法：使用span**

```css
.item {
    grid-column-start: span 2; 
}
```

代码的效果和上面相同。

### 2. grid-area

如上所述，使用这个属性可以使某个子元素占据在容器元素属性中定义的区域：

```css
.item-1 {
    grid-area: a;
}
```

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117163441382.png" alt="image-20211117163441382" style="zoom:60%;" />

可以看到，1号元素占据了a区域。

此外，`grid-area`还可以用于简写上面的item位置设置：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117163741721.png" alt="image-20211117163741721" style="zoom:50%;" />

### 3. 定义单个子元素在网格的对齐方式

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211117163910807.png" alt="image-20211117163910807" style="zoom:50%;" />