[[toc]]

## 一、遇到的问题

本学期的计算机网络课程需要使用到Wireshark抓包工具进行网络抓包实验，原本可以看到在该软件中捕获到的数据包都被按照各个协议进行分类好了，例如ARP包，TCP报文段，UDP数据报等等。但是当我想要抓取访问某网站时传输的数据，例如访问bilibili时，我先使用ping命令得到bilibili的IP地址：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315100839389.png" alt="image-20220315100839389" style="zoom: 80%;" />

得到的ip地址为：`120.240.78.230`

而当我使用这个ip地址在Wireshark中进行抓包筛选时却发现什么http的请求都找不到：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315101011748.png" alt="image-20220315101011748" style="zoom: 80%;" />

经查找资料发现现在互联网使用的HTTP协议基本都是HTTP2.0以上的了，因而数据包都是加密之后再在网络中进行传输，保证了信息的安全性。因而我们收到的HTTP请求在Wireshark中只能看到一个个的TLS包，这些TLS包在使用秘钥解密之后可以得到正确的HTTP报文。

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315101621917.png" alt="image-20220315101621917" style="zoom:80%;" />

## 二、解决方案

### 1. 动态获取对称加密秘钥

以下解决方案是针对使用Chrome浏览器的。（也许Edge等浏览器也可以？）

首先我们需要通过Chrome浏览器生成一个包含加密秘钥信息的文件，方法是给浏览器添加以下的启动参数：

```bash
--ssl-key-log-file=D:\sslkey.log
```

这个只是一个范例，后面填写的目录可以是任意的位置。

为了方便起见，在windows系统下可以右键点击Chrome浏览器的快捷方式进行设置：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315102335795.png" alt="image-20220315102335795" style="zoom: 80%;" />

添加上参数后，我们使用该快捷方式启动Chrome就会发现在上面设置的目录下生成了对应的sslkey.log文件：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315102546708.png" alt="image-20220315102546708" style="zoom:80%;" />

### 2. Wireshark配置

然后打开Wireshark，依次点击：编辑 -> 首选项 -> Protocols：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315102754562.png" alt="image-20220315102754562" style="zoom:80%;" />

老版本的Wireshark中可以看到SSL的选项，而新版本中则变成了TLS。我们打开相应的选项（SSL或TLS），然后将sslkey.log文件的路径配置到`(Pre)-Master-Secret log filename`项中即可：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315103048732.png" alt="image-20220315103048732" style="zoom:80%;" />

至此配置完成。

### 3. 最终效果

此时再次访问b站首页，可以在Wireshark中看到许多http2请求报文了，这些都是原先的TLS包解密后得到的结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20220315103245771.png" alt="image-20220315103245771" style="zoom:80%;" />