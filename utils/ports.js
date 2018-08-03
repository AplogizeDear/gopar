/* 接口api */
var offver = "http://192.168.100.188/api/v1/"

module.exports = {
  //首页轮播
  slider: offver + 'slide',

  // 首页排期
  schedule: offver +'schedule',

  // 排期详情
  detail: offver + 'schedule/detail',

  //发现页面
  found: offver + 'found',

  // 发现列表详情页
  fdetail: offver +'found/detail',


  // 登录模块
  // 登录接口
  loglist: offver + 'member/token',

  // 获取会员信息
  userinfo: offver + 'member/info',
  
  // 获取验证码
  getcode:offver + 'member/captcha',
  //登录接口请求
  login: offver + 'member/login',  
  //门票信息  门票详情
  getticket: offver + 'ticket/list',
  getticdet: offver + 'ticket/detail',

  // 订单列表  订单详情
  orderlist: offver + 'order/list',
  orderdetail: offver + 'order/detail',
  
  // 优惠券   领取
  couponlist: offver + 'coupon/list',
  couponcode: offver + 'coupon/exchange',

  // 地址列表
  addressList: offver + 'address/list',

  // 问题反馈 上传
  getpro: offver + 'feedback/template',
  upp: offver + 'feedback/add',

  //库存检测
  stock:offver + 'order/checkstock',
  //门票信息获取
  payorder:offver+ 'order/ticketpay',
  //订单提交
  putorder: offver + 'order/pay',

  // 修改个人昵称
  nicknameurl: offver + 'member/nickname',
  //修改性别
  sexurl: offver + 'member/gender',
  //修改个人简介
  profileurl: offver + 'member/profile',
  //修改会员中心背景图
  coverurl: offver + 'member/cover',
  //获取会员信息
  infourl: offver + 'member/info',
  //获取地址列表
  addresslist: offver + 'address/list',
  //添加地址
  addaddress: offver + 'address/add',
  //删除地址
  addressdel: offver + 'address/del',
  //获取门票收货地址
  addressinfo: offver + 'ticket/addressinfo',
  //修改门票的收货地址
  changeaddress: offver + 'ticket/address',
  //查看物流信息
  logistics: offver + 'order/logistics',
}