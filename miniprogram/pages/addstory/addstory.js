const db = wx.cloud.database();
const story = db.collection("story");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxNumber: 400,//可输入最大字数
    number: 0,//已输入字数
    
    loading: true,  //是否正在加载
    textTitle:"",//故事标题
    textValue:"",	//故事内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let server = options.name
    this.setData({
      server
    })
  },

// 输入故事
submitstory:function(e){
  story.add({	//存入数据库
    data: {
      title:e.detail.value.title,
      text: e.detail.value.content,
      createTime:db.serverDate(),
    }
  }).then(res => {
    wx.showToast({	//提示弹窗
      title: "分享成功",
      icon: "success",
      success: res2 => {
        wx.switchTab({
          url: '/pages/material/material',
        })
      }
    })
  })
},
// 监听字数变化
inputText: function (e) {
  let value = e.detail.value;
  let len = value.length;
  this.setData({
    'number': len
  })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})