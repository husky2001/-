const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
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
  //上传图片
  addImg(){
    let _this = this
    wx.chooseImage({
      count : 9,
      sizeType : ["original","compressed"], 
      sourceType : ["album","camera"],
      success : (chooseres)=>{ 
        console.log(chooseres,'选择图片')
          wx.cloud.uploadFile({
            cloudPath: "img/" + new Date().getTime() +"-"+ Math.floor(Math.random() * 1000),
            filePath : chooseres.tempFilePaths[0],
            success : (res) => { 
              console.log(res,'上传ok')
              wx.showLoading({ 
                title : "图片上传中", 
                mask : true, 
                success : function () {
                    wx.hideLoading() 
                }
              })
            let img = res.fileID
              _this.setData({
                img 
              })
            },
            fail : (err) => {
              console.log(err)
            }
          })
      },
      fail : (err) => {
        console.log(err)
      }
  })
  },

submitOrder(e) {
  let good = e.detail.value
 
    if (!good.content) {
      wx.showToast({
        icon: "error",
        title: '请填写内容'
      })
      return
    }
  
    wx.showLoading({
      title: '发布中...',
    })
   if(!this.data.img){
    this.setData({
      img:''
    })
   }
    db.collection('share').add({
      data: {
        type: this.data.server, //类型
        content: good.content, //内容
        img: this.data.img,
        status: 0, //状态
        createTime:db.serverDate()//用发布时间来进行排序
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        console.log('发布成功', res)
        wx.switchTab({
          url: '/pages/material/material',
        })
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: '网络不给力....'
        })
        console.error('发布失败', err)
      }
    })
  // }
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