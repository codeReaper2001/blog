# 项目的建立和vscode代码编辑环境的设置

[[toc]]
工欲善其事必先利其器，因此我们先搭建一个比较舒服的开发环境。
## Keil项目的建立
1. 打开Keil软件点击Project/New uVision Project

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710171700794.png" style="zoom:80%;" />

2. 设置项目名

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710171841746.png" style="zoom: 67%;" />

3. 选择芯片类型

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710172241600.png" width="500x" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710172310841.png" style="zoom:80%;" />

这样新建项目完成

## 使用vscode进行开发
使用vscode来替代Keil自然是因为Keil中没有代码补全和错误提示，开发太难受了。

一下是设置开发环境和使用的过程
1. 下载几个插件
需要的插件有：C/C++，EmbededIDE，Keil Assistant，如下图所示：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/2021071017255142.png" style="zoom:80%;" />



<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/2021071017262279.png" style="zoom:80%;" />



<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710172654835.png" style="zoom:80%;" />


作用：
- C/C++ 提供代码补全
- Embeded IDE 管理项目结构
- Keil Assistant 编译文件，得到HEX文件（烧录功能貌似我没有成功）

2. 插件需要填写的参数

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710175118713.png" style="zoom:80%;" />

3. 使用vscode进行代码编写和输出可执行文件并执行

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710173401986.png" style="zoom:80%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710173437846.png" style="zoom:80%;" />

此时它会说导入项目失败，此时我们只需要关闭Keil IDE再次导入即可。导入后：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710173630231.png" style="zoom:80%;" />

此时我们即可进行代码编写，先新建main.c：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710173743863.png" alt="在这里插入图片描述" style="zoom:80%;" />

编写一个最简单的点灯程序，然后点击按钮进行编译：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710190357565.png" style="zoom:80%;" />



<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710190502915.png" style="zoom:80%;" />

可以发现，现在编写代码已经有代码提示了，代码体验up!!!
编写完后进行编译生成HEX文件：
<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710174016317.png" alt="在这里插入图片描述" style="zoom:80%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710174038374.png" alt="在这里插入图片描述" style="zoom:80%;" />
然后我们就可以使用烧录软件写入到单片机中了：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/20210710174212833.png" style="zoom:80%;" />

运行成功！
