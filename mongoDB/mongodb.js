//mongoDB connect를 위한 라이브러리
const mongoose = require("mongoose");

//mongoDB 스키마
const ExchangeInfo = mongoose.model("ExchangeInfo", {
    src: String,
    tgt: String,
    rate: Number,
    date: String,
});

// //db 조회
// async function getAllExchangeInfo() {
//       const data = await ExchangeInfo.find({}).sort({ date: 1 });
//       console.log(data);
//   }
  
//   // 함수 호출
// getAllExchangeInfo();
  
//module export
module.exports = { ExchangeInfo }