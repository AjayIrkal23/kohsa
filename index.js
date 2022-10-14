const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const ProductRoute = require("./routes/products");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const cors = require("cors");
const morgan = require('morgan');
const razorpay = require("razorpay");

app.use(morgan("common"))
dotenv.config()

var instance = new razorpay({
    key_id: 'rzp_test_L36esytYvjRbfR',
    key_secret: 'aweI2D4OrVRdr2MjDvP9DbOV',
});



mongoose.connect(process.env.Mongourl).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

app.listen(process.env.PORT || 3000, () => {
    console.log(`backend server running`);
});
app.use(cors())
app.use(express.json())
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/product", ProductRoute)
app.use("/api/cart", CartRoute)
app.use("/api/order", OrderRoute)

app.post("/payment", (req, res) => {

    let cart = req.body.products
    let amount = req.body.total * 100
    let currency = "INR"


    instance.orders.create({ amount, currency }, (error, order) => {
        if (error) {
            return res.status(500).json(error)

        }
        console.log(order)
        return res.status(200).json(order)

    })


})

app.get('/', function (req, res) {
    res.json("hello from mercyyyyyyyyyyyyyyyyyyyy")
})

