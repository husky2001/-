const app = getApp();

Page({
 
  data: {
    userInfo: null,
  },
  onShow(options) {
    this.setData({
      userInfo: wx.getStorageSync('user')
    })
  },
  // button获取用户信息
  onGotUserInfo: function (e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        console.log(res)
        if (res.userInfo) {
          var user = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
          })
          // app.globalData.userInfo.nickName = user.nickName;
          app.globalData.userInfo.avatarUrl = user.avatarUrl;
          app._saveUserInfo(app.globalData.userInfo);
        } else {
        wx.showToast({
          title: '授权失败',
        })
        }
      }
    })
  },
  onShow:function(){
    
  },
    //退出登录
    loginOut() {
      wx.setStorageSync('user', null)
      this.setData({
        userInfo: null,
      })
    },
    share()
    {
      wx.navigateTo({
        url: '/pages/myshare/myshare',
      })
    },
    message()
    {
      wx.navigateTo({
        url: '/pages/mymessage/mymessage',
      })
    }
})
