let ajaxcount = 0
export const request = (params) => {
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