const express= require("express");
const router = express.Router();
const controllerUser = require("../controllers/user.js");

router
.route("/")
.get((req, res) =>{
    res.send("App is live");
});
     

router
    .route("/signup")
    .get(controllerUser.renderSignup)
    .post(controllerUser.registerUser);


router
    .route("/login")
    .get(controllerUser.renderLogin)
    .post(controllerUser.userAuthentication);

router.get("/verifyUser", controllerUser.userVerification);

router.get("/logout", controllerUser.userLogout);

module.exports = router;