<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userList' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="elCard">
      <el-row :gutter="20">
        <el-col :span="8" class="elCol">
          <el-input placeholder="请输入搜索邮箱" v-model="overallData.query" clearable>
            <template #append>
              <el-button @click="searchButton()"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="2" class="elColButton">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 10px;">
        <el-table border stripe :data="overallData.list">
          <el-table-column label="编号" prop="id"></el-table-column>
          <el-table-column label="邮箱" prop="Email"></el-table-column>
          <el-table-column label="角色" prop="IsAdmin">
            <template #default="scope">
              <span :style="{ color: scope.row.IsAdmin === '1' ? '#cccccc' : '#ED3F14' }">{{ scope.row.IsAdmin === '1' ? '普通会员' : '管理员' }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="状态">
            <template #default="scope">
              <el-button type="text" size="small" @click="deleteRow(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" v-if="scope.row.IsAdmin !== '0'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="overallData.dialogFormVisible" title="用户详情">
    <el-form :model="overallData" :rules="rules">
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="overallData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码修改" :label-width="formLabelWidth">
        <el-switch v-model="overallData.value3" inline-prompt active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item prop="pwd" v-if="overallData.value3 === true" label="密码" :label-width="formLabelWidth">
        <el-input v-model="overallData.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkPwd" v-if="overallData.value3 === true" label="确认密码" :label-width="formLabelWidth">
        <el-input v-model="overallData.checkPwd" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="overallData.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="update()">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang= "ts" setup>
import { Search } from "@element-plus/icons";
import { reactive, onMounted,ref } from "vue";
import { userList,updateUser,searchEmail } from "@/http/auth";
import { ElMessage } from 'element-plus';
const array:any[] = []
const overallData = reactive({
    query: '',
    list:array,
    dialogFormVisible :false,
    value3:false,
    email: '',
    pwd: '',
    checkPwd:'',
    id:'',
});

const formLabelWidth = '140px'

const deleteRow = (res:any) => {
  overallData.dialogFormVisible = true
  overallData.id = res
}

const validatorpass = (rule: any,value: any,callback: any)=>{
  if(overallData.value3 === true){
    if(value === ''){
        callback(new Error("请输入密码"))
    }else {
        callback()
    }
  }
}

const validatorcheckpass = (rule: any,value: any,callback: any)=>{
  if(overallData.value3 === true){
    if(value === ''){
        callback(new Error("请输入确认密码"))
    }else if(value !== overallData.checkPwd){
        callback(new Error("密码不一致,请重新输入密码"))
    }else {
        callback()
    }
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
    pwd :[{validator:validatorpass,trigger:'blur',required: true}],
    checkPwd :[{validator:validatorcheckpass,trigger:'blur',required: true}],
    email :[{validator:validatoremail,trigger:'blur',required: true}],
})

onMounted(() => {
  userList().then((response) => {
    const res: any = response.data;
    if (res.code === 200) {
      overallData.list=res.data
      console.log(res.data)
    } 
  });
});

const open = () => {
  ElMessage({
    type: 'success',
    message: '修改成功',
  })
}

const update = async() => {
  const param =  {
    email: overallData.email,
    pass : overallData.pwd,
    id : overallData.id
  }
  await updateUser(param).then((response) => {
    const res: any = response.data;
    if (res.code === 200) {
      open()
      overallData.dialogFormVisible = false
      overallData.email = ''
      userList().then((response) => {
        const res: any = response.data;
        if (res.code === 200) {
          overallData.list=res.data
          console.log(res.data)
        } 
      });
    }
  });
}

const searchButton = async() => {
  const param = {
    email : overallData.query
  }
  overallData.list = []
  await searchEmail(param).then((response) => {
    const res: any = response.data;
    if (res.code === 200) {
      overallData.list.push(res.data)
    }
  })  
}
</script>

<style lang="scss" scoped>
.elCard {
  margin-top: 10px;
}

.elCol {
  display: flex;
}
</style>