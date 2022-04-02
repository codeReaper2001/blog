import { HopeThemeSidebarItem } from "vuepress-theme-hope";

export default {
    text: "单片机",
    prefix: "singlechip/",
    collapsable: true,
    icon: "note",
    children: [
        "01项目的建立和vscode代码编辑环境的设置.md",
        "02开发板LED灯的控制.md",
        "03开发板动态数码管的控制.md",
        "04蜂鸣器和独立按键的使用.md",
        "05LCD1602和矩阵键盘的使用.md",
        "06定时器的使用.md",
        "07串口.md",
        "08点阵LED的使用.md",
        "09定时器扫描按钮和数码管与PWM的使用.md",
        "10红外遥控与外部中断.md",
        "11-I2C总线和AT24C02的使用.md",
        "12-1-Wire通信协议和DS18B20温度传感器.md",
    ]
} as HopeThemeSidebarItem;
