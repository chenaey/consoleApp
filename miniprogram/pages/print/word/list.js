// pages/print/word/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadList: [{
      name: "1 - 副本 (2) - 副本.png",
      path: "http://tmp/wx0c160132b72ae839.o6zAJs9gSLEmu6OWAwsYlv8AwGa4.SyGLiNYMXUkD8e98e694afeed2b2e0180dabf79fba12.png",
      num: 1,
      double: "单面",
      ramark: undefined,

    }, {
      name: "1 - 副本 (2) - 副本.png",
      path: "http://tmp/wx0c160132b72ae839.o6zAJs9gSLEmu6OWAwsYlv8AwGa4.SyGLiNYMXUkD8e98e694afeed2b2e0180dabf79fba12.png",
      num: 1,
      double: "单面",
      ramark: undefined,
    }, {
      name: "1 - 副本 (2) - 副本.png",
      path: "http://tmp/wx0c160132b72ae839.o6zAJs9gSLEmu6OWAwsYlv8AwGa4.SyGLiNYMXUkD8e98e694afeed2b2e0180dabf79fba12.png",
      num: 1,
      double: "单面",
      ramark: undefined,
    }],

    items: [{
        name: '单面',
        value: '单面',
        checked: 'true'
      },
      {
        name: '双面',
        value: '双面',
      },
    ],
    array: ['1-333', '2-333', '3-333', '4-333', '5-333', '6-333'],
    index: 0,
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  toSelect() {
    var that = this
    wx.chooseMessageFile({
      count: 100,
      type: 'file',
      success(res) {
        console.log(res)

        // tempFilePath可以作为img标签的src属性显示图片
        const tempFiles = res.tempFiles
        for (var i = 0; i < tempFiles.length; i++) {
          tempFiles[i].num = 1
          tempFiles[i].double = "单面"
          tempFiles[i].ramark = undefined
        }

        var data = that.data.uploadList.concat(res.tempFiles)
        that.setData({
          uploadList: data
        })
      }
    })
  },

  radioChange(e) {
    console.log(e)
    this.data.uploadList[e.currentTarget.dataset.index].double = e.detail.value
    this.setData({
      uploadList: this.data.uploadList
    })
  },

  changeRemark(e) {
    // console.log(e)
    // console.log(e.detail.value)
    this.data.uploadList[e.currentTarget.dataset.index].ramark = e.detail.value

    // this.setData({
    //   uploadList: this.data.uploadList
    // })
  },
  toDelete(e) {
    this.data.uploadList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      uploadList: this.data.uploadList
    })
    wx.showToast({
      title: '删除成功',
      icon: 'none'
    })
  },

  changeNum(e) {
    console.log(e)
    if (e.detail.value <= 0) {
      wx.showToast({
        title: '份数错误,请检查',
      })
    } else {
      this.data.uploadList[e.currentTarget.dataset.index].num = e.detail.value
      this.setData({
        uploadList: this.data.uploadList
      })
    }
  },

  previewFile(e) {
    console.log(e)
    var filePath = this.data.uploadList[e.currentTarget.dataset.index].path
    wx.openDocument({
      filePath,
      success(res) {
        console.log('打开文档成功')
      },
      fail(e) {
        console.log(e)
      }
    })
  },

  submit() {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '上传文件中',
    })
    var that = this
    var data = that.data.uploadList

    for (var i = 0; i < data.length; i++) {
      var time = Date.parse(new Date()) / 1000; //时间戳
      const cloudPath = 'zhku/我的打印机/' + time + data[i].name
      var count = 0
      wx.cloud.uploadFile({
        cloudPath,
        filePath: data[i].path, // 文件路径
      }).then(res => {
        count = count + 1
        // get resource ID
        console.log(res.fileID)
        if (count === data.length) {
          wx.hideLoading()
          wx.hideNavigationBarLoading()

        }
      }).catch(error => {
        wx.showToast({
          title: data[i].name + "上传失败",
          icon: 'none'
        })
      })
    }



  },

  onLoad: function(options) {
    // var filePaths = JSON.parse(options.filePath)
    // console.log(filePaths)
  },


})