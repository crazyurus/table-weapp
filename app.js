//app.js
App({
  getApiData(url, data, sno, loading = true) {
    const self = this;
    if (loading) {
      wx.showLoading({
        title: loading ? '加载中' : loading
      });
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: data ? 'POST' : 'GET',
        dataType: 'json',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-SNO': sno
        },
        data: data,
        success(result) {
          if (result.data.errCode == 0) resolve(result.data.data);
          else if (reject) reject(result.data);
        },
        fail(result) {
          self.toast('网络错误');
          if (reject) reject(result);
        },
        complete() {
          if (loading) wx.hideLoading();
          else wx.stopPullDownRefresh();
        }
      });
    });
  },
  globalData: {
  }
})