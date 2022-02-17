import { useCssVar } from "@vueuse/core";
import {store, sysThemeList} from '@/store';
//顶部导航文字颜色
const navColorFont = useCssVar("--navColorFont");
//顶部导航背景颜色
const navColorBg = useCssVar("--navColorBg");

//菜单 start
const menuColorFont = useCssVar("--menuColorFont");
//顶部导航背景颜色
const menuColorBg = useCssVar("--menuColorBg");
//菜单 end
export interface SwitchColor {
    ColorFont:string,
    ColorBg:string,
}
export const initThemeColor =()=>{
    let themeColor:string[] =JSON.parse(localStorage.getItem("themeColor")|| JSON.stringify(store.state.themeColor))  
    console.log('themeColor :>> ', themeColor);
    document.documentElement.style.setProperty("--color-red",themeColor[0]);
    document.documentElement.style.setProperty("--color-green",themeColor[1]);
    document.documentElement.style.setProperty("--color-blue", themeColor[2]);
}
export const switchColorNav = (dataColor:SwitchColor) => {
    store.commit("setThemeCurrentNavItem",dataColor)
    navColorFont.value =dataColor.ColorFont
    navColorBg.value =dataColor.ColorBg
};
//单独设置 导航色 字体颜色
export const switchColorNavFont = (dataColor:SwitchColor) => {
    store.commit("setThemeCurrentNavItem",dataColor)
    navColorFont.value =dataColor.ColorFont
};
//单独设置 导航色 字体颜色
export const switchColorNavBg = (dataColor:SwitchColor) => {
    store.commit("setThemeCurrentNavItem",dataColor)
    navColorBg.value =dataColor.ColorBg
};
export const switchColorMenu = (dataColor:SwitchColor) => {
    store.commit("setThemeCurrentMenuItem",dataColor)
    menuColorFont.value =dataColor.ColorFont
    menuColorBg.value =dataColor.ColorBg
};
//顶部导航文字颜色
const initTheme = ()=>{
    //获取顶部导航主题
    let themeNav:SwitchColor =JSON.parse(localStorage.getItem("themeNav")|| JSON.stringify(sysThemeList[0].themeNav))  
    let themeMenu:SwitchColor =JSON.parse(localStorage.getItem("themeMenu")|| JSON.stringify(sysThemeList[0].themeMenu))  
    let themecolor:string[] =JSON.parse(localStorage.getItem("themeColor")|| JSON.stringify(sysThemeList[0].themeColor))  
    let navTitleColorFont:string =localStorage.getItem("navTitleColorFont")|| sysThemeList[0].navTitleColorFont
    //获取本地存储的通栏状态
    let isFull:boolean =JSON.parse(localStorage.getItem("isFull")|| "false")  
    store.commit("setIsFull",isFull)
    switchColorNav(themeNav)//初始化导航
    switchColorMenu(themeMenu)//初始化菜单
    store.commit("setThemeColor",themecolor)
    store.commit("setNavTitleColorFont",navTitleColorFont)
    initThemeColor()//初始化导航
}
export default initTheme