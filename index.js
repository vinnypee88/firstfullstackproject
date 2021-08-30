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

//stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("Product", product);
  console.log("Price", product.price);

  // const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        description: product.name,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
          },
        },
      });
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

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

//failed route
app.use("/failed", (req, res) => res.send(false));

//user logout
app.use("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/products");
});

// run server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
