[[toc]]
## 一、应用场景引入
首先编写对应的实体类模拟实际业务：
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Employee {
    private String name;
    private Integer age;
    private double salary;
}
```
具体数据：
```java
List<Employee> employees = Arrays.asList(
        new Employee("张三", 18, 6999.9, Employee.Status.FREE),
        new Employee("李四", 38, 3999.9, Employee.Status.BUSY),
        new Employee("王五", 50, 5999.9, Employee.Status.VOCATION),
        new Employee("赵六", 19, 2999.9, Employee.Status.FREE),
        new Employee("田七", 18, 4999.9, Employee.Status.BUSY)
);
```

此时我们需要得到年龄>=35的所有员工，则可以：

```java
public List<Employee> filterEmployees(List<Employee> employees) {
    List<Employee> res = new ArrayList<>();
    for (Employee employee : employees) {
        if (employee.getAge()>=35){
            res.add(employee);
        }
    }
    return res;
}

@Test
public void t3() {
    List<Employee> res = filterEmployees(employees);
    for (Employee employee : res) {
        System.out.println(employee);
    }
}
```
但这样可扩展性不好，当我们需要更改过滤条件时则需要新写一个过滤函数，其中有很多相同的代码。

### 优化一：使用策略模式
先编写一个过滤策略接口：

```java
public interface MyPredicate<t> {
    boolean condition(T t);
}
```
对应的用于过滤年龄的实现类`FilterEmployeeByAge`：

```java
public class FilterEmployeeByAge implements MyPredicate<Employee> {
    @Override
    public boolean condition(Employee employee) {
        return employee.getAge() >= 35;
    }
}
```
然后再编写根据策略进行过滤的函数：

```java
public List<employee> filterEmployees(List<Employee> employees, MyPredicate<Employee> predicate) {
    List<Employee> res = new ArrayList<>();
    for (Employee employee : employees) {
        if (predicate.condition(employee)){
            res.add(employee);
        }
    }
    return res;
}
```
这样我们即可根据不同的策略进行过滤了，如此时我们希望得到年龄>=35的所有员工：

```java
// 策略模式
@Test
public void t4() {
    List<Employee> employees = filterEmployees(this.employees, new FilterEmployeeByAge());
    for (Employee employee : employees) {
        System.out.println(employee);
    }
}
```
若我们希望进行扩展，此时希望得到工资>=3000的所有员工，则可以再编写一个策略实现类，然后再进行相应的策略选择：

```java
// FilterEmployeeBySalary.java
public class FilterEmployeeBySalary implements MyPredicate<Employee> {
    @Override
    public boolean condition(Employee employee) {
        return employee.getSalary() >= 3000;
    }
}


