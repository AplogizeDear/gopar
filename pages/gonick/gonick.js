// pages/gonick/gonick.js
var ports = require('../../utils/ports.js');
var nickname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getvalue:function(e){
    console.log(e)
    nickname = e.detail.value;
    console.log(nickname)
  },
  confirm_btn:function(){
    var token = wx.getStorageSync("token");
    console.log(token)
    if (nickname == "" || nickname==undefined){
        wx.showToast({
          title: '请输入昵称',
          icon:'none',
        })
        return false;
    }else{
      wx.request({
        url: ports.nicknameurl,
        method: 'POST',
        header: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          token: token
           },
        data: {
          id: 123,
          nickname: nickname
        },
        success: function (res) {
          console.log(res.data);
          if (res.data==1){
            wx.showToast({
              title: '昵称修改成功',
              icon: "success",
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../personal/personal?nickname=' + nickname,
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