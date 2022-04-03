import { HopeThemeSidebarItem } from "vuepress-theme-hope";

export default {
  text: "大学课程",
  prefix: "university-course/",
  collapsable: true,
  icon: "study",
  children: [
    {
      text: "计算机网络",
      prefix: "计算机网络/",
      collapsable: true,
      icon: "network",
      children:[
        "01概述.md",
        "02物理层.md",
        "03应用层.md",
        "04传输层.md",
      ]
    }
  ]
} as HopeThemeSidebarItem;
