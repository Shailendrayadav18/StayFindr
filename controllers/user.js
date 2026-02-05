const User = require("../models/user.js");

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
            req.flash("success", "Welcome too WanderLust");
            res.redirect("/listing");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogin = (req, res)=>{
    res.render("user/login.ejs");
}

module.exports.userLogin=(req, res)=>{
    const redirectUrl = res.locals.returnTo || "/listing";
    delete req.session.returnTo;
    req.flash("success", "Welcome Back to WanderLust!");
    res.redirect(redirectUrl);
}

module.exports.userLogout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listing");
    });
}