// pages/gosex/gosex.js
var ports = require('../../utils/ports.js');
var gender;
var id;
var sex;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: [
      {
        sex: '男',
        selectImage: false
      },
      {
        sex: '女',
        selectImage: true
      }
    ]
  },
  // 男女性别切换
  selectClick: function (event) {
    console.log(event)
    sex = event.target.dataset.sex;
    for (var i = 0; i < this.data.model.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.model[i].selectImage = false;
      }
      else {
        this.data.model[i].selectImage = true;
      }
    }
    this.setData(this.data);
    if (event.target.dataset.sex=="男"){
      gender=1;
    }
    else if (event.target.dataset.sex == "女"){
      gender = 0;
    }
  },
  // 向数据库提交性别值
  confirm_btn:function(){
    var token = wx.getStorageSync("token");
    console.log(token);
    console.log(gender);    
    wx.request({
      url: ports.sexurl,
      method: 'POST',
      header: { 
        'Content-Type': 'application/x-www-form-urlencoded',
         token: token
         },
      data: {
        gender: gender
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '性别修改成功',
          icon: "success",
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '../personal/personal?gender=' + sex,
              })
            }, 2000)
          }
        })
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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