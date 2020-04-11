//Page Object
import {
  request
} from '../../request/index.js'
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数组
    cateList: [],
    // 楼层数据
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    // 发送请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });
    request({
        url: '/home/swiperdata'
      })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  // 获取分类数据
  getCateList() {
    request({
        url: '/home/catitems'
      })
      .then(result => {
        this.setData({
          cateList: result.data.message
        })
      })
  },
  // 获取楼层数据
  getFloorList() {
    request({
        url: '/home/floordata'
      })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  },


  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});