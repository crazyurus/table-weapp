const app = getApp()

Page({
  data: {
    course: [],
    week: 1,
    init: 1,
    start: '2018-2-26',
    current: {},
    login: {
      sno: '',
      password: '',
      show: false
    },
    height: 0
  },
  onLoad() {
    // 计算导航高度
    let info = wx.getSystemInfoSync();
    this.setData({
      height: info.statusBarHeight + 44
    });

    // 读取缓存
    let cache = wx.getStorageSync('cache');
    this.showCourseTable(cache);

    // 请求课程数据
    let sno = wx.getStorageSync('sno');
    if (sno) this.loadCourseData(sno);
    else {
      this.setData({
        'login.show': true
      });
    }
  },
  loadCourseData(sno) {
    app.getApiData('https://web.wutnews.net/table/index/api', {}, sno).then(result => {
      wx.setStorageSync('cache', result);
      this.showCourseTable(result);
    });
  },
  showCourseTable(result) {
    this.setData({
      course: result.course,
      week: result.week,
      start: result.start,
      init: result.week
    })
  },
  inputSno(e) {
    this.data.login.sno = e.detail.value;
  },
  inputPassword(e) {
    this.data.login.password = e.detail.value;
  },
  loginOne() {
    this.loginCancel();
    app.getApiData('https://api.wutnews.net/one/user/login', {
      sno: this.data.login.sno,
      password: this.data.login.password,
      enc: 0
    }).then(result => {
      if (result.message) {
        app.alert({
          title: '登录失败',
          content: result.message
        });
      }
      else {
        wx.setStorageSync('sno', result.X_SNO);
        this.loadCourseData(result.X_SNO);
      }
    });
  },
  loginCancel() {
    this.setData({
      'login.show': false
    });
  },
  bindWeekChange(e) {
    this.setData({
      week: Number.parseInt(e.detail.value) + 1
    });
  },
  showCourseDetail(e) {
    const course = e.currentTarget.dataset.course;
    const self = this;

    if (course.length === 0) return;

    if (course.length === 1) {
      self.setData({
        current: course[0]
      });
      return;
    }

    let name_arr = course.map(item => {
      return item.name
    });

    wx.showActionSheet({
      itemList: name_arr,
      success(res) {
        self.setData({
          current: course[res.tapIndex]
        });
      }
    });
  },
  hideCourseDetail() {
    this.setData({
      current: {}
    });
  }
})
