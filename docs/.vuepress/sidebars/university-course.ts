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
    },
    {
      text: "数据库系统",
      prefix: "数据库系统/",
      collapsable: true,
      icon: "mysql",
      children:[
        "01基础查询与过滤数据.md",
        "02数据排序和单行函数.md",
        "03分组函数和分组查询.md",
        "04联表查询.md",
        "05子查询.md",
        "06分页查询和联合查询.md",
      ]
    }
  ]
} as HopeThemeSidebarItem;
