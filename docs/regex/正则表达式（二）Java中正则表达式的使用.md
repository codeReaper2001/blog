[[toc]]

## 前言

在前面的《正则表达式（一）》的博文中已经记录了正则表达式的基本语法，下面的内容主要是补充上一篇博文没有介绍完全的一点内容以及记录在**Java语言**中如何使用正则表达式进行字符串的判断，提取信息和替换信息。

> 之所以使用`Java`语言，是因为`JDK`中已经内置好了正则表达式的库，而且`Java`的**单元测试**使用起来也非常方便，此外面向对象型的接口使用起来也更为舒适。
>
> 需要注意的是，在Java语言中，我们为了在字符串中表示反斜杠字符（`\`），我们需要输入`\\`，因为在Java中`\`是一个用于转义的字符，如`\t`，`\n`等等，因此我们需要输入两个反斜杠来代表一个反斜杠字符了。例如表示匹配整数的表达式`\d+`，在Java中就需要写成`\\d+`。

## 一、非贪婪匹配

首先先看一个需求，我们的输入是一串数字字符串，我们需要做的是它最后面的所有`0`字符和`0`前面的子串提取出来，例如：

- `"123000"`：`"123"`和`"000"`
- `"110"`：`"11"`和`"0"`
- `"1234"`：`"1234"`和`""`

我们很自然地可以写出这样的表达式：`^(\d*)(0*)$`

可是如果这样写匹配的结果和我们想象的是一样吗？

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918000358088.png" alt="image-20210918000358088" style="zoom:67%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918000510650.png" alt="image-20210918000510650" style="zoom:67%;" />

可以发现，分解的结果为：`"123000"`和`""`，与我们的想象完全不同。

产生这样的结果的原因是：**正则表达式默认使用贪婪匹配**，任何一个规则，它总是**尽可能多地向后匹配**，因此，`\d+`总是会把后面的`0`包含进来。

而我们需要做的是使`\d*`尽量少匹配，而`0*`尽量多地匹配，这就需要使用到**非贪婪匹配**了，其含义即为使表达式**尽量少地向后匹配**。使用的方式是在某个量词后面加上`?`，即原来的正则表达式需要修改为：`^(\d*?)(0*)$`，这样我们的匹配结果为：

| 输入串     | 结果                                                         |
| ---------- | ------------------------------------------------------------ |
| `"123000"` | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001229183.png" alt="image-20210918001229183" style="zoom: 67%;" />    <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001256636.png" alt="image-20210918001256636" style="zoom:67%;" /> |
| `"110"`    | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001414658.png" alt="image-20210918001414658" style="zoom:67%;" />     <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001430408.png" alt="image-20210918001430408" style="zoom:67%;" /> |
| `"1234"`   | <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001506216.png" alt="image-20210918001506216" style="zoom:67%;" />   <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001520476.png" alt="image-20210918001520476" style="zoom:67%;" /> |

可以发现现在得到的结果就是完全符合需求了。

## 二、Java中使用表达式判断字符串

在Java中主要有三种使用方式：

### 法一（最常用）

使用`String`类中的成员方法`boolean matches(String regex)`，使用方式如下所示：

```java
@Test
public void t1() {
    String re = "^\\d+$";
    boolean isMatch = "123".matches(re);
    System.out.println(isMatch);
}
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918002253873.png" alt="image-20210918002253873" style="zoom:67%;" />

其实点进去看`String.matches`的实现可以发现其内部也是使用正则表达式模块的方法进行判断的，即第二种方法。`String.matches`内部如下图所示：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918002517193.png" alt="image-20210918002517193" style="zoom:67%;" />

### 法二

使用`Pattern`类的静态方法`boolean matches(String regex, CharSequence input)`，使用方式如下：

 ```java
@Test
public void t2() {
    String re = "^\\d+$";
    boolean isMatch = Pattern.matches(re, "123");
    System.out.println(isMatch);
}
 ```

其实再观察`Pattern.matches`的源码可以发现它是使用`Pattern`和`Matcher`共同完成的：

```java
// Pattern.matches源码
public static boolean matches(String regex, CharSequence input) {
    Pattern p = Pattern.compile(regex);
    Matcher m = p.matcher(input);
    return m.matches();
}
```

因此我们还可以使用这种方式来进行匹配。

### 法三

使用`Pattern`和`Matcher`共同完成

和上面源码的方式一样，即：

```java
@Test
public void t3() {
    String re = "^\\d+$";
    Pattern pattern = Pattern.compile(re);
    Matcher matcher = pattern.matcher("123");
    boolean isMatch = matcher.matches();
    System.out.println(isMatch);
}
```

工作流程是：

1. 编译表达式，得到一个模式对象（`Pattern`对象）
2. 使用`Pattern`对象对输入字符串进行匹配，得到匹配结果集`Matcher`对象，在`Matcher`对象中包括了全部的匹配信息，即包含**所有匹配到的子串**以及**每个子串中的各个分组部分**，例如：
    <img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001256636.png" alt="image-20210918001256636" style="zoom:67%;" />
