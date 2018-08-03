// pages/myaddress/myaddress.js
var ports = require('../../utils/ports.js');
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    consignee:"",
    mobile:"",
    province:"",
    city:"",
    area:"",
    address:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  editoradd:function(){
    wx.navigateTo({
      url: '../../pages/editad/editad',
    })
  },
  deletebtn:function(e){
    console.log(e);
    var id=e.target.dataset.id;
    // console.log(id);    
    var token = wx.getStorageSync('token');
    wx.showModal({
      title: '提示',
      content: '确认删除该地址吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: ports.addressdel,
            data: {
              id:id
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              "token": token
            },
            success: function (res) {
              console.log(res);
              console.log(res.data.code);
              if (res.data.code==201){
                wx.showToast({
                  title: '提示',
                  content:"地址删除成功",
                  success:function(){
                    wx.navigateTo({
                      url: '../myaddress/myaddress',
                    })
                  }
                })
              }
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  confirm_btn:function(){
      wx.navigateTo({
        url: '../../pages/addaddress/addaddress',
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
    var that = this;
    var token = wx.getStorageSync('token');
    console.log(token);
    wx.request({
      url: ports.addresslist,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "token": token
      },
      success: function (res) {
        console.log(res)        
        console.log(res.data)
        that.setData({
          list: res.data
        })
      },
    })
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