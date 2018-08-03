// pages/changeaddress/changeaddress.js
var ports = require('../../utils/ports.js');
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    consignee_address:"",
    consignee_name:"",
    consignee_phone_mob:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    id = options.id;
    var that = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: `${ports.addressinfo}/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "token": token
      },
      success: function (res) {
        that.setData({
          consignee_address:res.data.address_info.consignee_address,
          consignee_name: res.data.address_info.consignee_name,
          consignee_phone_mob: res.data.address_info.consignee_phone_mob
        })
      },
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
  onShow: function (e) {
    
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
  /**
   * 保存修改
   */
  confirm_btn:function(e){
    console.log(e)
    var that = this;
    var token = wx.getStorageSync('token');
    console.log(token);
    var flag = false;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.nickname == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'loading',
        mask: true
      })
    } else if (e.detail.value.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'loading',
        mask: true
      })
    } else if (!myreg.test(e.detail.value.phone)) {
      wx.showToast({
        title: '手机号码有误',
        icon: 'loading',
        mask: true
      })
    }
      else if (e.detail.value.area == "") {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'loading',
        mask: true
      })
    } else {
      flag = true;
      wx.request({
        url: ports.changeaddress,
        data: {
          "consignee_name": e.detail.value.nickname,
          "consignee_phone_mob": e.detail.value.phone,
          "consignee_address": e.detail.value.address ,
          "id":id
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "token": token
        },
        success: function (res) {
          console.log(res);
          if (res.data.code == 201) {
            wx.redirectTo({
              url: '../ticdet/ticdet?id=' + id,
            })
          }
        },
      })
    }
  }
  
})