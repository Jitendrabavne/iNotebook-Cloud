const mongoose=require('mongoose'); //mongoose module
// connection string
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

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

