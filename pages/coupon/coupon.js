// pages/order/order.js
var ports = require('../../utils/ports.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabsIndex: 0,
    coupon_code:'',
    selectlist: [
      { id: 0, name: '未使用' },
      { id: 1, name: '已使用' },
      { id: 2, name: '已过期' }
    ],
    end_coupon:'',
    normal_coupon:'',
    used_coupon:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    var _this = this;
      wx.request({
        url:`${ports.couponlist}`,
        header:{'token':token},
        success:function(res){
          console.log(res);
          _this.setData({
            end_coupon: res.data.end_coupon,
            normal_coupon: res.data.normal_coupon,
            used_coupon: res.data.used_coupon
          })
        }
      })
  },
  select: function (data) {
    var index = data.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex: index,
    })
  },
  goorde: function () {
    wx.navigateTo({
      url: '../../pages/goorde/goorde',
    })
  },
  inputvalue:function(e){
    var coupon_code = e.detail.value;
    this.setData({
      coupon_code:coupon_code,
    })
  },
  get_coupon:function(e){
    var _this = this;
    var token = wx.getStorageSync('token');
    var code = this.data.coupon_code;
    if (code ==''){
        wx.showToast({
          title: '领取码有误',
        })
    }
    wx.request({
      url:`${ports.couponcode}`,
      method:'post',
      header: { 'content-type':'application/json','token':token}, 
      data:{
        "coupon_code":code
      },  
      success:function(res){
          console.log(res);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})