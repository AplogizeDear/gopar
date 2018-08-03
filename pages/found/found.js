// pages/order/order.js
// 引入功能性函数
var util = require('../../utils/util.js');
var ports = require('../../utils/ports.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterList:[],
  },
  // 发现页面接口请求
  foundList:function(){
    var _self = this;
    return util.wxRequest({
      url: ports.found
    }).then(function (result) {
      return result;
    }).catch((e) => {
      return Promise.reject(e);
    });
  },
  onTabtoDetail: function (e) {
    var postid = e.currentTarget.dataset.postId;
    wx.navigateTo({
      url: `../../pages/merdetail/merdetail?id=${postid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.foundList().then(result=>{
      console.log(result);
      _this.setData({
        posterList:result
      })
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
  
  }
})