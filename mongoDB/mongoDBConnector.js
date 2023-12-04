const mongoose = require('mongoose');

//database connection to mongoDB
const connectToMongo = async(Mongo_URI) => {
    await mongoose.connect(Mongo_URI).then(()=>{
        console.log(`DB Connected successfully`); //connection success
    }).catch(err => {
        console.log(`Can't connect to Mongo`); //connection false
    });
};

module.exports = { connectToMongo};