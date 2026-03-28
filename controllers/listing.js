const { request } = require("express");
const Listing = require("../models/listing.js");
const { geocodeAddress } = require("../public/js/geoCodeHelper.js");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.send(allListing);
}

module.exports.renderCreate = (req, res) => {
    res.render("listing/create.ejs");
}

module.exports.renderUpdate = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist.");
        return res.redirect("/listing");
    }
    let originalImage = listing.image.URL;
    let newImage = originalImage.replace("/upload", "/upload/w_300");
    res.render("listing/update.ejs", { listing, newImage });
}

module.exports.renderShow = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");
    if (!listing) {
        return res.send("Listing does not exist.");
    }
    res.send(listing);
}

module.exports.createNew = async (req, res) => {
    const { place, country, image} = req.body;

    const coords = await geocodeAddress(place, country);
    if (!coords) {
        throw new Error("Coordinates not found!");
    }

    let newListing = new Listing(req.body);

    newListing.image = { 
        URL: image.url, 
        fileName: image.filename 
    };

    newListing.geometry = {
        type: "Point",
        coordinates: [coords.lng, coords.lat]
    };

    newListing.owner=req.user._id;

    await newListing.save();
    res.status(201).json({
        success:true,
        message: "Listing created successfully"
    });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let newListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let URL = req.file.path;
        let fileName = req.file.fileName;
        newListing.image = { URL, fileName };
        await newListing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listing/${id}`);
}

module.exports.destroy = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listing");
}