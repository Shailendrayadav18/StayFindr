const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found",
            });
        }

        const { rating, comment } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }

        const newReview = new Review({
            rating,
            comment,
            author: req.user._id,
            listing: listing._id,
        });
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        const populatedReview = await Review.findById(newReview._id)
            .populate("author");

        res.status(201).json({
            success: true,
            review: populatedReview,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

module.exports.userReviews = async (req, res) => {
    const reviews = await Review.find({ author: req.user._id })
        .populate("listing", "title");

    res.json({ reviews });
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.json({ success: true });
}