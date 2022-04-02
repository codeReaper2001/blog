[[toc]]
## Stream的特点
①`Stream`自己不会存储元素。
②`Stream`**不会改变源对象**。相反，他们会**返回一个**持有结果的**新**`Stream`。
③`Stream`操作是**延迟执行**的。这意味着他们会**等到需要结果的时候才执行**。

## Stream的三个操作步骤
- 创建`Stream`
- 中间步骤
- 终止操作（终端操作）

### 1. 创建 Stream
最常用的是第一种方法
```java
// 1.创建Stream
@Test
public void t1() {
    // 1.可以通过Collection系列集合提供的stream()或parallelStream()
    List<String> list = new ArrayList<>();
    Stream<String> stream1 = list.stream();

    // 2.通过Arrays中的静态方法stream()获取数组流
    Employee[] arr = new Employee[10];
    Stream<Employee> stream2 = Arrays.stream(arr);

    // 3.通过Stream类中的静态方法of()
    Stream<String> stream3 = Stream.of("aa", "bb", "cc", "dd");

    // 4.创建无限流
    // 迭代
    Stream<Integer> stream4 = Stream.iterate(0, x -> x + 2);
    stream4.limit(10).forEach(System.out::println);
    // 生成
    Stream<Double> stream5 = Stream.generate(Math::random);
    stream5.limit(10).forEach(System.out::println);
}
```
### 2. Stream的中间操作
特点：多个**中间操作可以连接起来形成一个流水线**，**除非**流水线上**触发终止操作**，否则中间操作**不会执行任何的处理**！而**在终止操作时一次性全部处理**，称为`“惰性求值”`。

#### 筛选与切片
- `filter`：接收`Lambda`，从流中`排除某些元素`。
- `limit`：截断流 ，`使其元素不超过给定数量`。
- `skip(n)`：跳过元素, 返回一个`扔掉了前n个元素的流`。若流中元素不足n个，则返回一个空流。与limit(n)互补
- `distinct`：筛选, 通过流所生成元素的`hashCode()`和`equals()`去除重复元素

测试数据：
```java
List<Employee> employees = Arrays.asList(
        new Employee("张三", 18, 6999.9, Employee.Status.FREE),
        new Employee("李四", 38, 3999.9, Employee.Status.BUSY),
        new Employee("王五", 50, 5999.9, Employee.Status.VOCATION),
        new Employee("赵六", 19, 2999.9, Employee.Status.FREE),
        new Employee("田七", 18, 4999.9, Employee.Status.BUSY),
        new Employee("田七", 18, 4999.9, Employee.Status.BUSY),
        new Employee("田七", 18, 4999.9, Employee.Status.BUSY)
);
```
筛选得到`salary>=5000`的所有员工：
```java
@Test
public void t3() {
    employees.stream()
            .filter(employee -> {
                System.out.println("短路！");
                return employee.getSalary()>=5000;
            })
            .limit(2)
            .forEach(System.out::println);
}
```
`skip(n)`跳过元素：
```java
@Test
public void t4() {
    // 跳过前两个
    employees.stream()
            .filter(employee -> employee.getSalary()>=5000)
            .skip(2)
            .forEach(System.out::println);
}
```
`distinct`去重：
```java
@Test
    public void t5() {
        // 去重
        employees.stream()
                .filter(employee -> employee.getSalary()>=5000)
                .distinct()
                .forEach(System.out::println);
    }
```
#### 映射
- `map`：接收`Lambda`，将元素`转换成其他形式或提取信息`。`接收一个函数`作为参数,该函数会被`应用到每个元素上`,并将其`映射成一个新的元素`，然后`返回保存所有新元素的新流`。

- `flatMap`：接收一个函数作为参数, 将流中的每个值都换成另一个流，然后`把所有流连接成一个流`

```java
@Test
public void t1() {
    List<String> list = Arrays.asList("aaa","bbb","ccc","ddd","eee");
    // 转大写
    list.stream()
            .map(String::toUpperCase)
            .forEach(System.out::println);
    System.out.println("====================");

    // 获取所有员工姓名
    employees.stream()
            .map(Employee::getName)
            .forEach(System.out::println);
    System.out.println("====================");

    Stream<Stream<Character>> stream = list.stream()
    		.map(TestStreamAPI3::filterCharacter);
    // {{a,a,a},{b,b,b},{c,c,c},{d,d,d},{e,e,e}}
    stream.forEach(sm->{
        sm.forEach(System.out::println);
    });

    Stream<Character> characterStream = list.stream()
    		.flatMap(TestStreamAPI3::filterCharacter);
    characterStream.forEach(System.out::println);
}

public static Stream<Character> filterCharacter(String str) {
    List<Character> list = new ArrayList<>();
    for (char c : str.toCharArray()) {
        list.add(c);
    }
    return list.stream();
}
```
#### 排序
- `sorted()`：自然排序(`Comparable`，对象的类`已经实现的接口`)
- `sorted(Comparator com)`：定制排序(`Comparator`，传入的`自定义排序方式`)

```java
@Test
public void t2() {
    List<String> list = Arrays.asList("ccc","ddd","eee","bbb","aaa");
    list.stream()
            .sorted()
            .forEach(System.out::println);

    System.out.println("==========================");

    employees.stream()
            .sorted((o1, o2) -> {
                if (o1.getAge() != o2.getAge()) {
                    return Integer.compare(o1.getAge(), o2.getAge());
                }
                else {
                    return Double.compare(o1.getSalary(), o2.getSalary());
                }
            })
            .forEach(System.out::println);
}
```
### 3.终止操作
#### 查找与匹配
- `allMatch`：检查是否匹配所有元素
- `anyMatch`：检查是否至少匹配一个元素
- `noneMatch`：检查是否所有元素都不匹配
- `findFirst`：返回第- - 个元素
- `findAny`：返回当前流中的任意元素
- `count`：返回流中元素的总个数
- `max`：返回流中最大值
- `min`：返回流中最小值

