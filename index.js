//middleware imports
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("./passport-config");
initializePassport(passport);
const check = require("./middlewares/checkAuthenticate");

//routes imports
const cart = require("./routes/cart");
const user = require("./routes/user");
const orders = require("./routes/orders");
const checkout = require("./routes/checkout");
const getProducts = require("./routes/products");
const login = require("./routes/login");
const signup = require("./routes/signup");

//swagger imports
const swaggerUI = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

//initialise express app
const app = express();
const PORT = 4000;

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
    saveUninitialized: true,
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

app.use("/failed", (req, res) => res.send(false));

//user logout
app.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

// run server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
