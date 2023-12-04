const { ExchangeInfo } = require("./models/ExchangeInfo");

const resolvers = {

  Query: {
    getExchangeRate: async(_, { src, tgt }) => {
        const exchangeRate = await ExchangeInfo
        .findOne({ src, tgt })
        .sort({ date: -1 }) // 날짜를 기준으로 내림차순으로 정렬
        .exec();
      return exchangeRate;
    },
  },

  Mutation: {
    postExchangeRate: async (_, { info } ) => {
      const { src, tgt, rate, date } = info;
      const newExchangeRate = new ExchangeInfo(info);
      if( src === tgt ){
        newExchangeRate.rate = 1;
      }
      await newExchangeRate.save();
      return newExchangeRate;
    },

    deleteExchangeRate: async (_,{ info }) => {
      const {src, tgt, date} = info;
      const deletedExchangeRate = await ExchangeRateModel.findOneAndDelete({ src, tgt, date });
      return deletedExchangeRate;
    },
  },
};
  
module.exports = { resolvers };