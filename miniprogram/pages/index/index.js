Page({
  data: {
    // 顶部轮播图
    topImgs: [],
  },
  //加载函数
  onLoad() {
    //获取首页轮播图
     wx.cloud.database().collection('carousel')
      .get()
      .then(res => {
        console.log('轮播图', res)
        this.setData({
          topImgs: res.data
        })
      })
    //获取首页通知信息
      wx.cloud.database().collection('news')
      .get()
      .then(res => {
        console.log('公告', res)
        this.setData({
          news: res.data
        })
      })
      wx.stopPullDownRefresh()
  },
  onPullDownRefresh: function () {
    this.onLoad()
    },
  //查看通知详情
  showNoctice(e) {
    console.log(e)
    let title = e.currentTarget.dataset.title
    let content = e.currentTarget.dataset.content
    wx.showModal({
      title: title,
      content: content
    })
  },
  //发布需求页
  addServer(e){
  let name = e.currentTarget.dataset.name
  wx.navigateTo({
    url: '/pages/add/add?name='+name,
  })
  },
  //发布需求页
  addvideo(e){
  let name = e.currentTarget.dataset.name
  wx.navigateTo({
    url: '/pages/addvideo/addvideo?name='+name,
  })
  },
  // 发表故事
  addstory(e){
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/addstory/addstory?name='+name,
    })
    }
})