const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_ID = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("DB is connected");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_ID);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    const dataWithOwner=initData.map((obj)=> ({...obj, owner: "698333582ef7760a27a596a8"}));
    await Listing.insertMany(dataWithOwner);
    console.log("Data is Initialised");
}

initDB();