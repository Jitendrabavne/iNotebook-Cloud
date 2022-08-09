const mongoose=require('mongoose'); //mongoose module
// connection string
const mongoURI='mongodb://mernsmsystem:o15Da0w2N7L6fDyGVGNfE9NDhv5a1ODzEFqKLYGpdhpzBkMyN1npFUbWfLytqUP2Lg3QUPgn7QcY36Cc4mBo6g==@mernsmsystem.mongo.cosmos.azure.com:10255/mern-smsystem?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mernsmsystem@'

// this function  is used to connect to the mongodb compass
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('We Are Connected to Mongodb')
    })
} 
// to function export
module.exports= connectToMongo;

// let text;
// for (let i = 0; i < 5; i++) {
//     text += "The number is " + i + "<br>";
// }

