# CLion结合vcpkg以及GTest的使用

[[toc]]

## 一、vcpkg简介、下载和使用

### 1. vcpkg是什么

vcpkg对于我们用户来说相当于一个c++的包管理器，其他语言中类似的包管理器有：

* Java：Maven
* JavaScript：npm，yarn
* python：pip

其实当我以前使用python或者Java时就深刻地感受到了包管理器的便利，而当时也没怎么听说c++有比较好用的包管理器，而我也只是一年前才听说过有`vcpkg`这个东西，但由于之前不太熟悉cmake如何编写而作罢，而这学期的《计算机图形学》课程需要按照OpenGL相关的库，此时我第一次需要使用到vcpkg，也感受到了它的便利，故也编写博客记录一下。

### 2. vcpkg下载

GitHub链接：https://github.com/microsoft/vcpkg

clone url：https://github.com/microsoft/vcpkg.git

我们需要先将项目下载下来：

```bash
git clone https://github.com/microsoft/vcpkg.git
```

然后执行：

```bash
.\bootstrap-vcpkg.bat
```

> 这个指令应该是到GitHub上去下载vcpkg对应的可执行文件

待它执行完之后，在项目中就会出现`vcpkg.exe`的可执行文件了

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915221447283.png" alt="image-20210915221447283" style="zoom: 60%;" />

这样vcpkg即下载完成

### 3. 使用vcpkg下载第三方库

当前vcpkg中有许多第三方库，例如：boost、GTest、jsoncpp等等，我们可以使用以下的指令下载需要的库：

```bash
vcpkg install 库名
```

例如：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915221825603.png" alt="image-20210915221825603" style="zoom:67%;" />

当第三方库下载好了，它就会提示当使用cmake进行构建项目时需要添加的脚本代码。

## 二、clion结合vcpkg

虽然`vcpkg`是针对于`Visual Studio`编译器的包管理器，但是感觉对比于`clion`，`vs`有很多地方用得非常不顺手（特别是对于使用过`IntelliJ IDEA`的同学），而且`clion`也可以选择使用`vs`作为编译环境，因此我这里使用clion来使用vcpkg中的第三方库。

### 1. 方法一：使用环境变量

先设置两个环境变量：

VCPKG_ROOT：vcpkg文件夹目录

VCPKG_DEFAULT_TRIPLET：x64-windows

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915222624959.png" alt="image-20210915222624959" style="zoom:67%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915222609971.png" alt="image-20210915222609971" style="zoom:67%;" />

然后在项目根目录下的CmakeLists.txt中添加（位于c++标准声明和project声明之间）：

```cmake
## c++11
set(CMAKE_CXX_STANDARD 11)
...

## vcpkg <--
if(DEFINED ENV{VCPKG_ROOT} AND NOT DEFINED CMAKE_TOOLCHAIN_FILE)
  set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
      CACHE STRING "")
endif()
if(DEFINED ENV{VCPKG_DEFAULT_TRIPLET} AND NOT DEFINED VCPKG_TARGET_TRIPLET)
  set(VCPKG_TARGET_TRIPLET "$ENV{VCPKG_DEFAULT_TRIPLET}" CACHE STRING "")
endif()

## project
project(main)
...
```

### 2. 方法二：添加cmake指令【推荐】

先使用clion打开（或创建一个新的）cmake项目，点击下方的【cmake】tab：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915223107664.png" alt="image-20210915223107664" style="zoom:67%;" />

然后将需要的命令填写到下图的文本框中：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915223232691.png" alt="image-20210915223232691" style="zoom:67%;" />

需要填写的命令为：

```txt
-DCMAKE_TOOLCHAIN_FILE=<自己的vcpkg目录>/scripts/buildsystems/vcpkg.cmake
```

例如：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915223416011.png" alt="image-20210915223416011" style="zoom:67%;" />



然后需要注意将编译器切换为`Visual Studio`（两种方法都需要切换），因为vcpkg实际上是针对`Visual Studio`的c++包管理器，因此许多第三方库只有使用`vs`编译环境才能成功运行（经测试GTest和Boost.test使用mingw编译运行失败）

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915223908940.png" alt="image-20210915223908940" style="zoom: 60%;" />

## 三、clion通过vcpkg使用GTest

### 1. GTest简介

GTest的全称是Google Test，是谷歌开发的一套针对c++的单元测试库。

> 之前开发Java时就已经接触过Junit了，当时就觉得单元测试真是太方便了，对于我这样的初级开发者而言，单元测试只是多几个程序执行入口而已，但确实非常便于编写小端的代码笔记和测试较小的模块

### 2. GTest配置

首先先使用`vcpkg install gtest`将`gtest`库下载下来

然后会发现命令行中出现这样的提示：

```txt
The package gtest:x64-windows provides CMake targets:

    find_package(GTest CONFIG REQUIRED)
    target_link_libraries(main PRIVATE GTest::gmock GTest::gtest GTest::gmock_main GTest::gtest_main)
```

后面的两行命令我们直接粘贴到CMakeLists.txt中的末尾即可：

```cmake
add_executable(main ...)
...

find_package(GTest CONFIG REQUIRED)
target_link_libraries(main PRIVATE GTest::gtest GTest::gtest_main)
```

注意这里的`target_link_libraries`中我去掉了`gmock`相关的配置，因为他们两个同时链接会发生冲突，而且一般我们使用两者其一即可。

### 3. GTest的简单使用
在`main.cpp`中编写：

```cpp
#include <iostream>
#include <gtest/gtest.h>
using namespace std;

TEST(TestCase, t1) {
    cout << "hello world" << endl;
}
```

然后会发现`clion`中有和`IDEA`一样人性化的运行按钮：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915225001608.png" alt="image-20210915225001608" style="zoom: 67%;" />

然后我们即可运行测试代码块了：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915225044714.png" alt="image-20210915225044714" style="zoom:67%;" />

运行效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210915225122610.png" alt="image-20210915225122610" style="zoom:67%;" />

当然，GTest中还有许多非常强大的功能，但我现在还用不到，当前我只需要个测试入口log一些测试信息就好了haha。

> tips：和这里介绍的GTest库的使用一样，其他的第三方库按照这个流程配置好即可成功运行，例如boost、jsoncpp等等，个人觉得vcpkg唯一不足的地方就是绑定了vs编译环境，很多库无法使用mingw环境编译运行。
