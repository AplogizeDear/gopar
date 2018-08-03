// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:'',
  },
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        var imgs = that.data.imgs;
        that.setData({
          imgs: imgs  
        })
        that.setData({
          imgs: tempFilePaths
        });
      },
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    console.log(imgs);
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  gonick:function(){
    wx.navigateTo({
      url: '../../pages/gonick/gonick',
    })
  },
  gosex: function () {
    wx.navigateTo({
      url: '../../pages/gosex/gosex',
    })
  },
  gopas: function () {
    wx.navigateTo({
      url: '../../pages/gopas/gopas',
    })
  },
  goper: function () {
    wx.navigateTo({
      url: '../../pages/goper/goper',
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