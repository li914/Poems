// pages/poems/poems.js

import time from '../../tools/time.js';
import http from '../../tools/http.js';
import storage from '../../tools/storage.js';
import object_tools from '../../tools/object.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPicUrl: "http://cn.bing.com/az/hprichbg/rb/HegraTomb_ROW9937724990_1920x1080.jpg",
    startX: 0,
    screenWidth: 0,
    isChange: false,
    current: 0,
    id: 1,
    currentScreenWidth: 0,
    text_current: "text_current",
    radiusView: "current",
    // result:[]
    // left: 'margin-left:0px;'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad");
    this.setData({
      screenWidth: wx.getSystemInfoSync().screenWidth,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("onShow");
    let timestamp = time.timestamp();
    let pic_time = storage.getSync('pic_time');
    if (object_tools.isEmptyObject(pic_time)) {
      storage.setSync('pic_time', { 'time': timestamp });
      this.bingyingPic();
    }else{
      if (pic_time.time + 7200 < timestamp) {
        storage.setSync('pic_time', { 'time': timestamp });
        this.bingyingPic();
      }
      let data = storage.getSync('pic_path');
      this.setData({
        bgPicUrl:data.path
      })
    }
    this.startTime();
    var _this = this;
    let data = storage.getSync('poems');
    if (object_tools.isEmptyObject(data)) {
      this.requestHttp(timestamp);
      return;
    }
    let zeroTime = data.time;
    if (zeroTime + 86400 < timestamp) {
      storage.remove('poems');
      this.requestHttp(timestamp);
      return;
    }
    this.setData({
      result: data,
      id: data.id + 1
    });
  },
  /*
  请求背景图片
  **/ 
  bingyingPic: function() {
    wx.request({
      url: 'http://guolin.tech/api/bing_pic',
      data: {},
      method: 'GET',
      success: (res) => {
        storage.setSync('pic_path',{'path':res.data});
        this.setData({
          bgPicUrl: res.data,
        });
      }
    })
  },
  /***
   * 请求诗词经数据
   */
  requestHttp: function(time) {
    var _this = this;
    http.get({
      // url: "http://www.test.tp5.com/letter/" + time.timestamp(),
      url: "http://www.test.tp5.com/letter/" + time,
      success: function(res) {
        console.log(res);
        storage.set('poems', res);
        _this.setData({
          result: res,
          id: res.id + 1
        });
      }
    });
  },
  /***
   * 时钟函数
   */
  startTime: function() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.setData({
      h: h,
      m: m,
      s: s
    });
    let _this = this;
    let timer = setTimeout(function() {
      _this.startTime();
    }, 500);
  },
  checkTime: function(time) {
    if (time < 10) {
      time = "0" + time
    }
    return time;
  },
/**
 * 点击移动手指开始的函数
 */
  startM: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX,
      })
    }
  },
  /**
   * 点击移动手指结束的函数
   */
  endM: function(e) {
    var screenWidth = this.data.screenWidth;
    if (e.changedTouches.length == 1) {
      let endX = e.changedTouches[0].clientX;
      let disX = this.data.startX - endX;
      // console.log(disX);
      if (disX == 0) {
        return;
      }
      let left = "";
      if (disX > 0 && disX < screenWidth) {
        let current = this.data.current;
        if (disX >= screenWidth / 3) {
          // console.log('右', current);
          if (current == 3) {
            current = 0;
          } else {
            current++;
          }
          this.setData({
            current: current
          });
          left = "margin-left:-" + screenWidth * current + "px";
        } else {
          left = "margin-left:-" + screenWidth * current + "px";
        }
      }


      if (disX < 0 && -disX < screenWidth) {
        let current = this.data.current;
        if (-disX >= screenWidth / 3) {
          if (current == 0) {
            current = 3;
          } else {
            current--;
          }

          left = "margin-left:-" + screenWidth * current + "px";
          this.setData({
            current: current
          });
        } else {
          left = "margin-left:-" + screenWidth * current + "px";
        }
      }
      this.setData({
        left: left,
      });
    }

  },
  /**
   * 点击移动手指过程的函数
   */
  moveM: function(e) {
    if (e.touches.length == 1) {
      let moveX = e.touches[0].clientX;
      let disX = this.data.startX - moveX;
      let screenWidth = this.data.screenWidth;
      if (disX == 0) {
        return;
      }
      let current = this.data.current;
      let left = "margin-left:-" + screenWidth * current + "px";
      if (disX > 0 && disX < screenWidth) {
        if (disX >= 30) {
          let disWidth = screenWidth * current + disX;
          left = "margin-left:-" + disWidth + "px";
        }
      }
      if (disX < 0 && -disX < screenWidth) {
        if (-disX >= 30) {
          let disWidth = screenWidth * current + disX;
          left = "margin-left:-" + disWidth + "px";
        }
      }
      this.setData({
        left: left,
      });
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("onPullDownRefresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("onShareAppMessage")
  }
})