[[toc]]

参考资料：https://www.bilibili.com/video/BV1Qx411f7pF

## 一、PHP程序的调试

这里对PHP程序调试的IDE选择的是`PHPStorm`，因为PHPStorm应该是PHP语言当前最受欢迎的代码编辑环境，而且对各种补全以及生成PHPdoc功能的支持都非常好。

### 1. 单个PHP程序的调试

首先依次选择 File -> Settings -> PHP （CLI Interpreter栏原本是空的）：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112192216644.png" alt="image-20211112192216644" style="zoom: 60%;" />

然后选择自己的php.exe即可（如果没有显示的需要先设置php环境变量）：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112192835707.png" alt="image-20211112192835707" style="zoom: 60%;" />

选择之后保存确定即可。

我当前使用的php集成环境是Wampserver64（Apache+PHP+MySQL），具体版本如下：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112194014364.png" alt="image-20211112194014364" style="zoom: 50%;" />

在我的这个PHP运行环境中，就已经自带有`xdebug`插件了，即对应的.dll文件包含在每个php版本文件夹中的zend_ext目录下，如下所示（如没有`xdebug`插件则需要先去下载）：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112194227121.png" alt="image-20211112194227121" style="zoom: 60%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112194241833.png" alt="image-20211112194241833" style="zoom: 60%;" />

然后我们需要打开php目录下的php.ini，添加上如下代码：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112194332121.png" alt="image-20211112194332121" style="zoom: 60%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112135324053.png" alt="image-20211112135324053" style="zoom: 67%;" />

这里的`zend_extension`的值为刚才xdebug.dll文件的地址，而我这里不是刚刚那个文件是因为我将它复制到了ext目录下并修改了它的命名。

然后即可编辑php文件，然后在合适的地方打上断点：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112193059121.png" alt="image-20211112193059121" style="zoom: 60%;" />

然后右键文件选择调试该文件即可：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112193136696.png" alt="image-20211112193136696" style="zoom: 60%;" />

最终我们终于实现了单步调试，并且在下面的debug tab中查看到各个变量的内容了：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112193248778.png" alt="image-20211112193248778" style="zoom: 60%;" />

### 2. PHP框架代码的调试

这里我所使用的PHP框架是`thinkphp6.x`，其他的框架应该也是类似的。

这里我们需要再次修改原来的php.ini文件，如下所示：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112194427608.png" alt="image-20211112194427608" style="zoom: 67%;" />

后面的这几个参数在`PhpStorm`中调试单文件也可以看到，我们把它们如上加入到php.ini文件中即可。

此后我们再转到PhpStorm中，选择 File->Settings->Debug：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112195321854.png" alt="image-20211112195321854" style="zoom: 55%;" />

这里将Debug port修改为php.ini文件中`xdebug.remote_port`所设置的端口，最后我们只需在php.ini文件中再添加上一句：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112195619656.png" alt="image-20211112195619656" style="zoom: 67%;" />

这句意味着自动开启xdebug，如果设置了这个属性，则我们可以在任意时刻进行断点调试，当然这也意味着运行效率有一定的降低，因为需要产生额外的调试信息，这一点和其他语言的分别以**运行模式**和**调试模式**运行是类似的，因此这个属性可以**看情况进行关闭掉以提高性能**（不需要调试时关闭即可）。

> tips：修改了php.ini文件的配置，需要重新启动Apache等服务才可以生效，我这里重启了WampServer的所有服务。

重新启动服务后，我们输入：`php think run -H '自己的虚拟域名'`（这是thinkphp的启动命令）来启动tp6项目：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112200237106.png" alt="image-20211112200237106" style="zoom: 55%;" />

然后使用浏览器访问这个生成的url：http://api.tp6.com:8000/

可以发现弹出这个窗口：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112134722688.png" alt="image-20211112134722688" style="zoom: 55%;" />

点击accept即可，然后发现php程序停在了断点：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112134809614.png" alt="image-20211112134809614" style="zoom: 55%;" />

终于，我们实现了对php框架代码的单步调试，框架中使用的变量等信息也可以查看了，这比使用`var_dump`等打印的方式一次一调的方式强太多了！

## 二、JavaScript程序的调试

这里使用到的代码调试工具为Chrome，首先先编写一小段js程序：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112140108939.png" alt="image-20211112140108939" style="zoom:67%;" />

然后使用浏览器打开这个html文件：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112140217024.png" alt="image-20211112140217024" style="zoom:55%;" />

此时按下F12打开调试工具，选择Sources栏：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112140358809.png" alt="image-20211112140358809" style="zoom: 55%;" />

选择了对应的文件后，我们可以看到刚刚编写的js代码，然后我们可以在对应的行号上打上断点，如：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112140445147.png" alt="image-20211112140445147" style="zoom: 55%;" />

然后刷新页面，可以看到js程序停在了断点：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112140549161.png" alt="image-20211112140549161" style="zoom: 55%;" />

此时，我们可以在右边栏查看变量等各种信息：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20211112140742369.png" alt="image-20211112140742369" style="zoom: 60%;" />

至此我们已实现了对js程序的调试。

## 三、总结

本文实现了对PHP程序及JavaScript程序的单步调试，虽然就PHP和JavaScript程序而言，我们大多数情况都可以使用打印大法，如：`console.log()`、`echo`、`var_dump()`来进行调试，但遇到一些棘手的问题时，单步调试可以一次性解决大部分的bug，大大缩短解决问题的时间，应该是不可缺少的重要工具，因此特地开贴记录在PHP和JavaScript项目中这一重要工具的配置方法。