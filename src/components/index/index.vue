<template lang="html">
  <div class="">
    <el-container >
  <el-header>
    <el-row>
      <el-col :span="12" class="tal">
        <img :src="logoImg" alt="">
      </el-col>
      <el-col :span="12" class="pull-right">
        <el-row>
          <el-col :span="12">&nbsp;
          </el-col>
          <el-col :span="6">&nbsp;
          </el-col>
          <el-col :span="6">
            <el-dropdown :hide-on-click="false" @command="handleCommand" class="pull-right">
              <span class="el-dropdown-link">
                {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">青海粮食云</el-breadcrumb-item>
    <el-breadcrumb-item>军供站数据字典</el-breadcrumb-item>
  </el-breadcrumb>
  <el-container :style="{minHeight: containerMinHeight + 'px'}">
    <el-aside width="200px">
      <el-menu
            default-active="1"
            router
            class=""
            background-color="#f4f6f9"
            text-color="#536a8c"
            active-text-color="#0070d2"
            @select="handelSelect"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="priceManage">
              <i class="el-icon-edit"></i>
              <span slot="title">价格维护</span>
            </el-menu-item>
            <el-menu-item index="businessManage">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">客商维护</span>
            </el-menu-item>
            <el-menu-item index="dataQuery">
              <i class="el-icon-zoom-in"></i>
              <span slot="title">价格与客商查询</span>
            </el-menu-item>
            <el-menu-item index="salesData">
              <i class="el-icon-document"></i>
              <span slot="title">销售报表</span>
            </el-menu-item>
            <el-menu-item index="userManage" v-if="user.userName == '管理员'">
              <i class="el-icon-news"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
          </el-menu>
    </el-aside>
    <el-main><router-view/></el-main>
  </el-container>
</el-container>


<!-- 修改密码对话框 -->
  <el-dialog
    title="修改密码"
    :visible.sync="pwdDialogVisible"
    width="30%"
    center>
      <el-form :label-position="labelPosition" :rules="uptPwdRules" :model="uptPwd" ref="uptPwd" label-width="100px">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="uptPwd.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="uptPwd.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码"  prop="newPwdRe">
          <el-input type="password" v-model="uptPwd.newPwdRe"></el-input>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveUptPwd('uptPwd')">确 定</el-button>
      <el-button @click="pwdDialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
  </div>


</template>

<script>
// 首页
import logo from '../../assets/img/cloud-logo.png'
import Login from '@/components/login/index'
import common from '../common/index'
import {
  updPwd
} from '../axios/api'
export default {
  name: 'index',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.uptPwd.newPwd) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    }
    return {
      logoImg: logo,
      pwdDialogVisible: false,
      labelPosition: 'left',
      containerMinHeight: 500,
      uptPwd: {
        oldPwd: '',
        newPwd: '',
        newPwdRe: ''
      },
      user: {
        userName: '',
        userId: '',
        token: ''
      },
      uptPwdRules: {
        oldPwd: [{
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度至少6位',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '长度至多20位',
            trigger: 'blur'
          }],
        newPwd: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '长度至少6位',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '长度至多20位',
            trigger: 'blur'
          }],
        newPwdRe: [{
            required: true,
            message: '请重复输入新密码',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }]
      }
    }
  },
  mounted() {
    // 进入首页默认进到价格维护页面
    let userName = common.storage.get('userName')
    let userId = common.storage.get('userId')
    let token = common.storage.get('token')

    this.user.userName = userName
    this.user.userId = userId
    this.user.token = token
    if (token) {
      //如果 已经登录，则跳转到第一个菜单
      this.$router.push('/priceManage')
    } else {
      //如果未登录，则跳转到登录页面
      this.$router.push('/login')
    }
    this.getMinHeight()
  },
  watch: {
    pwdDialogVisible(newValue, oldValue) {
      var that = this
      if (!newValue) {
        that.uptPwd.oldPwd = ''
        that.uptPwd.newPwd = ''
        that.uptPwd.newPwdRe = ''
        that.uptPwd.userId = ''
        that.$refs['uptPwd'].resetFields()
      }
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        //退出登录
        common.storage.clear() //清空本地sessionStorage中的用户信息数据
        location.reload() //刷新当前页面
      } else if (command === 'updatePassword') {
        this.pwdDialogVisible = true
      }
    },
    getMinHeight() {
      this.containerMinHeight = window.innerHeight - 60 - 43
    },
    //保存修改密码数据
    saveUptPwd(formName) {
      var that = this
      var token = common.storage.get('token')
      that.$refs[formName].validate((valid) => {
        if (valid) {
          var sendData = {
            userId: that.user.userId,
            oldPwd: that.uptPwd.oldPwd,
            newPwd: that.uptPwd.newPwd
          }
          updPwd(sendData, token).then(res => {
            console.log(res)
            var resJson = res.data
            if (resJson && resJson.data && resJson.data.code === 0) {
              //修改成功
              that.$message({
                type: 'success',
                message: '修改成功'
              })
              that.$refs[formName].resetFields()
              that.pwdDialogVisible = false
            } else {
              //修改失败
              that.$message({
                type: 'info',
                message: resJson.data.msg
              })
            }
          }).catch(err => {
            that.$message({
              type: 'error',
              message: '数据请求失败'
            })
          })
        } else {
          return false
        }
      })
    },
    handelSelect(index, indexPath) {
      console.log(index, indexPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="css">
.el-header {
    line-height: 55px;
    height: 55px;
    color: #fff;
    background: #1e4683;
  }

  .el-aside {
    background-color: rgb(244, 246, 249);
    color: #333;
    text-align: center;
    line-height: 200px;
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

  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }
  .breadcrumb {
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    padding-left: 20px;
    background-color: #f4f6f9;
    border-bottom: 1px solid #008FC6;
  }
  .el-menu-item {
    text-align: left;
  }
</style>
