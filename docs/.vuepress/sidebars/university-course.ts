import { HopeThemeSidebarItem } from "vuepress-theme-hope";

export default {
  text: "大学课程",
  prefix: "/university-course/",
  collapsable: true,
  icon: "study",
  children: [
    {
      text: "计算机网络",
      prefix: "计算机网络/",
      collapsable: true,
      icon: "network",
      children: "structure"
    },
    {
      text: "数据库系统",
      prefix: "数据库系统/",
      collapsable: true,
      icon: "mysql",
      children: "structure"
    }
  ]
} as HopeThemeSidebarItem;
