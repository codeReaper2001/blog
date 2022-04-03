# 开发板LED灯的控制

[[toc]]
## 开发板上LED灯相关的电路图

<img src="https://img-blog.csdnimg.cn/20210710220032825.png" style="zoom:80%;" />

这是P2相关7个引脚的电路图，在默认情况下它是直接接着VCC的，即默认为高电平。

<img src="https://img-blog.csdnimg.cn/20210710220137921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhcl8yMzM=,size_16,color_FFFFFF,t_70" style="zoom:80%;" />

可以看到，8个LED灯分别是和单片机上P20~P27这8个引脚联系起来的，即一端是VCC，另一端是单片机上的端口，这样我们只需要将引脚端电平置为低电平即可将对应的LED点亮。

## 点灯
这里我们尝试先点亮从左到右数第一个LED灯，从电路图上看我们只需要将P20引脚的输出置为0（即设为低电平）即可，代码如下：
```cpp
#include<REG52.H>

sbit led = P2^0;

int main() {
    while (1) {
        led = 0;
    }
}
```
代码说明：首先我们需要引入单片机的头文件REG52.H，里面包含了许多寄存器的地址：

<img src="https://img-blog.csdnimg.cn/20210710200930728.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhcl8yMzM=,size_16,color_FFFFFF,t_70" style="zoom:80%;" />

我们可以使用类似`sbit led = P2^0;`来指定P2寄存器的某一位，例如这里我们指定P2寄存器的第一个bit。然后我们在main函数中将其的值设置为0，即可看到第一个LED灯点亮：

<img src="https://img-blog.csdnimg.cn/20210710201756877.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhcl8yMzM=,size_16,color_FFFFFF,t_70" width="600x" />

## LED闪烁
我们先设置一个延时函数`deley()`：

```cpp
void deley(u16 x) {
    while (x--) {}
}
```
即在这里面一直执行x--操作，按照这个型号单片机的执行速度，大概一个基本语句的执行为10μs，则若输入参数为x，则该函数可以延时$10μs*x=x*10^{-5}s$，故若我们希望延时0.5s，我们需要填入50000。

代码（约1s闪烁一次）：
```cpp
#include<REG52.H>

typedef unsigned int u16;
typedef unsigned char u8;

sbit led = P2^0;

void deley(u16 x) {
    while (x--) {}
}

int main() {
    while (1) {
        led = 0;
        deley(50000);
        led = 1;
        deley(50000);
    }
}
```
运行结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210710203558688.gif)
> tips: 推荐一个GIF制作网站：[https://www.tutieshi.com/video/](https://www.tutieshi.com/video/)，免费制作GIF，为良心网站点赞！

## LED流水灯
```cpp
#include<REG52.H>
#include<INTRINS.H>

typedef unsigned int u16;
typedef unsigned char u8;

#define LED P2

void deley(u16 x) {
    while (x--) {}
}

void defaultDeley() {
    deley(50000);
}

int main() {
    u8 i = 0;
    LED = 0xfe;     // 1111 1110
    defaultDeley();
    while (1) {
        for(i=0;i<7;i++){
            LED = LED << 1;
            LED+=1;
            defaultDeley();
        }
        // 0111 1111
        for(i=0;i<7;i++){
            LED >>= 1;
            LED+=0x80;
            defaultDeley();
        }
        // 1111 1110
    }
}
```
这里我们直接操作P2寄存器，我们希望一开始第一个灯点亮，因此设置P2的值为0b1111 1110，即0xfe，然后我们可以进行移位操作使0位不断变化，即：
1111 1110
1111 1101
1111 1011
...
所以循环的代码应为：

```cpp
LED <<= 1;
LED += 1;
```
这样即可实现向左点灯。

向右点灯也是类似的，循环代码为：

```c
LED >>= 1;
LED+=0x80;
```
于是这样就完全实现了流水灯。

运行效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210710221312399.gif)
（后面还有几秒钟，但GIF要超过csdn的限定大小了。。。）

