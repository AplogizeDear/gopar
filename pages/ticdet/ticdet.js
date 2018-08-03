// pages/ticdet/ticdet.js
var ports = require('../../utils/ports.js');
var id;
var change_address_flag;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedule_detail:'',
    order_detail:'',
    express_company:"",
    ticket_name:"",
    quantity:"",
    express_number:"",
    change_address_flag:"",
    consignee_name:"",
    consignee_phone_mob:"",
    consignee_address:"",
    order_id:""
  },
  clilook:function(e){
    wx.navigateTo({
      url: '../../pages/clilook/clilook?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   id = options.id;
    console.log(id)
    var _this = this;
    var token = wx.getStorageSync('token');
    wx.request({
      url: `${ports.getticdet}/${id}`,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: token
      },
      success:function(res){
        console.log(res.data.schedule_detail);
        console.log(res.data.order_detail);
        change_address_flag = res.data.order_detail.change_address_flag;
        console.log(change_address_flag);                    
        if (res.data.order_detail.change_address_flag==0){
          _this.setData({
            change_address_flag:1
          })
        }
        if (res.data.order_detail.change_address_flag == 1) {
          _this.setData({
            change_address_flag: 0
          })
        }
        _this.setData({
          schedule_detail: res.data.schedule_detail,
          order_detail: res.data.order_detail,
          express_company: res.data.order_detail.express_company,
          ticket_name: res.data.order_detail.ticket_name,
          quantity: res.data.order_detail.quantity,
          express_number: res.data.order_detail.express_number,
          consignee_name: res.data.order_detail.consignee_name,
          consignee_phone_mob: res.data.order_detail.consignee_phone_mob,
          consignee_address: res.data.order_detail.consignee_address,
          order_id: res.data.order_detail.order_id
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 修改收货地址
   */
  change:function(e){
    console.log(e)
    if (change_address_flag==1){
      wx.showModal({
        content: '您已经修改过地址了',
        showCancel:false,
        success: function (res) {
        }
      })
    }else{
      wx.showModal({
        content: '确定要修改收货地址吗？机会只有1次',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../changeaddress/changeaddress?id=' + id,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
   
  }

})