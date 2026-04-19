const { request } = require("express");
const Listing = require("../models/listing.js");
const { geocodeAddress } = require("../public/js/geoCodeHelper.js");

module.exports.index = async (req, res) => {
    const { city } = req.query;
    let filter = {};
    if (city) {
        filter.place = { $regex: city, $options: "i" }; 
    }
    const allListing = await Listing.find(filter);
    res.send(allListing);
}

module.exports.renderCreate = (req, res) => {
    res.render("listing/create.ejs");
}

module.exports.renderUpdate = async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(500).json({
                success: false,
                message: "Listing not found!"
            });
        }
        let originalImage = listing.image.URL;
        let Image = originalImage.replace("/upload", "/upload/w_300");
        res.status(201).json({
            success: true,
            userListing: listing,
            newImage: Image
        });
    } catch (error) {
        console.log("ERROR:", err); 
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
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
    const { place, country, image } = req.body;

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

    newListing.owner = req.user._id;

    await newListing.save();
    res.status(201).json({
        success: true,
        message: "Listing created successfully"
    });
}

module.exports.updateListing = async (req, res) => {
    console.log("BODY:", req.body);
    let { id } = req.params;
    const { place, country } = req.body;
    const coords = await geocodeAddress(place, country);
    if (!coords) {
        throw new Error("Coordinates not found!");
    }

    let updatedData = {
        ...req.body,
        geometry: {
            type: "Point",
            coordinates: [coords.lng, coords.lat]
        }
    };

    if (req.body.image && req.body.image.url) {
        updatedData.image = {
            URL: req.body.image.url,
            fileName: req.body.image.filename
        };
    }

    await Listing.findByIdAndUpdate(id, updatedData);
    
    res.status(201).json({
        success: true,
        message: "Listing Updated Successfully!"
    });
}

module.exports.destroy = async (req, res) => {
    try {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Listing deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting listing",
        });
    }
}

module.exports.userListings = async (req, res) => {
    try {
        console.log("USER:", req.user);
        const listings = await Listing.find({ owner: req.user._id });
        res.status(201).json({
            success: true,
            userListings: listings
        });
    } catch (error) {
        console.log("ERROR:", err); 
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}