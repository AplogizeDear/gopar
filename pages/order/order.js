// pages/order/order.js
var ports = require('../../utils/ports.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTabsIndex:0,
      selectlist:[
        {id:0,name:'全部'},
        {id:1,name:'待支付'},
        {id:2,name:'已支付'}
      ],
      all_order_list:[],
      pl:[],
      ul:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var token = wx.getStorageSync('token');
      wx.request({
        url: `${ports.orderlist}`,
        header:{token:token},
        success:function(res){
          console.log(res);
          for (var i in res.data.all_order_list){
            res.data.all_order_list[i].add_time = util.formatTime(res.data.all_order_list[i].add_time, 'Y/M/D h:m:s');
          }
          for (var i in res.data.paid_order_list) {
            res.data.paid_order_list[i].add_time = util.formatTime(res.data.paid_order_list[i].add_time, 'Y/M/D h:m:s');
          }
          for (var i in res.data.unpaid_order_list) {
            res.res.data.unpaid_order_list[i].add_time = util.formatTime(res.data.unpaid_order_list[i].add_time, 'Y/M/D h:m:s');
          }
          _this.setData({
            all_order_list: res.data.all_order_list,
            pl: res.data.paid_order_list,
            ul: res.data.unpaid_order_list
          })
        }
      })
  },
  select:function(data){
    var index = data.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex:index,
    })
  },
  goorde:function(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../../pages/goorde/goorde?id=${id}`,
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