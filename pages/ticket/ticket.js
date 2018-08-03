// pages/ticket/ticket.js
var util = require('../../utils/util.js');
var ports = require('../../utils/ports.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketlist:[],
  },
  godetail:function(e){
    var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../../pages/ticdet/ticdet?id='+id,
      })
  },
  pointnum:function(){
     
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var _this = this;
    var token =  wx.getStorageSync('token');
    console.log(token);
     wx.request({
       url: `${ports.getticket}`,
       header:{'content-type':'aplication/json',token:token},
       success:function(res){
         console.log(res.data.data);
         _this.setData({
            ticketlist:res.data.data,
         })
       }
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
    console.log(1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})