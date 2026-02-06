const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const controllerListing = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(controllerListing.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(controllerListing.createNew));

router.get("/new", 
    isLoggedIn, 
    controllerListing.renderCreate
);

router
    .route("/:id")
    .get(wrapAsync(controllerListing.renderShow))
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(controllerListing.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(controllerListing.destroy));


router.get("/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync(controllerListing.renderUpdate)
);

module.exports= router;