import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "前端",
    icon: "note",
    prefix: "/frontend/",
    children: [
      {
        text: "CSS",
        link: "css/浮动属性.md"
      },
      {
        text: "Typescript",
        link: "typescript/环境搭建和数据类型.md"
      }
    ],
  },
  {
    text: "后端",
    icon: "note",
    prefix: "/backend/",
    children: [
      {
        text: "jvm",
        link: ""
      },
      {
        text: "java并发编程",
        link: ""
      },
      {
        text: "mysql",
        link: ""
      },
      {
        text: "redis",
        link: ""
      },
    ],
  },
  {
    text: "大学课程",
    icon: "note",
    prefix: "/university-course/",
    children: [
      {
        text: "操作系统",
        link: ""
      },
      {
        text: "计算机网络",
        link: ""
      },
    ],
  },
]);
