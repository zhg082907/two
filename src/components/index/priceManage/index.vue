<template lang="html">
  <div class="">
    <div class="tal">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="生效时间">
          <el-date-picker
            v-model="searchFrom.forceTime"
            type="daterange"
            :clearable="clearable" 
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="当前生效">
          <el-switch v-model="searchFrom.status"></el-switch>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="searchFrom.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="searchFrom.code" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          <el-button type="warning" size="small" @click="cleanForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <el-row class="tal p10">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="openPriceAdd">新增</el-button>
      <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="priceChangeCode">变更编码</el-button>
      <el-upload
        class="upload-file ml10"
        :action="upload.action"
        :multiple="upload.multiple"
        :accept="upload.accept"
        :headers="upload.headers"
        :file-list="upload.file"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-progress="uploadProgress"
        :on-change="uploadChange"
        >
        <el-button size="small" type="primary" icon="el-icon-caret-top">导入</el-button>
      </el-upload>
      <el-button class="ml10" type="primary" size="small" icon="el-icon-caret-bottom" @click="priceExport">导出</el-button>
      <el-button type="primary" size="small" icon="el-icon-download" @click="priceTemplate">模版下载</el-button>
      <el-button type="primary" size="small" icon="el-icon-printer" @click="print">打印</el-button>
  </el-row>
  <el-row>
    <el-table
    :data="tableData"
    height="400"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="versionCode"
      label="版本号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="beginDate"
      label="生效开始时间">
    </el-table-column>
    <el-table-column
      prop="endDate"
      label="生效截至时间">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="priceCode"
      label="编码">
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

  <div id="print" style="display:none;">
    <el-row style="width:100%">
      <table cellspacing="0" cellpadding="0" 
      style="width: 100%;text-align: center;border-collapse: collapse;border: 1px solid #ebeef5;">
        <tr style="font-weight: bold;height: 40px;line-height: 40px;">
          <td width="10%" 
          style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">序号</td>
          <td width="10%" 
          style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">版本号</td>
          <td width="25%" 
          style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">生效开始时间</td>
          <td width="25%" 
          style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">生效截止日期</td>
          <td width="20%" 
          style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">价格</td>
          <td width="10%" 
          style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">编码</td>
        </tr>
        <tr v-for="(item,index) in printData" style="height: 40px;line-height: 40px;">
          <td style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">{{index + 1}}</td>
          <td style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">{{item.versionCode}}</td>
          <td style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">{{item.beginDate}}</td>
          <td style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">{{item.endDate}}</td>
          <td style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">{{item.price}}</td>
          <td style="text-align: center;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;">{{item.priceCode}}</td>
        </tr>
      </table>
    </el-row>
  </div>


<!-- 新增价格对话框 -->
  <el-dialog
    title="新增价格"
    :visible.sync="newDialogVisible"
    width="30%"
    center>
      <el-form :label-position="labelPosition" :rules="newDataRules" :model="newData" ref="newData" label-width="80px">
        <el-form-item label="版本" prop="version">
          <el-input v-model="newData.version" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="newData.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="编码"  prop="code">
          <el-input v-model="newData.code" disabled></el-input>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="priceAdd('newData')">确 定</el-button>
      <el-button @click="newDialogVisible = false">取 消</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
