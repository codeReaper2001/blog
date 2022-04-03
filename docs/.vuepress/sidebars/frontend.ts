import { HopeThemeSidebarItem } from "vuepress-theme-hope";

export default {
  text: "前端",
  icon: "news",
  prefix: "frontend/",
  collapsable: true,
  children: [
    {
      text: "CSS",
      icon: "launch",
      // collapsable: true,
      prefix: "css/",
      children: [
        "浮动属性.md",
        "定位属性position.md"
      ],
    },
    {
      text: "Typescript",
      icon: "typescript",
      // collapsable: true,
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
      prefix: "vue/",
      children: [
        "01简单使用和插值操作.md",
        "02动态绑定、计算属性和事件监听.md",
        "03条件渲染和循环渲染.md",
        "04JavaScript补充知识点和v-model的使用.md"
      ],
    },
  ],
} as HopeThemeSidebarItem;
