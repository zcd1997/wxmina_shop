// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from '../../utils/asyncWx'
Page({

  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalprice: 0,
    totalnum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    // 获取缓存总的购物车
    const cart = wx.getStorageSync("cart") || [];
    // 全选的设置
    // const allChecked = cart.length != 0 ? cart.every(v => v.checked) : false;
    this.setCart(cart)
    this.setData({
      address
    })
  },

  // 点击收货地址
  async handleChooseAddress() {
    try {
      // 获取权限状态
      const res1 = await getSetting()
      // 当发现一些属性名很怪异的时候，需要用【】来过去属性值
      const scopeAddress = res1.authSetting["scope.address"]
      // 判断
      if (scopeAddress === false) {
        // 用户拒绝过授予权限，需要让用户打开授权界面
        await openSetting()
      }
      const address = await chooseAddress();
      // 在本地存储收货地址
      wx.setStorageSync("address", address);

    } catch (error) {
      console.error(error);
    }
  },

  // 购物车复选框点击事件
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => {
      return v.goods_id == goods_id
    });
    cart[index].checked = !cart[index].checked;
    this.setCart(cart)
  },
  // 全选按钮
  handleItemAllChecked() {
    let {
      cart,
      allChecked
    } = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },

  // 商品数量增减
  async hadnleItemNumEdit(e) {
    const {
      id,
      opera
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    const index = cart.findIndex(v => v.goods_id == id)
    if (cart[index].num === 1 && opera === -1) {
      const res = await showModal({
        content: '是否要删除该商品'
      })
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      cart[index].num += opera
      this.setCart(cart)
    }
  },

  // 重新计算购物车状态
  setCart(cart) {
    let allChecked = true;
    let totalprice = 0;
    let totalnum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalprice += v.num * v.goods_price
        totalnum += v.num
      } else {
        allChecked = false
      }
    });
    allChecked = cart.length != 0 ? allChecked : false
    wx.setStorageSync("cart", cart);
    this.setData({
      cart,
      totalprice,
      totalnum,
      allChecked
    })
  },

  // 结算
  async handlePay() {
    const {
      address,
      totalnum,
      cart
    } = this.data
    if (!address.userName) {
      await showToast({
        title: '您还没有选择收货地址！'
      })
      return;
    }
    if (totalnum === 0) {
      await showToast({
        title: '您还没有选择商品！'
      })
      return;
    }

    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  }
})