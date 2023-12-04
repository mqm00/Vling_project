const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const mongoose = require('mongoose');
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");

const Mongo_URI = "mongodb://localhost:27017/info"

//database connection
mongoose.connect(Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`Db Connected`);
}).catch(err => {
    console.log(err.message);
});

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    // Other server configurations, if needed
  });
  
  // Start the server
  server.listen({ port: 5110 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });

