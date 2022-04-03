import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "前端",
    icon: "news",
    prefix: "/frontend/",
    children: [
      {
        text: "CSS",
        link: "css/浮动属性.md"
      },
      {
        text: "Typescript",
        link: "typescript/环境搭建和数据类型.md"
      },
      {
        text: "Vue",
        link: "vue/01简单使用和插值操作.md"
      }
    ],
  },
  {
    text: "后端",
    icon: "api",
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
    icon: "study",
    prefix: "/university-course/",
    children: [
      {
        text: "操作系统",
        link: ""
      },
      {
        text: "计算机网络",
        link: "计算机网络/01概述.md"
      },
      {
        text: "数据库系统",
        link: "数据库系统/01基础查询与过滤数据.md"
      },
    ],
  },
]);
