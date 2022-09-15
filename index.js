const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute  = require("./routes/user");
const authRoute  = require("./routes/auth");
const ProductRoute  = require("./routes/products");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const cors = require("cors");
const morgan = require('morgan');

app.use(morgan("common"))
dotenv.config()

mongoose.connect(process.env.Mongourl || 5000).then(()=>console.log("Connected to MongoDB")).catch((err)=>console.log(err));

app.listen(process.env.port,()=>{
    console.log(`backend server running`);
}); 
app.use(cors())
app.use(express.json())
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/product",ProductRoute)
app.use("/api/cart",CartRoute)
app.use("/api/order",OrderRoute)

app.get('/', function(req, res) {
    res.json("hello from mercyyyyyyyyyyyyyyyyyyyy")
})

