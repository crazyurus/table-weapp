const app = getApp()
const data = require('../../mock/student.js').data;

Page({
  data: {
    course: data.course,
    week: data.week,
    start: data.start,

  },
  
})
