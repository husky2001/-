const db = wx.cloud.database();
const message = db.collection("message");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxNumber: 140,//可输入最大字数
    number: 0,//已输入字数
    
    loading: true,  //是否正在加载
    textValue:"",	//输入框内容
    content:""//留言内容
  },


  onSubmit:function(e){
    // console.log(e);
    message.add({	//存入数据库
      data: {
        text: e.detail.value.msgInput,
        createTime:db.serverDate(),
      }
    }).then(res => {
      wx.showToast({	//提示弹窗
        title: "留言成功",
        icon: "success",
        success: res2 => {
          this.setData({
            textValue: ""	//让输入框内容清空
          });
          this.getData();
        }
      })
    })
  },
  
// 从数据库读取留言
getData:function(){
  db.collection('message').orderBy('createTime','desc').get({
    success:res=> {
      this.setData({
        content:res.data
      })
    }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.getData();	//刷新页面数据
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
    this.getData()
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