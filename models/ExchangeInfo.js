const mongoose = require("mongoose");

const ExchangeInfo = mongoose.model("ExchangeInfo", {
    src: String,
    tgt: String,
    rate: Number,
    date: String,
});

//db 조회
async function getAllExchangeInfo() {
    try {
      const data = await ExchangeInfo.find({});
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      // MongoDB 연결 종료
      mongoose.disconnect();
    }
  }
  
  // 함수 호출
getAllExchangeInfo();
  

module.exports = { ExchangeInfo }