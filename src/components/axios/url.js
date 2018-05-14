// let service = 'dev' //开发环境
let service = 'prod'  //生产环境
let api = ''
if(service === 'dev') {
  api = 'api'
}else if(service === 'prod') {
  api = './'
}


//所有的接口路径在此处进行维护
export default {
  // 用户登录 Get
  login: `${api}/login`,
  // 更新密码 Get
  updPwd: `${api}/user/updPwd`,
  // 新增用户 Get
  userAdd: `${api}/user/userAdd`,
  // 用户删除 get
  userDel: `${api}/user/userDel`,
  // 用户分页列表 Get
  userPage: `${api}/user/userPage`,
  //价格分页列表 Get
  pricePage: `${api}/price/pricePage`,
  //价格打印  Get
  pricePrint: `${api}/price/pricePrint`,
  //价格导入
  priceImport: `${api}/price/priceImport`,
  //价格导出
  priceExport: `${api}/price/priceExport`,
  //价格新增
  priceAdd: `${api}/price/priceAdd`,
  //变更编码
  priceChangeCode: `${api}/price/priceChangeCode`,
  //获取价格版本和价格编码
  getPriceVersionAndCode: `${api}/price/getPriceVersionAndCode`,
  //查询价格编码信息
  getPriceByPriceOrCode: `${api}/price/getPriceByPriceOrCode`,
  //价格导入模板下载
  priceTemplate: `${api}/price/priceTemplate`,
  //价格校验
  priceValidate:`${api}/price/priceValidate`,
  //客商新增
  customerAdd:`${api}/customer/customerAdd`,
  //变更编码
  customerChangeCode:`${api}/customer/customerChangeCode`,
  //客商导出
  customerExport:`${api}/customer/customerExport`,
  //客商导入
  customerImport:`${api}/customer/customerImport`,
  //客商分页列表
  customerPage:`${api}/customer/customerPage`,
  //客商打印
  customerPrint:`${api}/customer/customerPrint`,
  //客商导入模板下载
  customerTemplate:`${api}/customer/customerTemplate`,
  //客商校验
  customerValidate:`${api}/customer/customerValidate`,
  //查询客商编码信息
  getCustomerByCustomerOrCode:`${api}/customer/getCustomerByCustomerOrCode`,
  //获取客商版本和客商编码
  getCustomerVersionAndCode:`${api}/customer/getCustomerVersionAndCode`,
  //销售报表导出
  reportExport:`${api}/report/reportExport`,
  //销售报表导入
  reportImport:`${api}/report/reportImport`,
  //销售报表分页列表
  reportPage:`${api}/report/reportPage`,
  //下载有错误信息的Excel
  downloadErrorExcel:`${api}/errorExcel/downloadErrorExcel`,
  //获取粮油品种集合
  getGokList:`${api}/report/getGokList`

}
