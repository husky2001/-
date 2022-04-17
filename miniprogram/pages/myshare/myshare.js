const db = wx.cloud.database();
const share = db.collection("share");
const video = db.collection("video");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    story:"",
    contrnt:"",//存放数据库中调用的图片和文字
    tabs:[
      {
        id:0,
        name:"图片电影",
        isActive:true
      },
      {
        id:0,
        name:"治愈短片",
        isActive:false
      },
      {
        id:0,
        name:"新闻故事",
        isActive:false
      }
    ]
  },

  // 自定义事件
  handleItemChange(e){
    // 接受传递过来的参数
    const {index} = e.detail;
    // 获取data中的数组
      let {tabs} = this.data;
      // 循环数组
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);

      this.setData({
        tabs
      })
  },

// 获取用户分享的图片和文字信息
getvideo:function(){
  db.collection('video').where({
    _openid:'openid',
  })
  .orderBy('createTime','desc').get({
    success:res=> {

      this.setData({
        video:res.data
      })
    }
  })
},
// 获取用户分享的小故事和新闻
getstory:function(){
  db.collection('story').where({
    _openid:'openid',
  })
  .orderBy('createTime','desc')
  .get({
    success:res=> {
      this.setData({
        story:res.data
      })
    }
  })
},

  getData:function(){
    db.collection('share').where({
      _openid:'openid',
    })
    .orderBy('createTime','desc')
    .get({
      success:res=> {
        this.setData({
          content:res.data
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getstory()
    this.getvideo();
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
    this.getstory()
    this.getData()
    this.getvideo();
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