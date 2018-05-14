<template lang="html">
  <div class="">
    <div class="tal">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="开票日期">
          <el-date-picker
            v-model="searchFrom.billingDate"
            type="daterange"
            :clearable="clearable"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出库日期">
          <el-date-picker
            v-model="searchFrom.outData"
            type="daterange"
            :clearable="clearable"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出库方式">
        <el-select v-model="searchFrom.outWay" placeholder="请选择出库方式">
          <el-option label="零散出库" value="零散出库"></el-option>
          <el-option label="汽车出库" value="汽车出库"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="粮油品种">
        <el-select v-model="searchFrom.grainOilKind" placeholder="请选择粮油品种" @focus="getGokList">
          <el-option v-for="item in goks" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchFrom.itemName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="客商">
          <el-input v-model="searchFrom.customer" placeholder="客商"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          <el-button type="warning" size="small" @click="cleanForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line"></div>
    <el-row class="tal p10">
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
      <el-button class="ml10" type="primary" size="small" icon="el-icon-caret-bottom" @click="reportExport">导出</el-button>
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
      width="50">
    </el-table-column>
    <el-table-column
      prop="outWay"
      label="出库方式"
      width="100">
    </el-table-column>
    <el-table-column
      prop="outNoticeNum"
      label="出库通知单号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="billingDate"
      label="开票日期"
      width="160">
    </el-table-column>
    <el-table-column
      prop="outDate"
      label="出库日期"
      width="160">
    </el-table-column>
    <el-table-column
      prop="customer"
      label="客商">
    </el-table-column>
    <el-table-column
      prop="grainOilKind"
      label="粮油品种">
    </el-table-column>
    <el-table-column
      prop="itemName"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="grade"
      label="等级">
    </el-table-column>
    <el-table-column
      prop="spec"
      label="规格(kg)">
    </el-table-column>
    <el-table-column
      prop="num"
      label="件数">
    </el-table-column>
    <el-table-column
      prop="whNum"
      label="出库仓号">
    </el-table-column>
    <el-table-column
      prop="location"
      label="出库货位">
    </el-table-column>
    <el-table-column
      prop="unitPrice"
      label="单价(元/kg)">
    </el-table-column>
    <el-table-column
      prop="totalPrice"
      label="总价(元)">
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

  </div>
</template>

<script>
// 报表维护
import {
  reportPage,
  reportImport,
  reportExport,
  getGokList,
  downloadErrorExcel
} from '../../axios/api'
import common from '../../common/index'
import api from '../../axios/url'
export default {
  name: 'salesData',
  data() {
    return {
      goks:[],
      clearable: false,
      searchFrom: {
        billingDate: [],
        outData: [],
        outWay: '',
        grainOilKind: '',
        itemName: '',
        customer: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      currentPage: 1,
      upload: {
        action: api.reportImport,
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
    this.tableData = this.loadReportPage()
  },
  methods: {
    getGokList(){
      var that = this
      let json = {}
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      getGokList(json, token).then(res => {
        let resJson = res.data
        if (resJson && resJson.code === 0) {
          //数据正确
          that.goks = resJson.data
        } else {
          //后台返回数据有误
          that.$message.warning('粮油品种加载失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //导出
    reportExport(){
      var that = this
      let json = {
        billingDateOne: that.searchFrom.billingDate[0] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.billingDate[0]),
        billingDateTwo: that.searchFrom.billingDate[1] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.billingDate[1]),
        outDateOne: that.searchFrom.outData[0] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.outData[0]),
        outDateTwo: that.searchFrom.outData[1] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.outData[1]),
        grainOilKind:that.searchFrom.grainOilKind,
        outWay:that.searchFrom.outWay,
        itemName: that.searchFrom.itemName,
        customer: that.searchFrom.customer
      }
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      reportExport(json, token).then(res => {
        let fileName = '销售报表.xls'
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
          that.loadReportPage();
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
    /**
     * 点击查询按钮进行数据查询
     * @return {[type]} [无返回]
     */
    onSubmit() {
      console.log(this.searchFrom)
      this.loadReportPage()
    },
    /**
     * 清空查询条件
     * @return {[type]} [无返回]
     */
    cleanForm() {
      this.searchFrom.billingDate = [];
      this.searchFrom.outData = [];
      this.searchFrom.outWay = '';
      this.searchFrom.grainOilKind = '';
      this.searchFrom.itemName = '';
      this.searchFrom.customer = '';
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.loadReportPage()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadReportPage()
    },
    loadReportPage() {
      var that = this
      let json = {
        billingDateOne: that.searchFrom.billingDate[0] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.billingDate[0]),
        billingDateTwo: that.searchFrom.billingDate[1] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.billingDate[1]),
        outDateOne: that.searchFrom.outData[0] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.outData[0]),
        outDateTwo: that.searchFrom.outData[1] === undefined ? '' : common.dateFmt("yyyy-MM-dd hh:mm:ss", that.searchFrom.outData[1]),
        grainOilKind:that.searchFrom.grainOilKind,
        outWay:that.searchFrom.outWay,
        itemName: that.searchFrom.itemName,
        customer: that.searchFrom.customer,
        pageNum: that.pageNum,
        pageSize: that.pageSize
      }
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      reportPage(json, token).then(res => {
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
</style>
