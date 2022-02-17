<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/d-login.png" alt="">
            <span>V-login</span>
        </div>
        <p>欢迎使用此系统</p>
        <div class="login-input">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
                 <el-form-item prop="email">
                    <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" circle @click="submitForm()">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
        <p class="register"><router-link class="registerRouter" to='/register'>还没账号？注册</router-link></p>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { ElForm } from 'element-plus'
import { userLogin } from '@/http/auth'
import { useRouter } from 'vue-router'

const formRef = ref<InstanceType<typeof ElForm>>()
const validatePass = (rule: any, value: any,callback: any)=>{
    if(value === ''){
        callback(new Error('请输入密码'))
    }else {
        if(ruleForm.pass !== value){
            callback(new Error('密码输入不一致'))
        }else{
            callback()
        }
    }
}
var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const validateEmail =(rule: any,value: any,callback: any)=>{
    if(value === ''){
        callback(new Error("请填写电子邮箱")) 
    }else if(!regEmail.test(value)){
        callback(new Error("请填写正确的电子邮箱"))
    }else {
        callback()
    }
}

const ruleForm = reactive({
    pass :'',
    email :'',
})

const router = useRouter()

const rules = reactive({
    pass :[{validator:validatePass,trigger:'blur'}],
    email :[{validator:validateEmail,trigger:'blur'}]
})

const submitForm = async() => {
    const param =  {
        email: ruleForm.email,
        pass : ruleForm.pass
    }
    await userLogin(param).then( response =>{
        const res: any = response.data
        if(res.code === 200) {
            router.push("/users")
        }
    })
}

</script>

<style lang='scss' scoped>
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
            margin-right: 10px;
            vertical-align: middle;
        }
    }
    :deep(.login-input){
        .el-form {
            .el-form-item {
                margin: 10px;
                width: 230px;
                padding: 10px;
                .el-input{
                    .el-input__inner{
                        border-radius: 30px !important;
                        text-align: center;
                    }
                }
                .el-button.is-circle {
                    border-radius: 30px !important;
                    padding: 8px;
                    width: 230px;
                }
            }
        }
    }
    .register{
        margin-left: 100px;
        font-size: 10px;
        .registerRouter{
            color: #fff;
            text-decoration: none;
        }
    }
}
</style>