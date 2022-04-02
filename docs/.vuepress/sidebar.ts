import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig([
  "",
  {
    text: "前端",
    icon: "note",
    prefix: "frontend/",
    collapsable: true,
    children: [
      {
        text: "CSS",
        icon: "note",
        // collapsable: true,
        prefix: "css/",
        children: [
          "浮动属性.md",
          "定位属性position.md"
        ],
      },
      {
        text: "Typescript",
        icon: "note",
        // collapsable: true,
        prefix: "typescript/",
        children: [
          "环境搭建和数据类型.md",
        ],
      },
    ],
  },
]);
