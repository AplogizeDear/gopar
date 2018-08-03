// pages/goper/goper.js
var ports = require('../../utils/ports.js');
var user_profile;
var value;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0
  },
  numbertext: function (e) {
    var that=this;
    value = e.detail.value;
    console.log(value)
    var len = parseInt(value.length);
    var num = len;
    if (num <= 100) {
      that.setData({
        num: num
      })
    }
  },
  confirm_btn:function(){
    var token = wx.getStorageSync("token");
    if (value == "" || value == undefined) {
      wx.showToast({
        title: '请填写个人简介',
        icon: 'none',
      })
      return false;
    } else {
      wx.request({
        url: ports.profileurl,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          token: token
        },
        data: {
          profile: value
        },
        success: function (res) {
          if (res.data.code==201){
            wx.showToast({
              title: '简介修改成功',
              icon: "success",
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../personal/personal?profile=' + value,
                  })
                }, 2000)
              }
            })
          }
          
        },
      })
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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