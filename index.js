//middleware imports
const express = require("express");
const cors = require("cors");
const check = require("./middlewares/checkAuthenticate");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
//ROUTES
//products
app.use("/products", getProducts);

//user Login
app.use("/login", login);

//user signup
app.use("/signup", signup);

//user cart
app.use("/cart", cart);

//user cart
app.use("/user", user);

//user orders
app.use("/orders", orders);

//user checkout
app.use("/checkout", checkout);

//failed route
app.use("/failed", (req, res) => res.send(false));

//user logout
app.use("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/products");
});

// run server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
