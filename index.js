const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/federation');
const { connectToMongo } = require('./mongoDB/mongoDBConnector.js');

const { resolvers } = require("./resolvers/resolvers.js");
const { typeDefs } = require("./schema/typeDefs.js");

const Mongo_URI = "mongodb://localhost:27017/info"

connectToMongo(Mongo_URI);

//typeDefs와 resolver을 ApolloServer 생성자에 넘겨줌으로써 서버를 만든다.
const server = new ApolloServer({
    //graphql 스키마 생성
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });
  
// 5110 포트로 server start
server.listen({ port: 5110 })
    .then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
    .catch(error => {
        console.error('Error starting the server:', error.message);
        process.exit(1); // 서버 시작에 실패하면 프로세스를 종료한다.
    });


