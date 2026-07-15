const mongoose = require('mongoose');
const initData = require("/Users/Nitish/Desktop/Coding.cpp/Sigma(7.0)/WEB DEV/MajorProj/init/data.js");
const Listing = require("/Users/Nitish/Desktop/Coding.cpp/Sigma(7.0)/WEB DEV/MajorProj/models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
 async function main(){
    await mongoose.connect(mongo_url);
 }

const initDB = async()=>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({
    ...obj,
    owner : "6a4ffbd181216b308703416b",
   }));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};

initDB();