const mongoose = require("mongoose");
const Review= require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    description: String,
    image:{
        type: String,
        default: "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-flat-screen-tv-nmKPgfIUYtM",
        set: (v)=>
            v===""
            ? "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-flat-screen-tv-nmKPgfIUYtM" 
            : v, 
    },
    price: Number,
    place: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;