const app = getApp()
const data = require('../../mock/student.js').data;

Page({
  data: {
    course: data.course,
    week: data.week,
    start: data.start,
    current: {}
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
