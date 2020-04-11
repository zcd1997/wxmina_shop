// pages/category/category.js
import {
  request
} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击菜单选项
    currentIndex: 0,
    // 滚动条top距离
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 小程序中也存在本地存贮技术
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates()
    } else {
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCates()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(i => i.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  // 获取分类数据
  async getCates() {
    // request({
    //     url: '/categories'
    //   })
    //   .then(result => {
    //     this.Cates = result.data.message
    //     // 存入本地
    //     wx.setStorageSync('cates', {
    //       time: Date.now(),
    //       data: this.Cates
    //     });

    //     let leftMenuList = this.Cates.map(i => i.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    const res = await request({
      url: '/categories'
    });
    this.Cates = res.data.message
    // 存入本地
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    });

    let leftMenuList = this.Cates.map(i => i.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })

  },
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
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