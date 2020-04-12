let ajaxcount = 0
export const request = (params) => {

    // 判断 url 是否要加 header token 
    let header = {...params.header}
    if (params.url.includes("/my")) {
        header["Authentication"] = wx.getStorageSync("token");
    }
    ajaxcount++;
    // 显示加载中效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });

    // url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resovle, reject) => {
        wx.request({
            ...params,
            header:header,
            url: baseUrl + params.url,
            success: (result) => {
                resovle(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxcount--;
                if (ajaxcount == 0) {
                    wx.hideLoading();
                }
            }
        })
    })
}