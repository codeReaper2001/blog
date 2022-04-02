# Lambda表达式（二）

[[toc]]
## 一、Java8 内置的四大核心函数式接口
之前我们使用Lambda表达式之前都需要手动地去创建函数式的接口，但其实我们不必这样做，因为JDK8已经为我们提供好了四大核心函数式接口，即：
`Consumer<T>`: 消费型接口
```java
void accept(T t);
```

`Supplier<T>`: 供给型接口
```java
T get();
```

`Function<T, R>`: 函数型接口
```java
R apply(T t);
```

`Predicate<T>`: 断言型接口
```java
boolean test(T t);
```
### 1. 消费型接口 Consumer

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
	...
}
```
即实现该函数式接口时需要提供一个`单个参数、无返回值`的Lambda表达式，应用如下：

```java
// Consumer<T>: 消费型接口
@Test
public void t1() {
    happy(1000, x -> System.out.println("每次消费金额："+x));
}
public void happy(double money, Consumer<Double> consumer) {
    consumer.accept(money);
}
```
### 2. 供给型接口 Supplier
```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```
即实现该函数式接口时需要提供一个`无输入参数、有返回值`的Lambda表达式，应用如下：

```java
// 需求：产生指定个数整数，并放入集合中
@Test
public void t2() {
    List<Integer> numList = getNumList(10, () -> (int) (Math.random() * 100));
    System.out.println(numList);
}
public List<Integer> getNumList(int num, Supplier<Integer> supplier) {
    List<Integer> list = new ArrayList<>();
    for (int i = 0; i < num; i++) {
        list.add(supplier.get());
    }
    return list;
}
```

### 3. 函数型接口 Function
```java
@FunctionalInterface
public interface Function<T, R> {
    /**
     * Applies this function to the given argument.
     *
     * @param t the function argument
     * @return the function result
     */
    R apply(T t);
    ...
}
```
即实现该函数式接口时需要提供一个`带一个输入参数、有返回值`的Lambda表达式，应用如下：

```java
// 需求：处理字符串
@Test
public void t3() {
    String res = strHandler("abcdefg", s -> s.toUpperCase());
    System.out.println(res);
}
public String strHandler(String str, Function<String, String> function) {
    String res = function.apply(str);
    return res;
}
```


### 4.断言型接口 Predicate
```java
@FunctionalInterface
public interface Predicate<T> {
    /**
     * @param t the input argument
     * @return {@code true} if the input argument matches the predicate,
     * otherwise {@code false}
     */
    boolean test(T t);
	...
}
```
即实现该函数式接口时需要提供一个`带一个输入参数、返回值为boolean类型`的Lambda表达式，应用如下：
```java
// 需求：将满足条件的字符串，放入到集合中
@Test
public void t4() {
    List<String> list = Arrays.asList("Hello", "atguigu", "Lambda", "www", "ok");
    List<String> res = filterStr(list, s -> s.length() > 3);
    res.forEach(System.out::println);
}
public List<String> filterStr(List<String> list, Predicate<String> predicate) {
    List<String> res = new ArrayList<>();
    for (String s : list) {
        if (predicate.test(s)) {
            res.add(s);
        }
    }
    return res;
}
```
## 二、方法引用
若Lambda体中的内容**有方法已经实现了**，我们可以使用`“方法引用”`（可以理解为方法引用是Lambda表达式的另外一种标新形式）

> 相当于参数照搬到某个方法的参数列表中的一种简写

### 语法格式
#### 对象::实例方法名
```java
// 对象::实例方法名
@Test
public void t1() {
    Consumer<String> con = s -> System.out.println(s);

    PrintStream ps = System.out;
    Consumer<String> con1 = ps::println;
}
```

#### 类::静态方法名
```java
 //类::静态方法名
@Test
public void t3() {
    Comparator<Integer> com = (o1, o2) -> Integer.compare(o1, o2);

    Comparator<Integer> com2 = Integer::compareTo;
}
```

#### 类::实例方法名
若`Lambda表达式`参数列表中的`第一个参数`是实例方法的`调用者`，`第二个参数`是方法的`参数`时，可以使用`ClassName::fuction`
```java
// 类::实例方法名
@Test
public void t4() {
    BiPredicate<String, String> bp = (s, s2) -> s.equals(s2);

    BiPredicate<String, String> bp2 = String::equals;
}
```
## 三、构造器引用
需要调用的构造器的参数列表要与函数式接口中抽象方法的参数列表保持一致
```java
// 构造器引用，ClassName::new
@Test
public void t5() {
    Supplier<Employee> sup = () -> new Employee();

    Supplier<Employee> sup2 = Employee::new;
}

@Test
public void t6() {
    Function<Integer, Employee> fun = x -> new Employee(x);

    Function<Integer, Employee> fun1 = Employee::new;
}
```

下一步：[Java8 Stream API的使用（企业开发常用）](https://www.cnblogs.com/CodeReaper/p/15096871.html)
