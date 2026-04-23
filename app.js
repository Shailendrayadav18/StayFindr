if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

console.log("App starting...");
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport= require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user.js");
const cors = require("cors");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials:true
}));

app.use(express.json());

const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("DB is connected");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}; 

const PORT = process.env.PORT || 8080;


if (!PORT) {
  throw new Error("PORT is not defined");
}

app.set("trust proxy", 1);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.returnTo = req.session.returnTo;
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);   
app.use("/", userRouter);
app.use("/reviews", reviewRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next)=>{
    let {statusCode=500, message="Some error occured"} = err;
    res.status(statusCode).json({
        error:true,
        message:message,
    });
});

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`server is listening on port ${PORT}`); 
});