const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const controllerListing = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(controllerListing.index))
    .post(isLoggedIn, validateListing, wrapAsync(controllerListing.createNew));

router
    .route("/userListings")
    .get(isLoggedIn, wrapAsync(controllerListing.userListings));

router
    .route("/:id")
    .get(wrapAsync(controllerListing.renderShow))
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(controllerListing.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(controllerListing.destroy));


router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(controllerListing.renderUpdate)
);

module.exports = router;