// MyTest.java
@Test
public void t5() {
    List<Employee> employees = filterEmployees(this.employees, new FilterEmployeeBySalary());
    for (Employee employee : employees) {
        System.out.println(employee);
    }
}
```
但通过这种方法还是比较麻烦，每定义一种过滤条件都需要新建一个类，这时我们可以进一步优化。

### 优化二：使用匿名内部类

```java
// 匿名内部类
@Test
public void t6() {
    List<Employee> employees = filterEmployees(this.employees, new MyPredicate<Employee>() {
        @Override
        public boolean condition(Employee employee) {
            return employee.getAge() > 40;
        }
    });
    for (Employee employee : employees) {
        System.out.println(employee);
    }
}
```
这时，我们需要什么样的条件只需要在`匿名内部类`中进行编写即可，不需要编写新的类，但匿名内部类的形式还是显得不够简洁，可读性不够高。

### 优化三：使用Lambda表达式
```java
// lambda表达式
@Test
public void t7() {
    List<Employee> employees = filterEmployees(this.employees, employee -> employee.getAge() > 30);
    employees.forEach(System.out::println);
}
```
可以看到代码简洁了很多，而且可读性也变高了。

### 优化四：使用Stream API
在上一步优化中，我们仍需手动定义过滤使用的接口和自定义的过滤函数，那么JDK中有没有直接可以“拿来”的工局呢？Stream API就是JDK中提供的专门用来进行过滤操作的工具，使用方式如下：
```java
// Stream API
@Test
public void t8() {
    employees.stream()
            .filter(employee -> employee.getSalary() >= 3000)
            .forEach(System.out::println);
    System.out.println("---------------");
    // 得到其中所有的字段
    employees.stream()
            .map(Employee::getName)
            .forEach(System.out::println);
}
```
运行结果：

```java
Employee(name=李四, age=38, salary=3999.9)
Employee(name=王五, age=50, salary=5999.9)
Employee(name=田七, age=16, salary=4999.9)
---------------
张三
李四
王五
赵六
田七
```

## 二、Lambda运算符和对应语法
![在这里插入图片描述](https://img2020.cnblogs.com/blog/2489898/202108/2489898-20210803230009954-681113283.png)
### 语法格式
语法格式一：无参数，无返回值
`() -> System.out.println("hello world");`
```java
@Test
public void t1() {
    Runnable r = new Runnable() {
        @Override
        public void run() {
            System.out.println("Hello world");
        }
    };
    r.run();
    System.out.println("-------------------------");
    Runnable r1 = () -> System.out.println("Hello Lambda");
    r1.run();
}
```

语法格式二：有一个参数，而且无返回值
`(x) -> System.out.println(x);`

```java
@Test
public void t2() {
    Consumer<String> con = (s) -> System.out.println(s);
    con.accept("我大尚硅谷威武");
}
```
语法格式三：若只有一个参数，小括号可以省略不写
`x -> System.out.println(x);`

语法格式四：有两个以上的参数，有返回值，且Lambda体中有多条语句
```java
Comparator<Integer> comparator1 = (o1, o2) -> {
    System.out.println("函数式接口");
    return Integer.compare(o1, o2);
};
```
```java
@Test
public void t3() {
	// 使用匿名内部类
    Comparator<Integer> comparator = new Comparator<integer>() {
        @Override
        public int compare(Integer o1, Integer o2) {
            return Integer.compare(o1, o2);
        }
    };
	// 使用Lambda表达式
    Comparator<Integer> comparator1 = (o1, o2) -> {
        System.out.println("函数式接口");
        return Integer.compare(o1, o2);
    };
}
```
语法格式五：若Lambda体中只有一条语句，return和大括号都可以省略
`Comparator<Integer> comparator = (o1, o2) -> o1 - o2;  ` 
```java
@Test
public void t4() {
    Comparator<Integer> comparator = (o1, o2) -> o1 - o2;
    int compare = comparator.compare(6, 2);
    System.out.println(compare);
}
```

语法格式六：Lambda表达式的参数列表的数据类型可以省略不写，原：
`Comparator<Integer> comparator = (Integer o1, Integer o2) -> o1 - o2;`


口诀：
左右遇一括号省
左侧类型推断省

### Lambda表达式需要“函数式接口”的支持
函数式接口：接口中只有一个抽象方法的接口，可以使用注解`@FunctionalInterface`进行修饰

## 三、简单应用
1.调用Collections.sort() 方法，通过定制排序比较两个Employee (先按年龄比,年龄相同按Salary比)，使用Lambda作为参数传递。

准备数据：

```java
List<Employee> employees = Arrays.asList(
     	new Employee("张三", 18, 6999.9),
        new Employee("李四", 38, 3999.9),
        new Employee("王五", 50, 5999.9),
        new Employee("赵六", 19, 2999.9),
        new Employee("田七", 18, 4999.9)
);
```
客户端：
```java
@Test
public void t1() {
    employees.sort((o1, o2) -> {
        if (o1.getAge() != o2.getAge()) {
            return Integer.compare(o1.getAge(), o2.getAge());
        } else {
            return Double.compare(o1.getSalary(), o2.getSalary());
        }
    });
    employees.forEach(System.out::println);
}
```

2.①声明函数式接口，接口中声明抽象方法，`public String getValue(String str);`
    ②声明类`TestLambda` ，类中编写方法使用接口作为参数，将一个字符串转换成大写，
    并作为方法的返回值。
    
**函数式接口**
```java
@FunctionalInterface
public interface MyFunction {
    public String getValue(String str);
}
```
客户端：
```java
public String strHandler(String str, MyFunction mf) {
    return mf.getValue(str);
}

@Test
public void test2() {
    String res = strHandler("abcdefg", str -> str.toUpperCase());
    System.out.println(res);
}
```

3.①声明一个带两个泛型的函数式接口，泛型类型为`<t,r>` `T为参数，R为返回值`。
    ②接口中声明对应抽象方法。
    ③在TestLambda 类中声明方法，使用接口作为参数，计算两个long 型参数的和。
    ④再计算两个long 型参数的乘积。

**函数式接口**
```java
@FunctionalInterface
public interface MyFunction2<T> {
    public R getValue(T t1, T t2);
}
```
客户端：
```java
public void op(Long l1, Long l2, MyFunction2<Long, Long> mf) {
    System.out.println(mf.getValue(l1, l2));
}

@Test
public void t3() {
    op(100L, 200L, (t1, t2) -> t1 + t2);
    op(100L, 200L, (t1, t2) -> t1 * t2);
}
```

下一步：[Java8 Lambda表达式（二）](https://www.cnblogs.com/CodeReaper/p/15096902.html)