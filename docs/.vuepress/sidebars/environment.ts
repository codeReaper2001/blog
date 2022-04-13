import { HopeThemeSidebarItem } from "vuepress-theme-hope";

export default {
  text: "环境配置",
  prefix: "/environment/",
  collapsable: true,
  icon: "setting",
  children: [
    "01CLion结合vcpkg以及GTest的使用.md",
    "02PHP、TP6框架及JavaScript的单步调试.md",
    "03Wireshark抓包工具解析HTTPS包.md",
    "04连接虚拟机中的redis-server.md",
  ]
} as HopeThemeSidebarItem;
