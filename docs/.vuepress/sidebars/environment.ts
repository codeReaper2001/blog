import { HopeThemeSidebarItem } from "vuepress-theme-hope";

export default {
  text: "后端",
  icon: "api",
  prefix: "backend/",
  collapsable: true,
  children: [
    {
      text: "java基础",
      icon: "java",
      collapsable: true,
      prefix: "java基础/",
      children: [
        {
          text: "注解和反射",
          icon: "java",
          prefix: "注解和反射/",
          children: [
            "注解.md",
            "反射（一）反射简介、原理和应用场景.md",
            "反射（二）运行时获取类的信息.md",
          ]
        },
        {
          text: "java8特性",
          icon: "java",
          prefix: "java8特性/",
          children: [
            "Lambda表达式（一）.md",
            "Lambda表达式（二）.md",
            "Stream API的使用.md",
          ]
        }
      ],
    },
  ],
} as HopeThemeSidebarItem;