```java
@Test
public void t1() {
    boolean b1 = employees.stream()
            .allMatch(employee -> employee.getStatus().equals(Employee.Status.BUSY));
    System.out.println(b1);

    boolean b2 = employees.stream()
            .anyMatch(employee -> employee.getStatus().equals(Employee.Status.BUSY));
    System.out.println(b2);

    boolean b3 = employees.stream()
            .noneMatch(employee -> employee.getStatus().equals(Employee.Status.BUSY));
    System.out.println(b3);

    Optional<Employee> op = employees.stream()
            .sorted((o1, o2) -> Double.compare(o1.getSalary(), o2.getSalary()))
            .findFirst();
    System.out.println(op.get());


    Optional<Employee> any = employees.stream()
            .filter(employee -> employee.getStatus().equals(Employee.Status.FREE))
            .findAny();
    System.out.println(any.get());
}
```

```java
@Test
public void t2() {
    long count = employees.stream()
            .count();
    System.out.println(count);

    // 获取最高工资的员工
    Optional<Employee> max = employees.stream()
            .max((o1, o2) -> Double.compare(o1.getSalary(), o2.getSalary()));
    System.out.println(max.get());

    // 获取最低工资
    Optional<Double> min = employees.stream()
            .map(Employee::getSalary)
            .min(Double::compare);
    System.out.println(min.get());
}
```
#### 归约
`reduce(T identity, BinaryOperator) / reduce(BinaryOperator)`：可以将流中元素反复结合起来，得到一个值。

```java
@Test
public void t3() {
    List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
    Integer sum = list.stream()
            .reduce(0, Integer::sum); // (x, y) -> x + y
    System.out.println(sum);

    Integer all = list.stream()
            .reduce(1, (x, y) -> x * y);
    System.out.println(all);

    // 获取工资总和
    Double salarySum = employees.stream()
            .map(Employee::getSalary)
            .reduce(0.0, Double::sum);
    System.out.println(salarySum);
}
```
#### 收集
`collect`：将流转换为其他形式。接收一个`Collector`接口的实现，用于给`Stream`中元素做汇总的方法
```java
@Test
public void t4() {
    List<String> names = employees.stream()
            .map(Employee::getName)
            .collect(Collectors.toList());
    names.forEach(System.out::println);
    System.out.println("=======================");

    Set<Employee.Status> collect = employees.stream()
            .map(Employee::getStatus)
            .collect(Collectors.toSet());
    collect.forEach(System.out::println);
    System.out.println("=======================");

    // 收集到特殊的集合中
    HashSet<String> set = employees.stream()
            .map(Employee::getName)
            .collect(Collectors.toCollection(HashSet::new));
    set.forEach(System.out::println);
}
```
##### 统计最大（小）、平均值
```java
@Test
public void t5() {
    Double avgSalary = employees.stream()
            .collect(Collectors.averagingDouble(Employee::getSalary));
    System.out.println(avgSalary);
    System.out.println("=======================");

    Double sumSalary = employees.stream()
            .collect(Collectors.summingDouble(Employee::getSalary));
    System.out.println(sumSalary);
    System.out.println("=======================");

    Optional<Employee> maxSalaryEmployee = employees.stream()
            .collect(Collectors.maxBy((o1, o2) -> Double.compare(o1.getSalary(), o2.getSalary())));
    System.out.println(maxSalaryEmployee.get());
    System.out.println("=======================");

    Optional<Double> minSalary = employees.stream()
            .map(Employee::getSalary)
            .collect(Collectors.minBy(Double::compare));
    System.out.println(minSalary.get());
}
```

```java
@Test
public void t9() {
    DoubleSummaryStatistics dss = employees.stream()
            .collect(Collectors.summarizingDouble(Employee::getSalary));
    System.out.println(dss.getSum());
    System.out.println(dss.getMax());
    System.out.println(dss.getAverage());
}
```

##### 分组
```java
@Test
public void t6() {
    // 按照状态分组
    Map<Employee.Status, List<Employee>> group = employees.stream()
            .collect(Collectors.groupingBy(Employee::getStatus));
    group.forEach((status, employees) -> {
        System.out.println(status+": ");
        employees.forEach(System.out::println);
    });
}
```
##### 多级分组
```java
@Test
public void t7() {
    Map<Employee.Status, Map<String, List<Employee>>> collect = employees.stream()
            .collect(Collectors.groupingBy(Employee::getStatus, Collectors.groupingBy(employee -> {
                if (employee.getAge() <= 35) {
                    return "青年";
                }
                else if (employee.getAge() <= 50) {
                    return "中年";
                }
                else {
                    return "老年";
                }
            })));

    collect.forEach((status, ageMap) -> {
        System.out.println(status+": ");
        ageMap.forEach((ageTag, employeeList)->{
            System.out.println("\t"+ageTag+":");
            employeeList.forEach(employee -> System.out.println("\t\t"+employee));
        });
    });
}
```
##### 分区
```java
@Test
public void t8() {
    // 分区
    Map<Boolean, List<Employee>> map = employees.stream()
            .collect(Collectors.partitioningBy(employee -> employee.getSalary() >= 5000));
    map.forEach((key, employees)-> {
        System.out.println(key+": ");
        employees.forEach(employee -> System.out.println("\t"+employee));
    });
}
```
##### 字符串连接
```java
@Test
public void t10() {
    String str = employees.stream()
            .map(Employee::getName)
            .collect(Collectors.joining(",","[","]"));
    System.out.println(str);
}
```