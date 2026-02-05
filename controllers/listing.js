const Listing = require("../models/listing.js");

module.exports.index=async(req, res)=>{
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", {allListing});
}

module.exports.renderCreate=(req, res)=>{
    res.render("listing/create.ejs");
}

module.exports.renderUpdate=async(req, res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing does not exist.");
        return res.redirect("/listing");
    }
    res.render("listing/update.ejs", {listing});
}

module.exports.renderShow=async(req, res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews", 
        populate:{path:"author"}
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing does not exist.");
        return res.redirect("/listing");
    }
    res.render("listing/show.ejs", {listing});
}

module.exports.createNew=async(req, res)=>{  
    let newListing =new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listing");
}

module.exports.updateListing=async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated");
    res.redirect(`/listing/${id}`);
}

module.exports.destroy=async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listing");
}