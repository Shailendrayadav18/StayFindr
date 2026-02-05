const express= require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const controllerListing = require("../controllers/listing.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router
    .route("/")
    .get(wrapAsync(controllerListing.index))
   // .post(isLoggedIn, validateListing, wrapAsync(controllerListing.createNew));
   .post(upload.single("listing[image]"),(req, res)=>{
    res.send(req.file);
    res.send(req.body);
   });

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