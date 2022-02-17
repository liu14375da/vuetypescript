import {router} from '../router';
import { AppRouteModule } from "@/router/types";
export const useGoPage = (path:string) =>{
    router.push(path);

}
/**
 * 路由结构
 * routes 路由数组       二级路由 
 */
export const useRouteStructure = (routes:AppRouteModule[]):AppRouteModule[] =>{
    let formatRouteMenuList:AppRouteModule[]=[]
    for (let index = 0; index < routes.length; index++) {
        const element:AppRouteModule = routes[index];
        if(element.children) formatRouteMenuList =formatRouteMenuList.concat(element.children)
        else formatRouteMenuList.push(element)
      }
      return formatRouteMenuList
}