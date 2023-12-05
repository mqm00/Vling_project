//mongodb에 만들어놓은 모델 가져오기
const { ExchangeInfo } = require("../mongoDB/mongodb");
const { UserInputError } = require('apollo-server');

const resolvers = {
  Query: {
    //날짜를 기준으로 내림차순 정렬하여 가장 최신 값을 return한다.
    getExchangeRate: async(_, { src, tgt }) => {
        try{
          const exchangeRate = await ExchangeInfo
            .findOne({ src, tgt })
            .sort({ date: -1 })
            .exec();

          if(!exchangeRate){
            throw new Error("there is no data!!!");
          }

          return exchangeRate;
        } catch(error){
          console.error(error);
        }

    },
    //전체 DB 출력
    getAllExchangeRates: async () => {
      try{
        const allExchangeRates = await ExchangeInfo
          .find({})
          .sort({date: -1})
          .exec();

        if(!allExchangeRates){
          throw new Error("there is no data!!!");
        }

        return allExchangeRates;
      } catch(error){
        console.error(error);
      }
    },
  },

  Mutation: {
    //Create, 주어진 info 형식을 받아 db에 create
    postExchangeRate: async (_, { info } ) => {
      try{
        const { src, tgt, rate, date } = info;
        const existingRate = await ExchangeInfo.findOne({ src, tgt, date });

        // src와 tgt의 같은 날짜의 환율이 이미 DB에 존재하는 경우 에러 호출
        if (existingRate) {
            throw new Error("Exchange rate already exists!!!");
        }

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
    }
    },

    //Delete, 주어진 info 형식을 받아 delete
    deleteExchangeRate: async (_,{ info }) => {
      try{
        const {src, tgt, date} = info;
        const deletedExchangeRate = await ExchangeInfo.findOneAndDelete({ src, tgt, date });
        if(!deletedExchangeRate){
          throw new Error("there is no data!!!");
        }
        return deletedExchangeRate;
      } catch(error){
        console.error(error);
      }
    },
  },
};
  
module.exports = { resolvers };