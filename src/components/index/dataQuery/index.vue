<template lang="html">
  <div class="">
    <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-row>
      <el-col :span="8">
        <el-form-item label="价格：">
          <el-input v-model="form.price" placeholder="" @blur="getPriceByPriceOrCode(0)"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客商：">
          <el-input v-model="form.customer" placeholder="" @blur="getCustomerByCustomerOrCode(0)"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="编码：">
          <el-input v-model="form.priceCode" placeholder="" @blur="getPriceByPriceOrCode(1)"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="编码：">
          <el-input v-model="form.customerCode" placeholder="" @blur="getCustomerByCustomerOrCode(1)"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-button type="warning" size="small" @click="cleanForm">清空</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  </div>
</template>

<script>
import {
  getPriceByPriceOrCode,
  getCustomerByCustomerOrCode
} from '../../axios/api'
import common from '../../common/index'
import api from '../../axios/url'
export default {
  name: 'dataQuery',
  data() {
    return  {
      form: {
        price: '',
        customer: '',
        priceCode: '',
        customerCode: ''
      }
    }
  },
  methods: {
    //查询价格编码信息
    getPriceByPriceOrCode(flag) {
      var that = this
      let json = {}
      if(flag === 0){
        if (that.form.price === '') {
          return
        }
        json = {
          flag:flag,
          param:that.form.price
        }
        that.form.priceCode = ''
      }else if(flag === 1){
        if (that.form.priceCode === '') {
          return
        }
        json = {
          flag:flag,
          param:that.form.priceCode
        }
        that.form.price = ''
      }else{
        return
      }
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      getPriceByPriceOrCode(json, token).then(res => {
        let resJson = res.data
        if (resJson && resJson.code === 0) {
          //数据正确
          if(resJson.data.code === 0){
            that.form.price = resJson.data.data.price
            that.form.priceCode = resJson.data.data.code
          }else{
            that.$message.warning('查询结果不存在')
          }
        } else {
          that.$message.warning('查询失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //查询客商编码信息
    getCustomerByCustomerOrCode(flag){
      var that = this
      let json = {}
      if(flag === 0){
        if (that.form.customer === '') {
          return
        }
        json = {
          flag:flag,
          param:that.form.customer
        }
        that.form.customerCode = ''
      }else if(flag === 1){
        if (that.form.customerCode === '') {
          return
        }
        json = {
          flag:flag,
          param:that.form.customerCode
        }
        that.form.customer = ''
      }else{
        return
      }
      //获取当前用户的token信息，传给后台验证
      let token = common.storage.get('token')
      getCustomerByCustomerOrCode(json, token).then(res => {
        let resJson = res.data
        if (resJson && resJson.code === 0) {
          //数据正确
          if(resJson.data.code === 0){
            that.form.customer = resJson.data.data.customer
            that.form.customerCode = resJson.data.data.code
          }else{
            that.$message.warning('查询结果不存在')
          }
        } else {
          that.$message.warning('查询失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //清空
    cleanForm() {
      this.form.price = '';
      this.form.customer = '';
      this.form.priceCode = '';
      this.form.customerCode = '';
    }
  }
}
</script>

<style lang="css">
</style>
