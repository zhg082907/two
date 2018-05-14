<template lang="html">
  <div class="">
    <div class="tal">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="searchFrom.userName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="searchFrom.loginName" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          <el-button type="warning" size="small" @click="cleanForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <el-row class="tal p10">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="newDialogVisible = true">新增</el-button>
  </el-row>
  <el-row>
    <el-table
    :data="tableData"
    height="400"
    border
    style="width: 100%">
    <el-table-column
      prop="userName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="loginName"
      label="账号">
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="创建时间">
    </el-table-column>
    <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="changePwd(scope.$index, scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="!(scope.row.loginName == 'admin')"
              @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
  </el-table>
  </el-row>
  <el-row class="tal p10">
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  </el-row>

  <!-- 新增用户对话框 -->
    <el-dialog
    title="新增用户"
    :visible.sync="newDialogVisible"
    width="30%"
    center>
      <el-form :label-position="labelPosition" :rules="addUserRules" :model="newData" ref="newData" label-width="80px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="newData.userName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="loginName">
          <el-input v-model="newData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="pwd">
          <el-input type="password" v-model="newData.pwd"></el-input>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveAddUser('newData')">确 定</el-button>
      <el-button @click="newDialogVisible = false">取 消</el-button>
    </span>
    </el-dialog>

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
// 用户管理
import {
  userPage,
  userDel,
  userAdd,
  updPwd
} from '../../axios/api'
import common from '../../common/index'
export default {
  name: 'userManage',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.uptPwd.newPwd) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    }
    var validateUserName = (rule, value, callback) => {
      var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
      if(regEn.test(value) || regCn.test(value)) {
        callback(new Error('姓名不能包含特殊字符'))
      }else{
        callback()
      }
    }
    var validateLoginName = (rule, value, callback) => {
      var g = /^[a-zA-Z0-9]{1,20}$/
      if(g.test(value)){
        callback()
      }else{
        callback(new Error('请输入数字或字母'))
      }
    }
    return {
      searchFrom:{
        userName:'',
        loginName:''
      },
      newDialogVisible: false,
      pwdDialogVisible: false,
      labelPosition: 'left',
      newData: {
        userName: '',
        loginName: '',
        pwd: ''
      },
      uptPwd: {
        oldPwd: '',
        newPwd: '',
        newPwdRe: '',
        userId: ''
      },
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      addUserRules: {
        userName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '长度至多20位',
            trigger: 'blur'
          },
          {
            validator: validateUserName,
            trigger: 'blur'
          }],
        loginName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '长度至多20位',
            trigger: 'blur'
          },
          {
            validator: validateLoginName,
            trigger: 'blur'
          }],
        pwd: [{
            required: true,
            message: '请输入密码',
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
          }]
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
    this.loadData()
  },
  watch: {
    pwdDialogVisible(newValue, oldValue) {
      var that = this
      if(!newValue) {
        that.uptPwd.oldPwd = ''
        that.uptPwd.newPwd = ''
        that.uptPwd.newPwdRe = ''
        that.uptPwd.userId = ''
        that.$refs['uptPwd'].resetFields()
      }
    },
    newDialogVisible(newValue, oldValue) {
      var that = this
      if(!newValue) {
        that.newData.userName = ''
        that.newData.loginName = ''
        that.newData.pwd = ''
        that.$refs['newData'].resetFields()
      }
    }
  },
  methods: {
    /**
     * 修改密码
     * @return {[type]} [description]
     */
    changePwd(index, row) {
      console.log(index)
      console.log(row)
      var that = this
      that.uptPwd.userId = row.userId
      that.pwdDialogVisible = true
    },
    //保存修改密码数据
    saveUptPwd(formName) {
      var that = this
      var token = common.storage.get('token')
      that.$refs[formName].validate( (valid) => {
        if(valid) {
          var sendData = {
            userId: that.uptPwd.userId,
            oldPwd: that.uptPwd.oldPwd,
            newPwd: that.uptPwd.newPwd
          }
          updPwd(sendData, token).then(res => {
            console.log(res)
            var resJson = res.data
            if(resJson && resJson.data && resJson.data.code === 0) {
              //修改成功
              that.$message({
                type: 'success',
                message: '修改成功'
              })
              that.$refs[formName].resetFields()
              that.pwdDialogVisible = false
              that.loadData()
            }else {
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
        }else {
          return false
        }
      })
    },
    //添加用户
    saveAddUser(formName) {
      var that = this
      let token = common.storage.get('token')
      that.$refs[formName].validate((valid) => {
        if (valid) {
          userAdd(that.newData, token).then(res => {
            var resJson = res.data
            if (resJson && resJson.data && resJson.data.code === 0) {
              //添加成功
              that.$message({
                type: 'success',
                message: '添加成功'
              })
              that.$refs[formName].resetFields()
              that.newDialogVisible = false
              that.loadData()
            } else {
              //添加失败
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
    //删除用户
    deleteUser(index, row) {
      var that = this
      var token = common.storage.get('token')
      that.$alert('删除之后不可恢复数据', '确认删除此用户？', {
        confirmButtonText: '确定',
        callback: action => {
          //点击的回调函数
          if (action === 'confirm') {
            //点击确认
            let sendData = {
              userId: row.userId
            }
            userDel(sendData, token).then(res => {
              var resJson = res.data
              if (resJson && resJson.code === 0) {
                //添加成功
                that.$message({
                  type: 'success',
                  message: '删除成功'
                })
                that.loadData()
              } else {
                that.$message({
                  type: 'warning',
                  message: '删除失败'
                })
              }
            }).catch(err => {
              console.log(err)
              that.$message({
                type: 'error',
                message: '数据请求失败'
              })
            })
          } else {
            //点击其他
            this.$message({
              type: 'info',
              message: `取消删除`
            })
          }

        }
      })
    },
    /**
     * 点击查询按钮进行数据查询
     * @return {[type]} [无返回]
     */
    onSubmit() {
      console.log(this.searchFrom)
      this.loadData()
    },
    /**
     * 清空查询条件
     * @return {[type]} [无返回]
     */
    cleanForm() {
      this.searchFrom.userName = '';
      this.searchFrom.loginName = '';
    },
    /**
     * 加载用户数据
     * @return {[type]} [无]
     */
    loadData() {
      var that = this
      var token = common.storage.get('token')
      var loginName = common.storage.get('userName')
      let data = {
        userName: that.searchFrom.userName,
        loginName: that.searchFrom.loginName,
        pageNum: that.pageNum,
        pageSize: that.pageSize
      }
      userPage(data, token).then(res => {
        console.log(res.data)
        if (res.data && res.data.code === 0) {
          //拿到的数据是正确的
          that.pageNum = res.data.data.pageNum
          that.pageSize = res.data.data.pageSize
          that.total = res.data.data.total
          that.tableData = res.data.data.list

        } else {
          //拿到的数据是错误的
          that.$message.warning('数据加载失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 改变当前pageSize
     * @param  {[type]} val [pageSize]
     * @return {[type]}     [无]
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.loadData()
    },
    /**
     * 改变当前页码数
     * @param  {[type]} val [key]
     * @return {[type]}     [无]
     */
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadData()
    }
  }
}
</script>

<style lang="css">
</style>
