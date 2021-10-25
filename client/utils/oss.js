// https://sharepuls.xcmbkj.com
import {
  deleteQnFile
} from '../api/oss'
/**
 * 图片上传七牛云
 */
const url = 'https://upload-z2.qiniup.com'
let count = 0,
  urlArr = []

const qiniuTools = {
  uploadQiniu(tempFilePaths, token) {
    console.log(tempFilePaths)
    return new Promise((resolve, reject) => {
      if (!tempFilePaths.length) reject('empty')
      uploadFile(tempFilePaths, token, resolve, reject)
    })
  },
  deleteQiniu(fileUrl) {
    // 删除多个文件
    fileUrl.forEach((file, index) => {
      // const re = /[\w]\/[\w]\S*[.]\w+/
      const re = /[\w]\/[\w]\S*/
      //获取图片名
      const key = file.match(re)[0].split("/")[1]
      deleteQnFile({
        key
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    });
  }
}

function uploadFile(tempFilePaths, token, resolve, reject) {
  wx.uploadFile({
    url,
    name: 'file',
    filePath: tempFilePaths[count].url,
    header: {
      "Content-Type": "multipart/form-data"
    },
    formData: {
      token,
    },
    success: function (res) {
      // to do ...
      console.log(res)
      urlArr.push(res)
        ++count
      if (tempFilePaths.length > 1) {
        // 多文件上传
        if (count === tempFilePaths.length) {
          console.log('All uploaded successfully')
          resolve(urlArr)
        }
      } else {
        // 单文件上传
        console.log('All uploaded successfully')
        resolve(urlArr)
      }
    },
    fail: function (res) {
      ++count
      console.log(res)
      reject(res)
    },
    complete(res) {
      // console.log(res)
      if (count >= tempFilePaths.length) {
        count = 0
        urlArr = []
      } else {
        qiniuTools.uploadQiniu(tempFilePaths, token).then(res => {
          resolve(res)
          // 还原数据
          count = 0
          urlArr = []
        })
      }
    }
  })
}

// ((tempFilePaths, token) => {
//   console.log(389382)
//   console.log(tempFilePaths[count].url)
//   wx.uploadFile({
//     url,
//     name: 'file',
//     filePath: tempFilePaths[count].url,
//     header: {
//       "Content-Type": "multipart/form-data"
//     },
//     formData: {
//       token,
//     },
//     success: function (res) {
//       // to do ...
//       console.log(res)
//       urlArr.push(res)
//         ++count
//       if (tempFilePaths.length > 1) {
//         // 多文件上传
//         if (count === tempFilePaths.length) {
//           console.log('All uploaded successfully')
//           resolve(urlArr)
//         }
//       } else {
//         // 单文件上传
//         console.log('All uploaded successfully')
//         resolve(urlArr)
//       }
//     },
//     fail: function (res) {
//       ++count
//       console.log(res)
//       reject(res)
//     },
//     complete(res) {
//       // console.log(res)
//       if (count >= tempFilePaths.length) {
//         count = 0
//         urlArr = []
//       } else {
//         qiniuTools.uploadQiniu(tempFilePaths, token).then(res => {
//           resolve(res)
//           // 还原数据
//           count = 0
//           urlArr = []
//         })
//       }
//     }
//   })
// })(tempFilePaths, token)

export default qiniuTools