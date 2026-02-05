const express= require("express");
const router= express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isReviewAuthor, validateReview}= require("../middleware.js");
const controllerReview = require("../controllers/review.js");

router.post("/", 
    isLoggedIn, 
    validateReview, 
    wrapAsync(controllerReview.createReview)
);

router.delete("/:reviewId", 
    isLoggedIn, 
    isReviewAuthor, 
    wrapAsync(controllerReview.deleteReview)
);

module.exports=router;