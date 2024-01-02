require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();

const adminauthenticate = require("./middleware/adminauthenticate.js");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://ashwanimartf.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
  })
);

app.get("/", (req, res) => {
  return res.status(200).send({ message: "welcome to rest api" });
});

const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route.js");
app.use("/api/users", userRouters);

const productRouter = require("./routes/product.route.js");
app.use("/api/products", productRouter);

app.use("/api/admin", adminauthenticate);

// Your admin-only routes go here
app.get("/admin", (req, res) => {
  res.status(200).send({ message: "Admin Route" });
});


const adminProductRouter = require("./routes/adminProduct.route.js");
app.use("/api/admin/products", adminauthenticate, adminProductRouter);


const cartRouter = require("./routes/cart.route.js");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.route.js");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.route.js");
app.use("/api/orders", orderRouter);

const reviewRouter = require("./routes/review.route.js");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating.route.js");
app.use("/api/ratings", ratingRouter);

const adminOrderRouter = require("./routes/adminOrdered.route.js");
app.use("/api/admin/orders",adminauthenticate, adminOrderRouter);

const paymentRouter = require("./routes/payment.route.js");

app.use("/api/payments", paymentRouter);

module.exports = app;
