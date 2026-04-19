const User = require("../models/user.js");
const passport = require("passport");

module.exports.renderSignup=(req, res)=>{
    res.render("user/signup.ejs");
}

module.exports.registerUser = async(req, res)=>{
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        let registeredUser=await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            res.json({
                success:true,
                message: "Signup successful!",
                user: registeredUser
            });
        });
    } catch (e) {
        res.json({
            error:true,
            message:e.message,
        })
    }
}

module.exports.renderLogin = (req, res)=>{
    res.render("user/login.ejs");
}

module.exports.userVerification=(req, res) => {

    if (!req.isAuthenticated()) {
        return res.json({
            authenticated: false
        });
    }

    res.json({
        authenticated: true,
        user: {
            id: req.user._id,
            username: req.user.username
        }
    });

}

module.exports.userAuthentication=(req, res, next) => {

  passport.authenticate("local", (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        error: true,
        message: info.message
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      req.session.save((err)=>{
        if (err) return next(err);

        res.json({
        success: true,
        message: "Login successful!",
        user: user
      });
      });
    });

  })(req, res, next);
}

module.exports.userLogout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.json({
            logout: true,
            message: "You are logged out!" 
        });
    });
}