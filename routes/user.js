const express= require("express");
const router = express.Router();
const passport = require("passport");
const controllerUser = require("../controllers/user.js");

router
    .route("/signup")
    .get(controllerUser.renderSignup)
    .post(controllerUser.registerUser);


router
    .route("/login")
    .get(controllerUser.renderLogin)
    .post(passport.authenticate("local", 
        {
            failureRedirect: "/login", 
            failureFlash: true
        }
    ),
    controllerUser.userLogin
    );

router.get("/logout", controllerUser.userLogout);

module.exports = router;