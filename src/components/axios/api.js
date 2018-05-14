import { fetch, fetchWithToken } from './fetch'
import api from './url'

/**
 * 登录
 * @param  {[type]} loginName [用户名]
 * @param  {[type]} pwd       [密码]
 * @return {[type]}           [无]
 */
export function login(loginName, pwd) {
  return fetch({
    url: api.login,
    methods: 'get',
    params: {
      loginName: loginName,
      pwd: pwd
    }
  })
}
/**
 * [价格分页列表]
 * @param  {[type]} data  [请求参数]
 * @param  {[type]} token [token]
 * @return {[type]}       [无]
 */
export function pricePage(data, token) {
  return fetchWithToken({
    url: api.pricePage,
    methods: 'get',
    params: data
  }, token)
}
/**
 * 价格打印
 * @param  {[type]} data  [请求参数]
 * @param  {[type]} token [token]
 * @return {[type]}       [无 ]
 */
export function pricePrint(data, token) {
  return fetchWithToken({
    url: api.pricePrint,
    methods: 'get',
    params: data
  }, token)
}
//获取价格版本和价格编码
export function getPriceVersionAndCode(data, token){
  return fetchWithToken({
    url: api.getPriceVersionAndCode,
    methods: 'get',
    params: data
  }, token)
}
//价格导入
export function priceImport(data, token) {
  return fetchWithToken({
    url: api.priceImport,
    methods: 'post',
    params: data
  }, token)
}
//价格导出
export function priceExport(data, token) {
  return fetchWithToken({
    url: api.priceExport,
    methods: 'get',
    responseType : 'blob',
    params: data
  }, token)
}
//价格新增
export function priceAdd(data, token) {
  return fetchWithToken({
    url: api.priceAdd,
    methods: 'get',
    params: data
  }, token)
}
//价格变更
export function priceChangeCode(data, token) {
  return fetchWithToken({
    url: api.priceChangeCode,
    methods: 'get',
    params: data
  }, token)
}
//获取价格编码信息
export function getPriceByPriceOrCode(data, token) {
  return fetchWithToken({
    url: api.getPriceByPriceOrCode,
    methods: 'get',
    params: data
  }, token)
}
//价格导入模板下载
export function priceTemplate(data, token) {
  return fetchWithToken({
    url: api.priceTemplate,
    methods: 'get',
    responseType : 'blob',
    params: data
  }, token)
}
//价格校验
export function priceValidate(data, token) {
  return fetchWithToken({
    url: api.priceValidate,
    methods: 'get',
    params: data
  }, token)
}
//客商新增
export function customerAdd(data, token) {
  return fetchWithToken({
    url: api.customerAdd,
    methods: 'get',
    params: data
  }, token)
}
//变更编码
export function customerChangeCode(data, token) {
  return fetchWithToken({
    url: api.customerChangeCode,
    methods: 'get',
    params: data
  }, token)
}
//客商导出
export function customerExport(data, token) {
  return fetchWithToken({
    url: api.customerExport,
    methods: 'get',
    responseType : 'blob',
    params: data
  }, token)
}
//客商导入
export function customerImport(data, token) {
  return fetchWithToken({
    url: api.customerImport,
    methods: 'post',
    params: data
  }, token)
}
//客商分页列表
export function customerPage(data, token) {
  return fetchWithToken({
    url: api.customerPage,
    methods: 'get',
    params: data
  }, token)
}
//客商打印
export function customerPrint(data, token) {
  return fetchWithToken({
    url: api.customerPrint,
    methods: 'get',
    params: data
  }, token)
}
//客商导入模板下载
export function customerTemplate(data, token) {
  return fetchWithToken({
    url: api.customerTemplate,
    methods: 'get',
    responseType : 'blob',
    params: data
  }, token)
}
//客商校验
export function customerValidate(data, token) {
  return fetchWithToken({
    url: api.customerValidate,
    methods: 'get',
    params: data
  }, token)
}
//查询客商编码信息
export function getCustomerByCustomerOrCode(data, token) {
  return fetchWithToken({
    url: api.getCustomerByCustomerOrCode,
    methods: 'get',
    params: data
  }, token)
}
//获取客商版本和客商编码
export function getCustomerVersionAndCode(data, token) {
  return fetchWithToken({
    url: api.getCustomerVersionAndCode,
    methods: 'get',
    params: data
  }, token)
}
//销售报表导出
export function reportExport(data, token) {
  return fetchWithToken({
    url: api.reportExport,
    methods: 'get',
    responseType : 'blob',
    params: data
  }, token)
}
//销售报表导入
export function reportImport(data, token) {
  return fetchWithToken({
    url: api.reportImport,
    methods: 'post',
    params: data
  }, token)
}
//销售报表分页列表
export function reportPage(data, token) {
  return fetchWithToken({
    url: api.reportPage,
    methods: 'get',
    params: data
  }, token)
}
//获取粮油品种集合
export function getGokList(data, token) {
  return fetchWithToken({
    url: api.getGokList,
    methods: 'get',
    params: data
  }, token)
}
//下载有错误信息的Excel
export function downloadErrorExcel(data, token) {
  return fetchWithToken({
    url: api.downloadErrorExcel,
    methods: 'get',
    responseType : 'blob',
    params: data
  }, token)
}
/**
 * 用户分页列表
 * @param  {[type]} data  [请求参数]
 * @param  {[type]} token [token]
 * @return {[type]}       [无]
 */
export function userPage(data, token) {
  return fetchWithToken({
    url: api.userPage,
    methods: 'get',
    params: data
  }, token)
}
//删除用户
export function userDel(data, token) {
  return fetchWithToken({
    url: api.userDel,
    methods: 'get',
    params: data
  }, token)
}
//用户更新密码
export function updPwd(data, token) {
  return fetchWithToken({
    url: api.updPwd,
    methods: 'get',
    params: data
  }, token)
}
//添加用户
export function userAdd(data, token) {
  return fetchWithToken({
    url: api.userAdd,
    methods: 'get',
    params: data
  }, token)
}
