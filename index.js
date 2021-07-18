const express = require("express");
const cors = require("cors");
const getProducts = require("./routes/products");
const login = require("./routes/login");
const signup = require("./routes/signup");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("./passport-config");
initializePassport(passport);

const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//middlewares to indicate what pages can be accessed

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("login/");
  }
  next();
};

//ROUTES
//products
app.use("/products", checkAuthenticated, getProducts);

//user Login
app.use("/login", checkNotAuthenticated, login);

//user signup
app.use("/signup", checkNotAuthenticated, signup);

//user logout
app.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
  //this will log the user out.
});

//example pages to redirect to
app.get("/signup", checkNotAuthenticated, (res, req) => {
  res.send("this is sign up page");
});
app.get("/success", (req, res) => {
  res.send("loginSucess");
});
app.get("/registersuccess", (req, res) => {
  res.send("RegisterSucess");
});
app.get("/failure", (req, res) => {
  res.send("email already exists");
});

//Cart
//this will add items to cart and ajust properties IF the jwt is present
//Order process the order

// run server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