// 价格维护
import {
  pricePage,
  pricePrint,
  getPriceVersionAndCode,
  priceImport,
  priceExport,
  priceAdd,
  priceChangeCode,
  priceTemplate,
  priceValidate,
  downloadErrorExcel
} from '../../axios/api'
import common from '../../common/index'
import api from '../../axios/url'
export default {
  name: 'priceManage',
  data() {
    var validatePass = (rule, value, callback) => {
      var that = this
      let json = {price:value}
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      //价格校验
      priceValidate(json, token).then(res => {
        let resJson = res.data
        if (resJson && resJson.code === 0) {
          if (resJson.data.code === 0) {
            callback()
          }else{
            callback(new Error('价格已存在'))
          }
        } else {
          callback(new Error('后台校验失败'));
        }
      }).catch(err => {
        console.log(err)
      })
    }
    var validateDecimal = (rule, value, callback) => {
      var that = this
      var g = /^\d+(?:\.\d{1,5})?$/
      if(g.test(value)){
        callback()
      }else{
        callback(new Error('请输入正确的价格'))
      }
    }
    return {
      clearable: false,
      newDialogVisible: false,
      labelPosition: 'left',
      newData: {
        version: 'v1.0',
        price: null,
        code: null
      },
      newDataRules: {
        price: [{
          required: true,
          message: '请输入价格',
          trigger: 'blur'
        },{
          validator: validateDecimal,
          trigger: 'blur'
        },{
          validator: validatePass,
          trigger: 'blur'
        }]
      },
      searchFrom: {
        forceTime: [],
        status: false,
        price: '',
        code: '',
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      printData: [],
      upload: {
        action: api.priceImport,
        multiple: false,
        headers: {
          token: common.storage.get('token')
        },
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        showFileList: false,
        file: []
      },
      loading: null
    }
  },
  mounted() {
    this.loadPricePage()
  },
  watch: {
    newDialogVisible(newValue, oldValue) {
      var that = this
      if(!newValue) {
        that.$refs['newData'].resetFields()
      }
    }
  },
  methods: {
    //模板下载
    priceTemplate() {
      var that = this
      let json = {}
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      priceTemplate(json, token).then(res => {
        let fileName = '价格导入模版.xls'
        common.downloadBlobFile(fileName, res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    //上传前
    beforeUpload(file) {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    //上传过程中
    uploadProgress(event, file, fileList) {
    },
    //上传成功
    uploadSuccess(res, file, fileList) {
      var that = this
      that.loading.close()
      console.log(res)
      if(res && res.code === 0) {
        if (res.data.code === 0) {
          //成功
          that.$message({message: '数据导入成功', type: 'success'})
          that.loadPricePage();
        }else if (res.data.code === 1) {
          //数据有误
          that.$alert('点击确定下载返回相关文件', res.data.msg, {
            confirmButtonText: '确定',
            callback: action => {
              if (action === 'confirm') {
                //点击确定的回调函数
                let json = {
                  newFileName:res.data.newFileName
                }
                //获取当前用户的token信息，传给后台验证
                let token = common.storage.get('token')
                downloadErrorExcel(json, token).then(res => {
                  common.downloadBlobFile('错误信息.xls', res.data)
                }).catch(err => {
                  console.log(err)
                })
              }
            }
          })
        }else if (res.data.code === 2) {
          that.$message.warning('文件有误')
        }
      }else {
        that.$message.warning('导入失败')
      }
    },
    //上传失败
    uploadError(err, file, fileList) {
      var that = this
      that.loading.close()
      that.$message.error('上传失败，请重试')
    },
    //上传文件change
    uploadChange(file, fileList) {
    },
    //价格导出
    priceExport() {
      var that = this
      let json = {
        beginDateOne: that.searchFrom.forceTime[0] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.forceTime[0]),
        beginDateTwo: that.searchFrom.forceTime[1] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.forceTime[1]),
        price: that.searchFrom.price,
        code: that.searchFrom.code,
        status: that.searchFrom.status ? 0 : ''
      }
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      priceExport(json, token).then(res => {
        let fileName = '价格编码表.xls'
        common.downloadBlobFile(fileName, res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    //价格编码变更
    priceChangeCode() {
      var that = this
      let json = {}
      that.$confirm('此操作将永久变更编码，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        //获取当前用户的token信息，传给后台验证
        let token = common.storage.get('token')
        //获取价格版本和价格编码
        priceChangeCode(json, token).then(res => {
          let resJson = res.data
          if (resJson && resJson.code === 0) {
            that.$message('操作成功')
            that.loadPricePage()
          } else {
            //后台返回数据有误
            that.$message.warning('操作失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    //新增界面，点击确定，执行提交操作，成功后关闭弹窗
    priceAdd(formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if(valid){
          let json = {
            price: that.newData.price
          }
          //获取当前用户的token信息，传给后台验证
          let token = common.storage.get('token')
          //获取价格版本和价格编码
          priceAdd(json, token).then(res => {
            let resJson = res.data
            if (resJson && resJson.code === 0) {
              that.$message('操作成功')
              that.newDialogVisible = false
              that.loadPricePage()
            } else {
              that.$message.warning('操作失败')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    //点击新增，打开新增界面
    openPriceAdd() {
      var that = this
      let json = {}
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      //获取价格版本和价格编码
      getPriceVersionAndCode(json, token).then(res => {
        let resJson = res.data
        if (resJson && resJson.code === 0) {
          //数据正确
          that.newData.version = resJson.data.versionCode
          that.newData.code = resJson.data.priceCode
          //打开新增窗口
          that.newDialogVisible = true
        } else {
          //后台返回数据有误
          that.$message.warning('数据加载失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 点击查询按钮进行数据查询
     * @return {[type]} [无返回]
     */
    onSubmit() {
      console.log(this.searchFrom)
      this.loadPricePage()
    },
    /**
     * 清空查询条件
     * @return {[type]} [无返回]
     */
    cleanForm() {
      this.searchFrom.forceTime = [];
      this.searchFrom.price = '';
      this.searchFrom.status = false;
      this.searchFrom.code = '';
    },
    /**
     * 点击打印事件
     * @return {[type]} [无]
     */
    print() {
      let newWindow = window.open()
      console.log(newWindow)
      //获取当前用户的token信息，传给后台验证
      var that = this
      let token = common.storage.get('token')
      let json = {
        beginDateOne: that.searchFrom.forceTime[0] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.forceTime[0]),
        beginDateTwo: that.searchFrom.forceTime[1] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.forceTime[1]),
        price: that.searchFrom.price,
        code: that.searchFrom.code,
        status: that.searchFrom.status ? 0 : '',
      }
      pricePrint(json, token).then(res => {
        let resJson = res.data
        if (resJson && resJson.code === 0) {
          //数据正确
          that.printData = resJson.data
          setTimeout(function() {
            that.doPrint(newWindow)
          }, 300)

        } else {
          //后台返回数据有误
          that.$message.warning('数据加载失败')
        }
      }).catch(res => {

      })
    },
    //执行打印操作
    doPrint(newWindow) {
      let printContent = document.getElementById("print").innerHTML;   //获取需要打印的区域
      newWindow.document.body.innerHTML = printContent;//放入打印页面
      newWindow.print();   //打印当前窗口
      newWindow.close();
      return false;
    },
    /**
     * 改变每页记录条数
     * @param  {[type]} val [当前记录数]
     * @return {[type]}     [无]
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.loadPricePage()
    },
    /**
     * 改变当前页数
     * @param  {[type]} val [页数]
     * @return {[type]}     [无]
     */
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadPricePage()
    },
    /**
     *加载表格内的数据
     * @return {[type]} [无]
     */
    loadPricePage() {
      var that = this
      let json = {
        beginDateOne: that.searchFrom.forceTime[0] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.forceTime[0]),
        beginDateTwo: that.searchFrom.forceTime[1] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.forceTime[1]),
        price: that.searchFrom.price,
        code: that.searchFrom.code,
        status: that.searchFrom.status ? 0 : '',
        pageNum: that.pageNum,
        pageSize: that.pageSize
      }
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      pricePage(json, token).then(res => {
        let resJson = res.data
        if (resJson && resJson.code === 0) {
          //数据正确
          that.total = resJson.data.total
          that.pageNum = resJson.data.pageNum
          that.pageSize = resJson.data.pageSize
          that.tableData = resJson.data.list
        } else {
          //后台返回数据有误
          that.$message.warning('数据加载失败')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
.upload-file {
  display: inline-block;
}
.el-upload-list {
  display: none;
}
</style>
