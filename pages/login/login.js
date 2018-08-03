// pages/register/register.js
var util = require('../../utils/util.js');
var ports = require('../../utils/ports.js');
//引入倒计时组件
var CountDown = require('../../template/count-down/count-down.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tep:false,
    phone:'',
    code:'',
    captcha_code:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //初始化倒计时组件
    this.countDown = new CountDown(this);
    this.countDown.setDisabledValue(false);
  },
  updatePhone: function (e) {
    console.log(e.detail.value);
    this.setData({
      // 获取input的值
      phone: e.detail.value
    });
  },
  updateCode:function(e){
    this.setData({
        code: e.detail.value
    })
  },
  // 验证电话号码方法
  checkPhone: function (phone) {
    if (!/^1[34578]\d{9}$/.test(phone) || phone === '') {
      return false;
    }
    return true;
  },
  //  验证验证码
  checkCode: function (code) {
    var testco = /[0-9]{6}$/;
    if (!testco.test(code)) {
      return false;
    }
    return true;
  },
  _getCode: function () {
    var _this = this;
    if (!this.checkPhone(this.data.phone)) {
      return wx.showToast({
        title: '正确的手机号？',
        image: '../../img/wrong.png',
        duration: 1000
      });
    }
    util.reqt(`${ports.getcode}`, {phone: _this.data.phone},function cb(res){
      _this.setData({
        captcha_code: res.captcha_code
      })
    })
    _this.countDown.run(60);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  putlogin:function(){
    var phone = this.data.phone;
    if (this.data.code == this.data.captcha_code){
      util.reqt(`${ports.login}`, { phone_mob:phone},function cb(res){
         if(res.msg == 'ok'){
           wx.login({
             success: function (res) {
               if (res.code) {
                 //发起网络请求
                 wx.request({
                   url: `${ports.loglist}`,
                   method: 'post',
                   header: { 'content-type': 'application/json' },
                   data: { code: res.code },
                   success: function (res) {
                     console.log(res.data.token);
                     wx.setStorageSync('token', res.data.token);
                   }
                 })
               } else {
                 console.log('登录失败！' + res.errMsg)
               }
             }
           });         
         }
         wx.navigateTo({
           url: '../../pages/author/author',
         })
      })
    }else{
        wx.showToast({
          title: '登录失败，请重新登录',
          icon:'none'
        })
    }
  },
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})