3. 使用`Matcher`对象提取需要的信息

后面会发现无论是提取信息还是替换信息都是按照这个流程来走的。

## 三、Java中使用表达式提取信息

提取信息就需要使用到前面使用到的分组查询的符号`()`了，即需要提取的内容使用圆括号括起来，例如我们的需求还是上面那个将一个数字字符串的`"0"`串和前面的子串提取出来，我们的表达式和上面的一样，为：`^(\d*?)(0*)$`

在Java中使用分组匹配也是按照上面判断字符串是否匹配的【法三】一样，需要分三步走，需要先后得到对应的`Pattern`对象和`Matcher`对象，然后我们需要使用到`Matcher`对象的成员方法`String group(int group)`，即输入分组索引，然后即可获取到分组匹配到的内容，例如在可视化平台中我们使用这个表达式来匹配`"123000"`，匹配的结果为：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001229183.png" alt="image-20210918001229183" style="zoom: 67%;" />

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918001256636.png" alt="image-20210918001256636" style="zoom:67%;" />

可以看到group 1的结果为`"123"`，group 2的结果为`"000"`。

代码示例如下：

```java
@Test
public void t4() {
    String re = "^(\\d*?)(0*)$";
    Pattern pattern = Pattern.compile(re);       //1.创建Pattern对象
    Matcher matcher = pattern.matcher("123000"); //2.创建Matcher对象
    if (matcher.matches()) {                     //3.判断是否匹配
        String front = matcher.group(1);         //4.使用group方法提取
        String end = matcher.group(2);
        System.out.printf("front: \"%s\", end: \"%s\"%n", front, end);
    }
}
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918110114557.png" alt="image-20210918110114557" style="zoom:67%;" />

## 四、匹配多处信息

例如当前这样的需求：给出一段输入菜单字符串，提取出里面所有的金额数据并统计总价格。

例如输入为：`"咸鱼茄子煲：20.5元，手撕包菜：13元，米饭：2元，红烧肉：22.5元"`

因此我们需要使用正则表达式匹配多处信息并将它们提取出来，我们需要匹配的是小数，写出表达式为：`(\d+(\.\d*)?)`

输入到可视化平台中的效果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918110818120.png" alt="image-20210918110818120" style="zoom:67%;" />

可以发现，这个模式将所有的价格数字字符串都匹配到了，剩下的工作是我们如何匹配这多处信息并且将信息提取出来呢？

这个过程需要使用到`Matcher`对象的`boolean find()`成员方法，这个方法的作用是**每次往下找到一个匹配的子串**，如果找到了则返回`true`，否则返回`false`，因此我们可以使用这个方法**不断向下迭代**，**直到匹配完所有的价格**。提取信息的方法与【三】中介绍的还是一样的。

代码示例如下：

```java
@Test
public void t5() {
    String re = "(\\d+(\\.\\d*)?)";
    Pattern pattern = Pattern.compile(re);
    Matcher matcher = pattern.matcher("咸鱼茄子煲：20.5元，手撕包菜：13元，米饭：2元，红烧肉：22.5元");
    float result = 0;
    while (matcher.find()) {
        String moneyStr = matcher.group(1);
        result += Float.parseFloat(moneyStr);
        System.out.println(moneyStr);
    }
    System.out.println("result: " + result);
}
```

执行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918111921852.png" alt="image-20210918111921852" style="zoom:67%;" />

## 五、使用表达式替换字符串

### 法一（常用）

使用`String`类的成员函数`String replaceAll(String regex, String replacement)`，其中

1. 参数1为匹配模式
2. 参数2位用于替换的字符串

例如使用正则表达式将字符串中所有的空白字符替换为`,`，此时的匹配模式为`\s+`，代码实例如下：

```java
@Test
public void t6() {
    String str = "123 wej  1jwe         315";
    String result = str.replaceAll("\\s+", ", ");
    System.out.println("result: " + result);
}
```

运行结果：

<img src="https://codereaper-image-bed.oss-cn-shenzhen.aliyuncs.com/img/my-picture-bed/image-20210918114919404.png" alt="image-20210918114919404" style="zoom:67%;" />

### 法二

第二种方法既是使用`String`类的成员函数`replaceAll`的实现方式，即：

```java
//replaceAll源码
public String replaceAll(String regex, String replacement) {
    return Pattern.compile(regex).matcher(this).replaceAll(replacement);
}
```

示例如下：

```java
@Test
public void t7() {
    String str = "123 wej  1jwe         315";
    Pattern pattern = Pattern.compile("\\s+");
    Matcher matcher = pattern.matcher(str);
    String result = matcher.replaceAll(", ");
    System.out.println("result: " + result);
}
```