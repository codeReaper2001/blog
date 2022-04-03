import { HopeThemeSidebarItem } from "vuepress-theme-hope";

export default {
  text: "前端",
  icon: "news",
  prefix: "/frontend/",
  collapsable: true,
  children: [
    {
      text: "CSS",
      icon: "launch",
      collapsable: true,
      prefix: "css/",
      children: [
        "浮动属性.md",
        "定位属性position.md",
        "display属性.md",
        "flex布局.md",
        "grid布局.md",
      ],
    },
    {
      text: "Typescript",
      icon: "typescript",
      collapsable: true,
      prefix: "typescript/",
      children: [
        "环境搭建和数据类型.md",
        "函数和类【面向对象】.md",
        "泛型、模块化和命名空间.md",
        "装饰器.md"
      ],
    },
    {
      text: "Vue",
      icon: "vue",
      collapsable: true,
      prefix: "vue/",
      children: "structure",
    },
  ],
} as HopeThemeSidebarItem;
