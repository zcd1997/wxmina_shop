// pages/cart/cart.js
import {
  request
} from '../../request/index.js'
import {
  showToast,
  requestPayment
} from '../../utils/asyncWx'
Page({

  data: {
    address: {},
    cart: [],
    totalprice: 0,
    totalnum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    // 获取缓存总的购物车
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked)
    let totalprice = 0;
    let totalnum = 0;
    cart.forEach(v => {
      totalprice += v.num * v.goods_price
      totalnum += v.num
    });
    this.setData({
      cart,
      totalprice,
      totalnum,
      address
    })
  },

  // 点击支付
  async handleOrderPay() {
    try {
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.switchTab({
          url: '/pages/auth/auth',
        });
      }
      // 创建订单
      // const header = {
      //   Authentication: token
      // }
      const order_price = this.data.totalprice;
      const consignee_addr = this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      }
      // 获取订单编号
      const {
        order_number
      } = await request({
        url: "/my/orders/create",
        method: "POST",
        data: orderParams,
    })
      // 发起预支付请求
      const {
        pay
      } = await request({
        url: "/my/orders/req_unifiedorder",
        method: "POST",
        data: {
          order_number
        }
      })
      // 发起微信支付
      await requestPayment(pay)

      // 获取订单状态
      const res = await request({
        url: "/my/orders/chkOrder",
        method: "POST",
        data: {
          order_number
        }
      })
      await showToast("支付成功");
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => v.checked)
      wx.setStorageSync("cart", newCart)

      wx.navigateTo({
        url: '/pages/order/order'
      });


    } catch (error) {
      await showToast("支付失败")

      console.log(error);
    }
  }
})