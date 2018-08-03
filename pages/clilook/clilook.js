// pages/clilook/clilook.js
var ports = require('../../utils/ports.js');
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:"",
    express_company:"",
    express_number:"",
    express_tel:"",
    list:[],
    status:"",
    time:"", 
    imgs:"../../img/icon_shang.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id;
    var _this = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: `${ports.logistics}/${id}`,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: token
      },
      success: function (res) {
        if (res.data.express_info.express_company != "" && res.data.express_info.express_number!=""){
          _this.setData({
            goods:"已发货",
            express_company: res.data.express_info.express_company,
            express_number: res.data.express_info.express_number,
            express_tel: res.data.express_info.express_tel,
            list: res.data.logistics_data
          })
        } 
        for (let index in res.data.logistics_data) {
          if(index==0){
            _this.setData({
              imgs: "../../img/icon_shang.png"
            })
          }
        }   
        
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