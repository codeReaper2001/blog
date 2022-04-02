# 点阵LED的使用

[[toc]]

参考资料：[https://www.bilibili.com/video/BV1Mb411e7re?p=21](https://www.bilibili.com/video/BV1Mb411e7re?p=21)

## 一、点阵LED的理论知识

### 1. 点阵屏的打开方式

默认情况下我的点阵屏是**无法直接使用的**，即使用了正确的代码也**无法点亮点阵屏**，此时我们需要先将点阵附近的跳线帽拔掉或移动到左边才能打开点阵屏：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823105657070.png" alt="image-20210823105657070" style="zoom:80%;" />

### 2. LED点阵简介

- LED点阵屏由若干个独立的LED组成，LED以矩阵的形式排列，以灯珠亮灭来显示文字、图片、视频等。LED点阵屏广泛应用于各种公共场合，如**汽车报站器**、**广告屏**以及**公告牌**等
- LED点阵屏分类
    - 按颜色：单色、双色、全彩
    - 按像素：8 \* 8（**开发板上的点阵**）、16 \* 16等(大规模的LED点阵通常由很多个小点阵拼接而成)

### 3. 点阵LED的结构和操作方式

示意图：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823112235474.png" alt="image-20210823112235474" style="zoom: 67%;" />

1. LED点阵屏的结构类似于数码管，只不过是数码管把每一列的像素以“8”字型排列而已
2. LED点阵屏与数码管一样，有**共阴**和**共阳**`两种接法`，不同的接法对应的电路结构不同
3. LED点阵屏需要进行**逐行或逐列扫描**，才能使**所有LED同时显示**

例如我们当前希望左上到右下的对角线的LED灯亮，而其他的灯都不亮，可以按照如下方式运行：

1. 第一行置一，其他行都置零，同时第一列置零，其他列都置一
    即：

|      |  置一  |  置零  |
| :--: | :----: | :----: |
|  行  | 第1行  | 其他行 |
|  列  | 其他列 | 第1列  |

  

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823112834830.png" alt="image-20210823112834830" style="zoom:80%;" />

2. 以上的操作是第一个周期的操作，然后第二个周期则和第一个周期基本相同，只是切换了置一和置零的行和列而已，后面往复进行即可

|      |  置一  |  置零  |
| :--: | :----: | :----: |
|  行  | 第2行  | 其他行 |
|  列  | 其他列 | 第2列  |

通过类似这种的**行扫描**或**列扫描**操作，我们即可使我们希望的LED**同时发光**了。

通俗地说就是：先使一行正常显示，再使下一行正常显示，只要速度够快，就能看到LED同时显示的情景了。

对应到厂商提供的原理图：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823114229627.png" alt="image-20210823114229627" style="zoom: 50%;" />

`P00~P07`用于控制列，而`DPa~DPh`用于控制行。

### 4. 74HC595模块

为什么我们会需要了解这个模块的相关内容呢，我们先仔细观察一下原理图：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823115259390.png" alt="image-20210823115259390" style="zoom: 50%;" />

可以发现这里的**8个输出对应着LED点阵的8个行输入**，而且这个模块是**只有3个输入端的**，这说明了我们可以通过使用这个模块，使用**3个输入**即可**得到LED点阵的8个行输入**了。

此外，这个图中还包括了`OE`引脚，可以看到它的上面有着一个横杠，根据b站老师的说法，这样的写法表示该模块在低电平时有效，所以我们要使用这个模块之前需要将`OE`与`GND`相连，这也就是为什么我们**需要先把跳线帽移动到左侧**才能使用LED点阵模块。

#### PPT上的简介

74HC595是**串行输入并行输出**的**移位寄存器**，可用**3根线输入串行数据**，**8根线输出并行数据**，多片级联后，可输出16位、24位、32位等，常用于IO口扩展。

#### 串行转并行的工作原理

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823120251996.png" alt="image-20210823120251996" style="zoom: 67%;" />

1. 首先先设置`SER`的值
2. 使用时钟发送一个上升信号，即给`SERCLK`置一，则全部数据向下移动一位，`SER`中的数据被写入到最上面
3. 给`SERCLK`置零
4. 是否够8位数据？否：转1；是：转5
5. `RCLK`置一，左边的数据搬运到右边，8个信号同时输出，然后`RCLK`置零

**级联操作**
如果需要更多的位数输出，我们可以将`QH'`接到下一个模块的`SER`，这样即可完成不断扩展。



## 二、编码实现

### 1. C51中的sfr和sbit【补充知识】

- sfr (special function register) :  特殊功能**寄存器声明**
    例:`sfr P0=0x80;`
    声明P0口寄存器，**物理地址**为`0x80`
- sbit (special bit) : 特殊**位声明**
    例: `sbit P0_1 = 0x81;`或`sbit P0_1 = P0^1;`
    声明**P0寄存器的第1位**
- 可位寻址/不可位寻址:
    在单片机系统中，**操作任意寄存器或者某一位的数据时**，必须**给出其物理地址**，又因为一个寄存器里有8位，所以**位的数量是寄存器数量的8倍**，单片机无法对所有位进行编码，故**每8个寄存器中，只有一个是可以位寻址的**。对不可位寻址的寄存器，若要只操作其中一位而不影响其它位时，可用`&=`、 `|=`、`^=`的方法进行**位操作**

> tips：在使用寄存器中的某一位时，我们往往使用类似`sbit LED = P2^0;`的写法获取到某一位，但这种在声明中使用到的'^'符号并不表示异或，而是进行取位。



### 2. 编写74HC595的驱动程序

首先定义出三个需要使用的`寄存器位`：

```c
sbit RCK = P3 ^ 5;
sbit SRCLK = P3 ^ 6;
sbit SER = P3 ^ 4;
```

其中`RCK`即为原理图中的`RCLK`，但由于和库中的变量重名了，故改为`RCK`。

然后我们需要编写74HC595模块的驱动程序：

```c
void _74HC595_WriteByte(unsigned char Byte) {
    unsigned char i = 0;
    // i为计数变量，重复执行8次
    for (i = 0; i < 8; i++) {
        // 每次取第i位（从左到右），写入到SER中
        SER = Byte & (0x80 >> i);
        // SRCLK置一，使寄存器进行移位
        SRCLK = 1;
        SRCLK = 0;
    }
    // 将八位输入到LED的8个行输入中
    RCK = 1;
    RCK = 0;
}
```

即输入一个byte（八位）的数据，可以**并行地**输入到点阵LED的**8个行输入**中。

### 3. 编写控制单列亮灯的程序

代码如下：

```c
void MatrixLED_ShowColumn(unsigned char column, unsigned char Data) {
    _74HC595_WriteByte(Data);
    // 对某列进行使能，列数为0~7
    P0=~(0x80>>column);
}
```

我们先将数据写入到点阵LED的左侧输入中，然后对某列进行使能，具体的操作为使`P0`寄存器的某位置零，而其他位置一，因此我们可以将`0x80`先右移`column`位，然后取反，我们即可得到第`column`位为`0`的数据，接着赋值进去即可。

写个简单的程序进行测试：

```cpp
void main(void) {
    SRCLK = 0;
    RCK = 0;
    _74HC595_WriteByte(0xF0);
    while (1) {
        MatrixLED_ShowColumn(0,0xAA);
    }
}
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823175712713.png" alt="image-20210823175712713" style="zoom: 50%;" />

可以看到，第0列的LED灯按照0xAA【1010 1010】进行显示了！

### 4. 控制多列同时发光

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823181327798.png" alt="image-20210823181327798" style="zoom:80%;" />

首先我们先讨论一下消影的操作，当我们如果不进行消影时，**段选的数据就会先写入到上一次的选择的位置中**（在这里是指上一列），因此就会发现**新列中的数据在上一列也显示了出来**。

因此我们需要在每个周期的末尾加上**延时**和**位清零**的操作：

```cpp
void MatrixLED_ShowColumn(unsigned char column, unsigned char Data) {
    // 段选
    _74HC595_WriteByte(Data);
    // 位选
    P0 = ~(0x80 >> column);
    // 延时
    deley(50);
    // 位清零
    P0 = 0xFF;
}
```

这样我们可以先将希望展示的数据写入到数组中（8个byte数据，代表每列希望展示的数据），然后通过循环列扫描的方式展示出来：

```cpp
void main(void) {
    unsigned char i;
    unsigned char Data[] = {0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01};
    SRCLK = 0;
    RCK = 0;
    while (1) {
        for (i = 0; i < 8; i++) {
            MatrixLED_ShowColumn(i, Data[i]);
        }
    }
}
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823182433693.png" alt="image-20210823182433693" style="zoom: 67%;" />

可以看到在运行结果中第3列灯【从3开始数】没法点亮，估计是开发板是个次品，第三列的灯都没法点亮，现在才发现QAQ。。。

**显示心形**

先设计一个心形：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823183537133.png" alt="image-20210823183537133" style="zoom:80%;" />

然后根据每列的数据，写入到数组中：

```c
unsigned char Data[] = {0x18, 0x3c, 0x7e, 0x3f, 0x3f, 0x7e, 0x3c, 0x18};
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823183711031.png" alt="image-20210823183711031" style="zoom:80%;" />

### 5. 封装成模块

```cpp
// MatrixLED.c
#include "MatrixLED.h"
#include <Atmel/REGX52.H>
#include "Deley.h"

sbit RCK = P3 ^ 5;
sbit SRCLK = P3 ^ 6;
sbit SER = P3 ^ 4;

void MatrixLED_Init() {
    SRCLK = 0;
    RCK = 0;
}

void _74HC595_WriteByte(unsigned char Byte) {
    unsigned char i = 0;
    for (i = 0; i < 8; i++) {
        SER = Byte & (0x80 >> i);
        SRCLK = 1;
        SRCLK = 0;
    }
    RCK = 1;
    RCK = 0;
}

void MatrixLED_ShowColumn(unsigned char column, unsigned char Data) {
    _74HC595_WriteByte(Data);
    // 对某列进行使能，列数为0~7
    MATRIX_LED_PORT = ~(0x80 >> column);
    deley(50);
    MATRIX_LED_PORT = 0xFF;
}
```

而`MatrixLED.h`文件只需加上三个函数的函数声明即可。

### 6. LED点阵动画

#### 使用字模提取工具

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823185045012.png" alt="image-20210823185045012" style="zoom: 67%;" />

我们需要先将【字节倒序】的勾去掉：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823190728496.png" alt="image-20210823190728496" style="zoom:80%;" />

然后点击【新建图像】按钮新建图像，选择8和32

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823185134904.png" alt="image-20210823185134904" style="zoom:80%;" />

我们画出“Hello！”这样的文本：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823190340502.png" alt="image-20210823190340502" style="zoom:80%;" />

然后我们点击【取模方法】>【C51格式】即可得到图像的编码：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210823190839523.png" alt="image-20210823190839523" style="zoom:80%;" />

然后我们将这些数据复制到代码中即可：

```c
unsigned char animation[] = {
    0x7F,0x08,0x08,0x08,0x7F,0x00,0x0E,0x15,0x15,0x15,0x08,0x00,0x7E,0x01,0x02,0x00,
    0x7E,0x01,0x02,0x00,0x0E,0x11,0x11,0x0E,0x00,0x7D,0x00,0x00,0x00,0x00,0x00,0x00
}
```

为了使字幕经过之后可以有一段空白，我们需要为数组的前后都加上8个`0x00`：

```c
unsigned char animation[] = {
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x7F, 0x08, 0x08, 0x08, 0x7F, 0x00, 0x0E, 0x15, 0x15, 0x15, 0x08, 0x00, 0x7E, 0x01, 0x02, 0x00,
    0x7E, 0x01, 0x02, 0x00, 0x0E, 0x11, 0x11, 0x0E, 0x00, 0x7D, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
};
```

#### 代码编写

为`MatrixLED`模块添加一个函数：

```c
void Matrix_ShowAll(unsigned char arr[], unsigned char startIndex) {
    unsigned char i;
    for (i = 0; i < 8; i++) {
        MatrixLED_ShowColumn(i, arr[i + startIndex]);
    }
}

```

然后主函数：

```c
void main(void) {
    unsigned char offset = 0, count = 0;
    unsigned char animeSize = sizeof(animation) / sizeof(unsigned char);
    MatrixLED_Init();
    while (1) {
        while (1) {
            Matrix_ShowAll(animation, offset);
            count++;
            if (count == 10) {
                count = 0;
                break;
            }
        }
        if (offset == animeSize - 8) {
            offset = 0;
        }
        offset++;
    }
}
```

这样我们即可看到从左向右移动的“Hello！”字幕了！

<img src="https://z3.ax1x.com/2021/08/23/hPy7Ix.gif" alt="hPy7Ix.gif" border="0" />
