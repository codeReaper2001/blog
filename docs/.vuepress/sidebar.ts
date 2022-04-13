import { defineSidebarConfig } from "vuepress-theme-hope";
import singlechip from "./sidebars/singlechip";
import frontend from './sidebars/frontend';
import universityCourse from './sidebars/university-course'
import backend from './sidebars/backend'
import environment from './sidebars/environment'

export default defineSidebarConfig([
  "",
  frontend,
  backend,
  universityCourse,
  singlechip,
  {
    text: "正则表达式",
    prefix: "/regex/",
    collapsable: true,
    icon: "regexp",
    children: [
      "01正则表达式介绍.md",
      "02Java中正则表达式的使用.md",
    ]
  },
  environment
]);
