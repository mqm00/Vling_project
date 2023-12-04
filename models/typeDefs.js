const gql = require("graphql-tag");

const typeDefs = gql`

  # Query안에 어떤 요청문이 들어오고 어떤 데이터가 반환될 것인가

  type Query {
    getExchangeRate(src:String!, tgt:String!): ExchangeInfo
  }
  
  type Mutation {
    postExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
    deleteExchangeRate(info: InputDeleteExchangeInfo): ExchangeInfo
  }

  input InputUpdateExchangeInfo {
    src: String!
    tgt: String!
    rate: Float!
    date: String
  }

  input InputDeleteExchangeInfo {
    src: String!
    tgt: String!
    date: String!
  }
  
  type ExchangeInfo @key(fields: "src, tgt") {
    src: String!
    tgt: String!
    rate: Float!
    date: String!
  }
`;

module.exports = { typeDefs };