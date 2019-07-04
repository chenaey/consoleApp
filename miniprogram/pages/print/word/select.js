Page({


  data: {

  },
  selectFile() {

    wx.chooseMessageFile({
      count: 100,
      type: 'file',
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFiles = res.tempFiles
        wx.navigateTo({
          url: 'list?filePath=' + JSON.stringify(res.tempFiles)
        })
      }
    })
  },

  onLoad: function(options) {

  },

})