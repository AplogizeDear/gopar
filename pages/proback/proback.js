// pages/proback/proback.js
var util = require('../../utils/util.js');
var ports = require('../../utils/ports.js');

var mobile;
var value;
var tempFilePaths;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: "",
    currentindex: 0,
    imgs: '../../img/update_img.png',
    num: 0,
    filePath: [],
    id:'',
    
  },
  localindex: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var _this = this;
    this.setData({
      currentindex: index,
      id:id
    })
  },
  mobileInput: function (e) {
    mobile = e.detail.value
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
        that.setData({
          tempFilePaths:res.tempFilePaths[0]
        })
        tempFilePaths = res.tempFilePaths[0];
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
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  numbertext: function (e) {
    var that = this;
    value = e.detail.value;

    var len = parseInt(value.length);
    var num = len;
    if (num <= 100) {
      that.setData({
        num: num
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    util.getnReq(`${ports.getpro}`,function cb(res){
      console.log(res.data);
      _this.setData({
        typeList: res.data,

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

  },
  // 提交
  submit: function (e) {
    var _this =this;
    if (mobile == undefined || mobile == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      
      var tempFilePaths = this.data.tempFilePaths;
      var id = this.data.id;
      var that = this;
      var formData = {
        feedback_id: id,
        content: value,
        phone_mob: mobile,
        feedback_img: tempFilePaths
      }
      const uploadTask = wx.uploadFile({
        url: `${ports.upp}`,
        filePath: tempFilePaths,
        name: 'feedback_img',
        formData: {
          feedback_id: id,
          content: value,
          phone_mob: mobile,
          },
        header: {
          'content-type': 'multipart/form-data',
        },
        success: function (res) {
          console.log(res)
        }
      })

      uploadTask.onProgressUpdate((res) => {
        if (res.progress==100){
           wx.showToast({
             title: '问题已知晓',
           })
          setTimeout(function () {
              var pages = getCurrentPages();
              var currPage = pages[pages.length - 1];   //当前页面
              var prevPage = pages[pages.length - 2];  //上一个页面
              wx.navigateBack({//返回
                delta: 2
              })
          }, 1000);
        }
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
    }
  }
})