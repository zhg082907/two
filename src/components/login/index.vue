<template lang="html">
  <div class="Login" :style="Login">
    <!--Login-开始-->
      <div class="Login_heand dk">
          <a href="#" class="Login_logo fl">
              <p class="fl" :style="logoBg"></p><div class="clear"></div>
          </a>
          <a href="#" class="Login_down fr"></a><div class="clear"></div>
      </div>
      <div class="Login_k">
        <div class="Login_T">密码登录<p></p></div>
          <!--登录-开始-->
          <form class="Login_dl">
              <div class="Login_row">
                  <input name="" type="text" v-model="form.loginName" value="" :style="LoginInput1" class="Login_input Login_inp1" placeholder="用户名" />
              </div>
              <div class="Login_row">
                  <input name="" type="password" v-model="form.pwd" value="" :style="LoginInput2" class="Login_input Login_inp2" placeholder="密码" />
              </div>
              <a href="#" class="Login_dla" @click="login">登录</a>
         </form>
          <!--登录-结束-->
      </div>
      <!--Login-结束-->
  </div>
</template>

<script>
import { login } from '../axios/api'
import common from '../common/index'
export default {
  name: "login",
  data() {
    return {
      form: {
        loginName: '',
        pwd: ''
      },
      Login: {
        backgroundImage: "url("+require("../../assets/images/background01.jpg") +")"
      },
      logoBg: {
        backgroundImage: "url("+require("../../assets/images/logo.png") +")"
      },
      LoginInput1: {
        backgroundImage: "url("+require("../../assets/images/icon_01.png") +")"
      },
      LoginInput2: {
        backgroundImage: "url("+require("../../assets/images/icon_02.png") +")"
      }
    }
  },
  methods: {
    login() {
      var that = this
      login(that.form.loginName, that.form.pwd).then(res => {
        // 请求成功
        if(res && res.data) {
          let json = res.data
          json.data.code === 0 ? (function() {
            //登录成功
            that.$message(`登录成功`);
            common.storage.clear()
            common.storage.set('token', json.data.token)
            common.storage.set('userId', json.data.userId)
            common.storage.set('userName', json.data.userName)
            that.$router.push('/priceManage')
          })() : (function() {
            //登录失败
            that.$message.warning(json.data.msg);
          })()
        }
      }).catch(err => {
        // 请求失败
        if(err) {
          console.log(err)
          this.$message.error('登录失败，请重试~');
        }
      })
    }
  }
}
</script>

<style lang="css">
html{height:100%;}
*{ margin:0; padding:0;}
/*  解决谷歌浏览器input输入框记住密码后，输入框背景就会变为黄色 */
input{
    /* -webkit-box-shadow: 0 0 0 1000px white inset; */
}
body{font:14px "microsoft yahei", Arial, Helvetica, sans-serif;color:#000; background:#FFF; height:100%; min-height:100%;}
ul,li,p,h1,h2,h3,h4,h5,h6,dl,dt,dd {margin:0px;padding:0px;border:none;list-style:none;}
a{text-decoration:none;  text-shadow:none;font-weight:normal;}
ul{list-style:none;}
textarea,input,button,select,textarea{outline:none;-webkit-appearance:none;}
.fl{ float:left;}
.fr{ float:right}
a{color:#6c6c6c;text-decoration:none;}
img{border:none;}
.clear{ clear:both; height:0; overflow:hidden;}
.dk{ width:1200px; margin:0 auto; }

.Login_logo p {
  background:no-repeat center;
  width: 400px;
  height: 120px;
}
.Login{ height: 100%;background:no-repeat center; background-size:1920px auto; min-width:1200px; position:relative;}

.Login_heand{ padding-top:70px; }
.Login_logo{ height:49px; color:#FFF; font-size:22px; font-weight:600; display:block;}
.Login_logo p{ padding-top:17px; margin-left:20px;}
a.Login_down{ font-size:12px; color:#FFF;padding-top:28px;}
.Login_k{ padding-left:57%; width:43%; min-width:515px; margin-top:130px;}
.Login_T{ border-bottom:1px solid #6092ce; color:#FFF; font-size:16px; position:relative; padding:10px 0;}
.Login_T p{ position:absolute; background:#00b4ff; height:2px; width:60px; bottom:-1px; left:0;}
.Login_dl{ width:334px; padding-top:10px;}
.Login_row{background:rgba(255,255,255,0.15); border:1px solid #FFF; border-radius:3px; margin-top:30px; height:52px; width:332px;}
.Login_input{ padding-left:62px; padding-right:20px; width:250px; color:#FFF; font-size:14px; background:none; border:none;height:52px; line-height:52px;}
.Login_inp1{ background: no-repeat 20px center;}
.Login_inp2{ background: no-repeat 20px center;}
input.Login_input::-webkit-input-placeholder {color: #FFF;}
a.Login_dla{ background:#00aeff;width:334px;border-radius:3px;margin-bottom:30px;height:52px;line-height:52px; font-size:14px; color:#FFF; text-align:center; display:block; margin-top:25px;}
a.Login_dla:hover{ text-shadow:0 0 5px #FFF;}
.Login_pitch{display:block;line-height:20px; font-size:14px; color:#FFF;}
.Login_pitch input[type="checkbox"] {-webkit-appearance:none;width:16px; height:16px;vertical-align: middle;display:block;outline:none; border:1px solid #FFF; border-radius:2px;overflow:hidden;margin-right:15px; margin-top:2px;}
/* .Login_pitch input[type="checkbox"]:checked{background:url(../images/icon_dh.png) no-repeat center; background-size:16px; } */
.Login_wj{ width:200px; font-size:14px; line-height:20px; color:#b4b4b4; text-align:right;}
.Login_wj a{ color:#b4b4b4;}
.Login_wj a:hover{ color:#FFF;}
.Login_foot{ font-size:12px; color:#FFF; width:1200px; position:absolute; bottom:15px; left:50%; margin-left:-600px; line-height:20px;}

</style>
