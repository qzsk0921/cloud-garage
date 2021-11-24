// let brandObjs = []
// let count = -1
// getBrandList().then(res => {
//   console.log(res)
//   res.data.forEach((item, index) => {
//     item.data.forEach((it, ind) => {
//       count += 1
//       brandObjs[count] = it
//       brandObjs[count].initial = item.key
//     })
//   })
// })

//城市检索的首字母
var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// function searchLetter() {
//     return searchLetter;
// }

//对城市信息进行分组
// function brandList() {
//   let tempArr = [];
//   searchLetter.map(
//     initial => {
//       let tempObj = {};
//       let brandInfo = [];

//       tempObj.initial = initial;
//       tempObj.brandInfo = brandObjs.filter(
//         brand => brand.initial == initial
//       );

//       tempArr.push(tempObj);
//     }
//   );
//   return tempArr;
// }

module.exports = {
  searchLetter,
  // brandList,
  // brandObjs,
  // hotBrandList
}