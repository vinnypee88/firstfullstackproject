//imports
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
const check = require("./middlewares/checkAuthenticate");
const cart = require("./routes/cart");
const user = require("./routes/user");
const orders = require("./routes/orders");
const checkout = require("./routes/checkout");
const swaggerUI = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

//initialise express app
const app = express();
const PORT = 3000;

// //swagger code
const swaggerDocument = yaml.safeLoad(
  fs.readFileSync(path.resolve(__dirname, "./swagger.yml"), "utf8")
);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
//products
app.use("/products", getProducts);

//user Login
app.use("/login", check.checkNotAuthenticated, login);

//user signup
app.use("/signup", check.checkNotAuthenticated, signup);

//user cart
app.use("/cart", check.checkAuthenticated, cart);

//user cart
app.use("/user", check.checkAuthenticated, user);

//user orders
app.use("/orders", check.checkAuthenticated, orders);

//user checkout
app.use("/checkout", check.checkAuthenticated, checkout);

//user logout
app.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
  //this will log the user out.
});

//example pages to redirect to for testing purposes
app.get("/success", (req, res) => {
  res.send("loginSucess");
});
app.get("/registersuccess", (req, res) => {
  res.send("RegisterSucess");
});
app.get("/failure", (req, res) => {
  res.send("summin failed");
});
app.get("/ordercomplete", (req, res) => {
  res.send("ORDER PROCESSED");
});

// run server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
