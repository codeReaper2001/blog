import { defineSidebarConfig } from "vuepress-theme-hope";
import singlechip from "./sidebars/singlechip";
import frontend from './sidebars/frontend';
import universityCourse from './sidebars/university-course'
import backend from './sidebars/backend'

export default defineSidebarConfig([
  "",
  frontend,
  backend,
  universityCourse,
  singlechip,
]);
