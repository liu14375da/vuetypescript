<template>
  <div class="login">
        <div class="logo">
           <img src="../assets/d-login.png" alt="">
           <span>V-Register</span>
        </div>
        <p>已有账号？<router-link class="register" to="/">登录</router-link></p>
        <div class="input-register">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
                <el-icon><Avatar/></el-icon>
                <span class="titleSpan">邮箱</span>
                <el-form-item prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-icon><Message /></el-icon>
                <span class="titleSpan">邮箱验证码</span>
                <el-form-item prop="eamilcode">
                    <el-input v-model="ruleForm.eamilcode">
                        <template #suffix>
                            <el-button class="geteamil" @click="send()" type="text" >获取验证码</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-icon><Camera /></el-icon>
                <span class="titleSpan">密码</span>
                <el-form-item prop="pass">
                    <el-input v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-icon><Camera /></el-icon>
                <span class="titleSpan">确认密码</span>
                <el-form-item prop="checkpass">
                    <el-input v-model="ruleForm.checkpass"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button class="registerButton" type="primary" @click="register()">注册</el-button>
                </el-form-item>
            </el-form>
        </div>

         <el-dialog v-model="dialogVisible" title="注册" width="30%" :before-close="handleClose" >
            <span>恭喜你注册成功!</span>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="goToLogin()"
                    >确定</el-button
                >
                </span>
            </template>
            </el-dialog>
   </div>
</template>
<script lang='ts' setup>
import {  Avatar,Message,Camera } from '@element-plus/icons';
import { ref, reactive ,unref} from 'vue';
import type { ElForm } from 'element-plus'
import { sendEmail,userRegister } from '@/http/auth'
import { useRouter } from 'vue-router'

const ruleFormRef = ref()

const dialogVisible = ref(false)

const router = useRouter()

const ruleForm =reactive({
    email :'',
    eamilcode :'',
    pass:'',
    checkpass:'',
    id :'',
})
const send = async() =>{
    const param =  {
        email: ruleForm.email,
    }
    await sendEmail(param).then(response => {
        const res: any = response.data
        if(res.code === 200){
            console.log(res)
            ruleForm.id = res.emailId
            localStorage.setItem('ACCESS_TOKEN', res.data);
        }     
    })
}

const register = async() => {
    const param =  {
        email: ruleForm.email,
        pass : ruleForm.pass,
        code : ruleForm.eamilcode,
        id : ruleForm.id,
    }
    const form = unref(ruleFormRef)
    if(!form){
        return
    }
    try {
        await form.validate()
        await userRegister(param).then(response => {
            const res: any = response.data
            if (res.code === 200){
                dialogVisible.value = true
            }
        })
      } catch (err) {
        console.log(err)
      }
    
}

const goToLogin = () => {
    router.push("/")
}



const validatorEamilcode = (rule: any,value: any,callback: any)=>{
    if(value === ''){
        callback(new Error("请输入验证码"))
    }else {
        callback()
    }
}

const validatorpass = (rule: any,value: any,callback: any)=>{
    if(value === ''){
        callback(new Error("请输入密码"))
    }else {
        callback()
    }
}

const validatorcheckpass = (rule: any,value: any,callback: any)=>{
    if(value === ''){
        callback(new Error("请输入确认密码"))
    }else if(value !== ruleForm.pass){
        callback(new Error("密码不一致,请重新输入密码"))
    }else {
        callback()
    }
}

var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const validatoremail = (rule: any,value: any,callback: any)=>{
    if(value === ''){
        callback(new Error("请输入邮箱"))
    }else if(!regEmail.test(value)){
        callback(new Error("请输入正确的邮箱"))
    }else {
        callback()
    }
} 

const rules = reactive({
    eamilcode :[{validator:validatorEamilcode,trigger:'blur'}],
    pass :[{validator:validatorpass,trigger:'blur',required: true}],
    checkpass :[{validator:validatorcheckpass,trigger:'blur',required: true}],
    email :[{validator:validatoremail,trigger:'blur',required: true}],
})

</script>

<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100vh;
    background: rgb(48,49,62);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    .logo{
        color:rgb(3,174,189);
        font-weight: bold;
        font-size: 30px;
        margin-bottom: 10px;
        img{
            width: 74px;
            vertical-align: middle;
            margin-right:10px;
        }
    }
    :deep(.input-register){
        .el-form{
            font-size: 14px;
            font-weight: 300;
            margin-top: 10px;
            .el-icon{
                vertical-align: middle;
                font-size: 20px;
                margin-left: 20px;
            }
            .el-form-item{
                width: 230px;
                margin: 10px;
                padding: 10px;
                .el-input{
                    .el-input__inner{
                        border-radius: 30px!important;
                    }
                    .geteamil{
                        color: rgb(180, 124, 124);
                    }
                }
                .registerButton{
                    width: 230px;
                }
            }
            .titleSpan{
                margin-left: 10px;
            }
        }
    }
    .register{
        color: #fff;
        text-decoration: none;
    }
}
</style>