//mongodb에 만들어놓은 모델 가져오기
const { ExchangeInfo } = require("../mongoDB/mongodb");

const resolvers = {
  Query: {
    //날짜를 기준으로 내림차순 정렬하여 가장 최신 값을 return한다.
    getExchangeRate: async(_, { src, tgt }) => {
        try{
          const exchangeRate = await ExchangeInfo
            .findOne({ src, tgt })
            .sort({ date: -1 })
            .exec();
          return exchangeRate;
        } catch(error){
          console.error(error);
          throw new Error("Error get ExchangeRate.");
        }

    },
    //전체 DB 출력
    getAllExchangeRates: async () => {
      try{
        const allExchangeRates = await ExchangeInfo
          .find({})
          .sort({date: -1})
          .exec();
        return allExchangeRates;
      } catch(error){
        console.error(error);
        throw new Error("Error get AllExchangeRate.");
      }
    },
  },

  Mutation: {
    //Create, 주어진 info 형식을 받아 db에 create
    postExchangeRate: async (_, { info } ) => {
      try{
        const { src, tgt, rate, date } = info;
        const newExchangeRate = new ExchangeInfo(info);

        //source와 target이 같을 때의 예외처리
        if( src === tgt ){
          newExchangeRate.rate = 1;
        }
        //date가 Null값이라면 오늘 날짜를 넣어준다
        if (!newExchangeRate.date) {
          newExchangeRate.date = new Date().toISOString().split('T')[0];
        }

        await newExchangeRate.save();
        return newExchangeRate;
    } catch(error){
      console.error(error);
      throw new Error("Error Create Info");
    }
    },

    //Delete, 주어진 info 형식을 받아 delete
    deleteExchangeRate: async (_,{ info }) => {
      try{
        const {src, tgt, date} = info;
        const deletedExchangeRate = await ExchangeInfo.findOneAndDelete({ src, tgt, date });
        return deletedExchangeRate;
      } catch(error){
        console.error(error);
        throw new Error("Error Delete Info");
      }
    },
  },
};
  
module.exports = { resolvers };