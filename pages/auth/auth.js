// pages/auth/auth.js
import {
  request
} from '../../request/index.js'
import {
  login
} from '../../utils/asyncWx'

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  async handleGetUserInfo(e) {
    try {
      // 获取用户信息
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      // 发送请求
      const {
        token
      } = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: "post",
      })
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.error(error)
    }

  }
})