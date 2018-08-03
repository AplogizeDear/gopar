var util = require('../../utils/util.js');
var ports = require('../../utils/ports.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    post:'',
    list:'',
    top:'',
    selectstatus:false,
    ticket_type:'',
    minusStatus: 'disabled',
    showModalStatus:false,
    detail_list:'',
    timeList:'',
    currentindex:0,
    currentticket:0,
    num: 1,
    price:'',
    originprice:'',
    // 是否已经结束
    end:false,
    pay_btn:0,
    // 设置初始库存
    stock_num:'',
    // 设置初始限购次数
    limit_num:'',
    //票种id
    id:'',
    postid:''
  },
  //显示对话框
  showModal: function () {
    var that = this
     // 获取当前滚动高度  一个小问题  稍后解决
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pay_btn:1
        });
      }
    })
    //显示遮罩
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },


  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      pay_btn:0,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //减
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var price = (parseInt(this.data.originprice) * num).toFixed(2);
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      price:price
    });
  },  
  // 加
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    //原始价格
    var price = (parseInt(this.data.originprice) * num).toFixed(2);
    // 库存检测
    var stock = this.data.stock_num;
    //限购数量
    var limit_num = this.data.limit_num;
    //先判断库存  再判断限购
    if(num > stock){
      wx.showToast({
        title: '库存不足',
        icon: 'success',
        duration: 2000
      })
      num = stock;
      return false;
    }
    if (limit_num!='' && num>limit_num){
      wx.showToast({
        title: `本次限购${limit_num}张`,
        icon: 'none',
        duration: 2000,
      })
      num = limit_num;
      return false;
    }
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      price:price
    });
  }, 
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  getid:function(e){
    var timeid = e.target.dataset.id;
    this.dbpost = new DBPost(timeid);
    this.postData = this.dbpost.gettimeId();
    this.setData({
      selectstatus:true
    })
  },
  onCollectTab:function(){
    var newData = this.dbpost.collect();
    this.setData ({
      'post.collectstatus': newData.collectstatus,
      'post.collectnum': newData.collectnum,

    }),
  wx.showToast({
    title: newData.collectstatus? '收藏成功':'取消收藏',
    duration:1000,
    icon:'success',
    mask:true,
  })
  },

  onUpTab: function () { 
    var newData = this.dbpost.up();
    this.setData({
      'post.likenum': newData.likenum,
      'post.likestatus': newData.likestatus,
    })
  },

  paypage:function(){
    var num = this.data.num;
    var id = this.data.id;
    var ticid = parseInt(this.data.postid);
    util.reqt(`${ports.stock}`, { ticket_id: id, ticket_num: num },function cb(res){
      if(res.msg == 'ok'){
        wx.navigateTo({
          url: `../../pages/paypage/paypage?num=${num}&id=${id}&ticid=${ticid}`,
        })
      }else{
      wx.showToast({
          title: `${res.msg}`,
          icon: 'none',
          duration:2000,
          mask: true,
        })
       return false;
      }
    })
    
  },
  localindex:function(e){
     var index = e.currentTarget.dataset.index;
     var dd = e.currentTarget.dataset.id;
     var datalist = this.data.detail_list;
     var ticlist = datalist[index].ticket_list;
     var price = datalist[index].ticket_list[0].price;
     var stock_num = datalist[index].ticket_list[0].stock_num;
     var limit_num = datalist[index].ticket_list[0].limit_num;
     var id = datalist[index].ticket_list[0].id;
     var origin = price;
      var _this = this;
      this.setData({
        currentindex:index,
        ticket_type: ticlist,
        currentticket:0,
        price:price,
        num:1,
        originprice:origin,
        stock_num: stock_num,
        limit_num: limit_num,
        id:id
      })
  },
  localticket:function(e){
    var _this =this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var ticket_type = this.data.ticket_type;
    var price = ticket_type[index].price;
    //原始价格重新赋值
    var origin = price;
    // 原始库存重新赋值
    var stock_num = ticket_type[index].stock_num;
    var limit_num = ticket_type[index].limit_num;
    this.setData({
      currentticket:index,
      price:price,
      originprice:origin,
      limit_num: limit_num,
      num:1, 
      id:id
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.postid;
    var _this = this;
    util.getnReq(`${ports.detail}/${postid}`,function cb(res){
      var price = res.data.date_list[0].ticket_list[0].price;
      // 用默认值origin
      var origin = price;
      //设置首项默认库存
      var stock_num = res.data.date_list[0].ticket_list[0].stock_num;
      var limit_num = res.data.date_list[0].ticket_list[0].limit_num;
      var id = res.data.date_list[0].ticket_list[0].id;
      //转换成wxml css
      WxParse.wxParse('article', 'html',res.data.schedule_detail.description, _this, 5);
      // 判断时间是否过期
      let end;
      // 门票结束时间
      var date = new Date(res.data.schedule_detail.end_time);
      var time = date.getTime();
      // 门票现在的时间
      var currentDate = new Date();
      var currenttime = currentDate.getTime();
      // 判断一下门票是否过期
      if (time < currenttime){
        end = false
      }else{
        end = true
      }
      _this.setData({
        detail_list: res.data.date_list,
        post: res.data.schedule_detail,
        ticket_type: res.data.date_list[0].ticket_list,
        price:price,
        originprice:origin,
        end:end,
        stock_num: stock_num,
        limit_num: limit_num,
        id:id,
        postid:postid
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