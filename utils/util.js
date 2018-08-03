/* 我们在这里写一些功能性函数 */

/*时间戳转换*/
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/

//这个方法的用法  arr.push(util.formatTime(i,'M/D h:m:s'));
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}    

// 倒计时
var wxtimer = function (initObj) {
  initObj = initObj || {};
  this.beginTime = initObj.beginTime || "00:00:00";
  this.interval = initObj.interval || 0;
  this.complete = initObj.complete;
  this.intervalFn = initObj.intervalFn;

  this.startTime
}

wxtimer.prototype = {
  //开始
  start: function (self) {
    this.endTime = new Date("1970/01/01 " + this.beginTime).getTime();//1970年1月1日的00：00：00的字符串日期
    this.endSystemTime = new Date(Date.now() + this.endTime);
    //开始倒计时
    var that = this;
    var count = 0;//这个count在这里应该是表示s数，js中获得时间是ms，所以下面*1000都换成ms
    function begin() {
      var tmpTime = new Date(that.endTime - 1000 * count++);
      //把2011年1月1日日 00：00：00换成数字型，这样就可以直接1s，1s的减，就变成了倒计时，为了看的更明确，又用new date把字符串换回来了
      var tmpTimeStr = tmpTime.toString().substr(16, 8);//去掉前面的年月日就剩时分秒了
      var wxTimerSecond = (tmpTime.getTime() - new Date("1970/01/01 00:00:00").getTime()) / 1000;
      self.setData({
        wxTimer: tmpTimeStr,
        wxTimerSecond: wxTimerSecond,
      });
      //时间间隔执行函数
      if (0 == (count - 1) % that.interval && that.intervalFn) {
        that.intervalFn();
      }
      //结束执行函数
      if (wxTimerSecond <= 0) {
        if (that.complete) {
          that.complete();
        }
        that.stop();
      }
    }
    begin();
    this.intervarID = setInterval(begin, 1000);
  },
  //结束
  stop: function () {
    clearInterval(this.intervarID);
  },
  //校准
  calibration: function () {
    this.endTime = this.endSystemTime - Date.now();
  }
}


/* api接口promise 柯里化 */
var Promise = require('../lib/es6-promise.min.js');
function wxPromisify(fn, scope) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res);
      }
      obj.fail = function (res) {
        reject(res);
      }
      if (scope) {
        //改变this指向
        var newFn = fn.bind(scope);
        newFn(obj);
      } else {
        fn(obj);
      }
    })
  }
}
/* request 封装*/
var wxrequest = wxPromisify(wx.request);
function wxRequest(options, tokenNotRequired){
    return wxrequest(options).then(res => {
      var data = res.data;
      if(data.status === 404) {
          if(tokenNotRequired){
                delete options.headers;
                return wxRequest(options);
          }else{
                return updateToken().then(token => {
                    return wxRequest(object.assignIn(options, {
                        headers: { 'X-Auth-Token': token }
                    }));
                });
          }
      }else {
          return Promise.resolve(data);
      }
    }).catch(err => {
      return Promise.reject(err);
    });
}


// 发送
function req(url, data, cb) {
  wx.request({
    url: url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

// 带token发送数据
function reqt(url, data, cb) {
  var token = wx.getStorageSync('token');
  wx.request({
    url: url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded','token': token},
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
// 带用户 发起请求数据
function getReq(url,cb) {
  var token = wx.getStorageSync('token');
  console.log(token);
  wx.request({
    url:url,
    method: 'get',
    header: { 'Content-Type': 'application/json','token':token},
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

// 不带用户 发起请求数据
function getnReq(url,cb) {
  var _this = this;
  wx.request({
    url: url,
    method: 'get',
    header: { 'Content-Type': 'application/json'},
    success: function (res) {
      return typeof cb == "function" && cb(res)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

/*
  wx.request({
    url:'',
    header:{}.
    data:{}.
    success:function(res)
  })

*/


// 去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
// 提示错误信息
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}
// 清空错误信息
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}

module.exports = {
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  wxRequest:wxRequest,
  req:req,
  getReq: getReq,
  getnReq: getnReq,
  trim: trim,
  isError: isError,
  clearError: clearError,
  wxtimer:wxtimer,
  reqt: reqt
}