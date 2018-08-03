// pages/merdetail/merdetail.js
var util = require('../../utils/util.js');
var ports = require('../../utils/ports.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详情
    deta_detail:'',
    // 酒吧详情列表
    data_list:''
  },
  getmerdetail:function(id){
    var _self = this;
    return util.wxRequest({
      url: `${ports.fdetail}/${id}`
    }).then(function (result) {
      return result;
    }).catch((e) => {
      return Promise.reject(e);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      var id = options.id;
      this.getmerdetail(id).then(result=>{
        console.log(result.data_detail);
        console.log(result.data);
         _this.setData({
           deta_detail:result.data_detail,
           data_list:result.data
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