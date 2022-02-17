<template>
  <div class="common-layout">
    <el-container class="containerHeight">
        <el-header>
            <div class="headerDiv">
                <img src="../assets/d-login.png" alt="" >
                <span>admin</span>
            </div>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    登出<el-icon class="el-icon--right"></el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" :router="true" background-color="#545c64" class="el-menu-vertical-demo" default-active="2" text-color="#fff">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon class="elIcon"><Avatar /></el-icon>
                    <span>用户管理</span>
                </template>
                <div class="divUser">
                    <el-menu-item style="padding:0" index="/user"><el-icon :size="30"><Notebook /></el-icon>用户列表</el-menu-item>
                </div>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon class="elIcon"><Avatar /></el-icon>
                    <span>图书管理</span>
                </template>
                <div class="divUser">
                    <el-menu-item style="padding:0" index="/book"><el-icon :size="30"><Notebook /></el-icon>图书列表</el-menu-item>
                </div>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang='ts' setup>
import {  Avatar,Notebook} from '@element-plus/icons';
import { watch } from 'vue-demi';

</script>
<style lang="scss">
.common-layout {
    .containerHeight{
        height: 100vh;
        width: 100vw;
        text-align: center;
    }
    .el-header{
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        font-size: 20px;
        .headerDiv{
            display: flex;
            align-items: center;
        }
    }
    .el-footer {
        background-color: #f0f3f5;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 100vh;
    }

    .elIcon{
        display: flex;
        width: 20px;
        margin-right: 10px;
        size: 20px;
    }

    .divUser{
        margin-left: 20px;
    }

    .el-footer {
        line-height: 100vh;
    }

    .el-sub-menu{
        width: 200px;
    }

    .el-aside {
        background-color: #555c63;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 199px;
    }

    .el-main {
        background-color: #e9eef3;
        color: var(--el-text-color-primary);
        text-align: center;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
}
</style>