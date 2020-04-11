// pages/goods_list/goods_list.js

import {
  request
} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList()
  },
  // 获取商品列表
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    });
    const total = res.data.message.total
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods],
    })
    wx.stopPullDownRefresh()
      
  },
  // 标题点击事件
  handleTabsItemChange(e) {
    // 获取被点击的索引
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((item, i) => i === index ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs
    })
  },

  // 页面上滑
  onReachBottom() {
    // 判断有没有下一页
    if (this.QueryParams.pagenum == this.totalPages) {
      // 没有下一页数据
      wx.showToast({
        title: '我是有底线的'
      });
    } else {
      // 有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }

})