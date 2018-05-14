export default {
  //本地存储  相关方法封装
  storage: {
    set(key, value) {
      if (sessionStorage) {
        sessionStorage.setItem(key, value)
      }
    },
    get(key) {
      if (sessionStorage) {
        return sessionStorage.getItem(key)
      }
    },
    remove(key) {
      if (sessionStorage) {
        sessionStorage.removeItem(key)
      }
    },
    clear() {
      if (sessionStorage) {
        sessionStorage.clear()
      }
    }
  },
  /**
   * 时间格式化
   * @param  {[type]} fmt  [yyyy-MM-dd hh:mm:ss]
   * @param  {[type]} date [date]
   * @return {[type]}      [格式化后的时间]
   */
  dateFmt(fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1, (RegExp.$1.length == 1)
          ? (o[k])
          : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  /**
   * 下载Blob数据的文件
   * @param  {[type]} fileName [文件名称]
   * @param  {[type]} BlobData [blob数据]
   * @return {[type]}          [无]
   */
  downloadBlobFile(fileName, BlobData) {
    if (BlobData) {
      //返回正确
      var blob = new Blob([BlobData], {type: 'application/vnd.ms-excel;charset=UTF-8'})
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        var link = document.createElement('a') //a标签下载
        link.innerHTML = fileName
        link.download = fileName
        link.href = window.URL.createObjectURL(blob)
        document.body.appendChild(link)
        var evt = document.createEvent('MouseEvents')
        evt.initEvent('click', false, false)
        link.dispatchEvent(evt)
      }
    } else {
      //返回错误
    }
  }

}
