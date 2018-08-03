// pages/center/center.js
var ports = require('../../utils/ports.js');
var tempFilePaths;
var cover;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    'isLogin':false,
    'userImg':null,
    'userName':null,
     bgpic: '',
     cover:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token  = wx.getStorageSync('token');
    console.log(token);
    if(token){
      var that = this;
      var token = wx.getStorageSync('token');
      console.log(token);
      wx.request({
        url: ports.infourl,
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "token": token
        },
        success: function (res) {
          console.log(res)
          console.log(res.data.result.cover)
          that.setData({
            bgpic: res.data.result.cover
          })
        },
      })
    }else{
      // wx.redirectTo({
      //   url: '../../pages/login/login',
      // })
    }
  },
  // 跳转门票页面
  ticket_href:function(){
    wx.navigateTo({
      url: '../../pages/ticket/ticket',
    })
  },
  // 跳转至订单页面
  order_href:function(){
    wx.navigateTo({
      url: '../../pages/order/order',
    })
  },
  // 跳转到优惠劵页面
  coupon_href:function(){
    wx.navigateTo({
     url:'../../pages/coupon/coupon',
    })
  },
  personal: function () {
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  myaddress:function(){
    wx.navigateTo({
      url: '../myaddress/myaddress'
    })
  },
  proback:function(){
    wx.navigateTo({
      url: '../proback/proback'
    })
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
  
  },
  // 换背景图片
  choosePic: function () {
    var that = this;
    var token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths[0];
        console.log(tempFilePaths);
        var bgpic = that.data.bgpic;
        console.log(bgpic);
        console.log(tempFilePaths);
        wx.uploadFile({
          url: ports.coverurl,
          filePath: tempFilePaths,
          name: 'cover',
          header: {
            'content-type': 'application/json',
            "token": token
          },
          success: function (res) {
            console.log(res)
            that.setData({
              bgpic: tempFilePaths
            });
          }
        })       
      },
    });
  }
})