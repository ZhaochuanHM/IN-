// pages/dealers_activity/dealers_activity.js
const common = require('../../utils/common.js');
const app = getApp();
var loadMoreView;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datas: { arr: [] },
    currPage: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 进行中的活动列表
    this.old_activity_List();
    loadMoreView = this.selectComponent("#loadMoreView")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(11)
    loadMoreView.loadMore();
  },

  /**
   * 监听加载更多
   */
  loadMoreListener: function () {
    var currPage = this.data.currPage + 1;
    this.setData({ currPage: currPage });
    this.old_activity_List();
  },

  /**
   * 点击加载更多
   */
  clickLoadMore: function () {
    this.old_activity_List();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 往期活动列表
   */
  old_activity_List: function () {
    let this_ = this;
    let url = app.globalData.base_host;
    let sessionId = wx.getStorageSync('sessionId');
    let param = {
      sessionId: sessionId,
      page: this_.data.currPage,
      waStatus: 2,
    }


    // 列表加载
    common.common_ajax(url + '?c=Agency&a=waList', param, true, function (data) {
      if (data.result == 'success') {
        var len = data.data.length;

        // loading完成
        loadMoreView.loadMoreComplete(len);

        if (len) {
          var arr = [];
          for (var i = 0; i < data.data.length; i++) {
            arr.push({
              reward: data.data[i].wa_type_str,
              time: data.data[i].create_time,
              title: data.data[i].wa_name,
              activity_time: data.data[i].start_time + " ~ " + data.data[i].end_time,
              good_img: data.data[i].prize_theme,
              show_status: 0
            })
          }

          var newDataList = this_.data.datas.arr.concat(arr);
          this_.setData({
            datas: { arr: newDataList }
          })
        }

      } else {
        loadMoreView.loadMoreFail();
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})