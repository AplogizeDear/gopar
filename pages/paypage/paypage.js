// pages/paypage/paypage.js
var ports = require('../../utils/ports.js');
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size_detail: '',
    schedule_detail:'',
    total_price:'',
    request_data:'',
    coupon_count:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var num = options.num;
    var id = options.id;
    var ticid = options.ticid;
    console.log(id,ticid);
    util.getReq(`${ports.payorder}?id=${ticid}&size_id=${id}&ticket_num=${num}`,function cb(res){
        console.log(res);
        _this.setData({
          size_detail: res.size_detail,
          schedule_detail: res.schedule_detail,
          total_price: res.total_price,
          request_data: res.request_data,
          coupon_count: res.coupon_count
        })
    })

  },
  immpay:function(){
    var orderdata = {
    // 品牌id
    brands_id :this.data.schedule_detail.brands_id,
    //排期表id
    schedule_id :this.data.size_detail.schedule_id,
    total_price :this.data.total_price,
    ticket_num :this.data.request_data.ticket_num,
  // 优惠劵id
    coupon_id:0,
    //门票单价
    price :this.data.size_detail.price,
    // 场次日期
      ticket_date: this.data.size_detail.ticket_date,
    // 门票名称
    ticket_name :this.data.schedule_detail.title,
    //门票详情id
    ticket_id :this.data.schedule_detail.id,
    express_price:0,
    dis_price : 0,
    address_id:0,
    coupon_id:0,
    }
    console.log(orderdata);
    util.reqt(`${ports.putorder}`, orderdata, function cb(response){

      var timeStamp = (Date.parse(new Date()) / 1000).toString();
      var pkg = 'prepay_id=' + response.prepay_id;
      var nonceStr = response.nonce_str;
      
      var paySign = md5.hexMD5('appId=' + 'wxaa1d41c1bb1ffa04' + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5&timeStamp=' + timeStamp + "&key=ac4a03601c31fd87767841a5119583ba").toUpperCase();

          wx.requestPayment({
            'timeStamp': timeStamp,
            'nonceStr': nonceStr,
            'package': pkg,
            'signType': 'MD5',
            'paySign': paySign,
            'success': function (res) {
              console.log(res);
            },
            fail:function(res){
              console.log(res);
            }
          });
        
    })
  },
  gocoupon:function(){
    wx.navigateTo({
      url: '../../pages/coupon/coupon',
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