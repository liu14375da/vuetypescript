import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ElButton, ElForm, ElFormItem,ElCard ,ElInput,ElBreadcrumb, ElRow, ElCol,ElTable,ElSwitch,ElBreadcrumbItem,
    ElContainer, ElHeader, ElAside, ElMain,ElMenu,ElSubMenu,ElIcon,ElDialog,ElOption,ElSelect,ElMessage,
    ElMenuItem ,ElDropdown} from 'element-plus'
import 'element-plus/dist/index.css';
import Antd from 'ant-design-vue'
import VueAxios from 'vue-axios'
import { Request } from './http/reauest';


createApp(App)
    .use(ElButton)
    .use(ElContainer)
    .use(Antd)
    .use(VueAxios, Request.init())
    .use(router)
    .use(ElBreadcrumb)
    .use(ElSelect)
    .use(ElMessage)
    .use(ElOption)
    .use(ElDialog)
    .use(ElBreadcrumbItem)
    .use(ElSwitch)
    .use(ElCard)
    .use(ElTable)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(ElMenu)
    .use(ElIcon)
    .use(ElCol)
    .use(ElRow)
    .use(ElSubMenu)
    .use(ElDropdown)
    .use(ElMenuItem)
    .use(ElHeader)
    .use(ElAside)
    .use(ElMain)
    .mount('#app')
