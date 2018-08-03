// pages/home/home.js
// 引入功能性函数
var util = require('../../utils/util.js');
var ports =require('../../utils/ports.js');
// 引入promise
var Promise = require('../../lib/es6-promise.min.js');
// 引入灯箱组件
var Slider = require('../../template/slider/slider.js');
// 获取app实例
var appInstance = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前地址信息
    address: {},
    // 首页排期
    indexData:'',
    schedule:[],
    isHideLoadMore:true,
    current_page:1,
    //banner图
    picList:[],
    //搜索页面显示
    showsearch:false,
    currentTime:'',

  },
  setStoreData:function(){

  },
  onTabtoDetail:function(e){
    var postid = e.currentTarget.dataset.postId;
    wx.navigateTo({
      url: `../../pages/detail/detail?postid=${postid}`,
    })
  },
  changeShowStoreDetail: function () {
    var _self = this;
    this.setData({
      showStoreDetail: !_self.data.showStoreDetail
    });
  },
  //获取排期列表
  getProductList:function() {
    var _self = this;
    return util.wxRequest({
      url: ports.schedule
    }).then(function (result) {
      return result;
    }).catch((e) => {
      return Promise.reject(e);
    });
  },
  // 获取首页轮播
  getSlider:function(){
    var _this=this;
    return util.wxRequest({
      url: ports.slider
    }).then(function(result){
      return result;
    }).catch((e) => {
       return Promise.reject(e)
    })
  },
  //控制搜索页面
  showbtn:function(){
    wx,wx.navigateTo({
      url: '../../pages/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.slider = new Slider(this);
    this.getProductList().then(result=>{
      console.log(result);
      var data = new Date();
      var currentTime = data.getTime();
      //价格最高价格和最低价格的判断
      _this.setData({
        schedule: result.data.data,
        indexData:result.data,
        currentTime: currentTime
      })
    });
  let arr = [];
  this.getSlider().then(result=>{
      let arr = [];
      for(let i in result){
        arr.push(result[i].img_url);
      }
      _this.setData({
        picList:arr
      })
      this.slider.initData(
        _this.data.picList
      );    
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
    this.setData({
      isHideLoadMore: false,
    })
    var current_page = this.data.current_page + 1;
    var _self = this;
    return util.wxRequest({
      url: `${ports.schedule}?page=${current_page}`,
    }).then(function (res) {
      _self.setData({
        schedule: _self.data.schedule.concat(res.data.data),
        current_page:current_page
      })
      return result;
    }).catch((e) => {
      return Promise.reject(e);
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})