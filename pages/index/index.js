const app = getApp()
const data = require('../../mock/student.js').data;

Page({
  data: {
    course: data.course,
    week: 21,
    start: data.start,

  },
  
})