## 其他效果
### 灯光二进制计数器
核心代码：
```cpp
int main() {
    u8 full = 0xff;
    u8 cnt;
    while (1) {
        cnt = -1;
        while (1) {        
        	// cnt: 0000 0000 -> 0000 0001
        	// LED: 1111 1111 -> 1111 1110
            cnt +=1;
            LED = full - cnt;
            defaultDeley();
            if (cnt == 0xff) {
                break;
            }
        }
    }
}
```
思路是让一个变量从0开始计数到0xff，LED对应的bit是0发光1熄灭的，这刚好是和我们的计数变量的二进制位模式相反，因此使用`LED = 0xff - cnt`进行取反，进而使LED显示与计数变量的变化对应起来。

运行效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210710222429256.gif)
但是此时的灯光计数器最低位在最左边，看起来不太舒服，因此希望**修改最低位在最右边**。

那么我们仍然使用cnt作为计数变量，它将从0x00变化到0xff，然后我们再思考建立cnt到LED的映射关系：
看前面的变化规律：
`cnt`:  `0000 0000 -> 0000 0001 -> 0000 0010`
`LED`: `1111 1111 -> 0111 1111 -> 1011 1111`
可以发现，LED的值应为cnt的二进制位模式反转后的补码，
即`LED = 0xff - reverse(cnt);`

这样，我们很容易就可以写出控制代码：
```cpp
int main() {
    u8 full = 0xff;
    u8 cnt = 0;
    while (1) {
        cnt = -1;
        while (1) {
            // cnt: 0000 0000 -> 0000 0001 -> 0000 0010
	        // LED: 1111 1111 -> 0111 1111 -> 1011 1111
	        // LED = full - (reverse(cnt));
            cnt +=1;
            LED = full - (reverse(cnt));;
            defaultDeley();
            if (cnt == 0xff) {
                break;
            }
        }
    }
}
```
其中二进制位模式的翻转函数为（输入一个数，返回它二进制位模式反转值）：
```cpp
u8 reverse(u8 x) {
    int cnt = 8;
    int res = 0;
    while (cnt--) {
        res <<= 1;
        res += x % 2;
        x >>= 1;
    }
    return res;
}
```
运行效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210710225006796.gif)
### 进阶版流水灯
效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210711002229988.gif)
思路：原来的最基本的流水灯部分我们已经建立了bit为1时对应的灯亮的映射，即`LED = 0xff - val;`，然后为了实现这个效果，我们的val变量的变化情况应该如下所示：
```cpp
0000 0000
0000 0001
0000 0010
...
1000 0000
1000 0001
1000 0010
...
...
1111 1111
```

这样我们操作时可以看做是两个变化的东西，一个是左边的“1”，代表已经到达终点的1，另一个是右边不断左移的“1”，因此这两个部分可以放在两个变量中分别存储，这里设为leftPart和rightPart。

这样我们设计外层循环中leftPart每次的变化为：`leftPart>>=1; leftPart+=0x80;`，而内层循环中rightPart变化，为：`rightPart<<=1;`，且循环次数用变量leftMoveTimes进行存储，一开始值为7，代表可以左移7次，然后每次外循环后-=1。

核心代码：

```cpp
void showAndDeley(u8 res) {
    LED = 0xff - res;
    defaultDeley();
}

int main() {
    u8 rightPart , res, i;
    u8 leftMoveTimes;
    u8 leftPart;
start:
    LED = 0xff;
    
    leftPart = 0;
    leftMoveTimes = 7;
    rightPart = 0;
    res = leftPart | rightPart ;
    showAndDeley(res);
    while (1) {								// 外循环
        rightPart = 1;
        res = leftPart | rightPart ;
        showAndDeley(res);
        for(i = 0; i< leftMoveTimes; i++){ 	// 内循环
            rightPart <<= 1;
            res = leftPart | rightPart ;
            showAndDeley(res);
        }
        if (leftMoveTimes ==0) {
            goto start;						// 重新开始运行
        }
        leftPart>>=1;
        leftPart+=0x80;
        leftMoveTimes--;
    }
}
```
