const app = getApp()
const data = require('../../mock/student.js').data;

Page({
  data: {
    course: data.course,
    week: 4,
    start: data.start,

  },
  
})
