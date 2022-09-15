const {
    verifytoken,
    verifytokenauth,
    verifytokenauthadmin,
  } = require("./verifytoken");
  const CryptoJs = require("crypto-js");
const Order = require("../models/order")
  const router = require("express").Router();
  
  // Create 
  
  router.post('/',async (req, res) => {
      const newOrder = new Order(req.body);
  
  
      try{
          const savedorder = await newOrder.save();
          res.json(savedorder);
      }
      catch(err){
          res.status(500).json(err);
      }
  });
  
  router.put("/:id", async (req, res) => {
     
      try {
        const updatedorder = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.json(updatedorder);
      } 
      catch (err) {
        res.json(err);
      }
    });
  
    router.delete("/:id",async (req, res) => {
      try {
        await Order.findById(req.params.id);
        res.json("order has been deleted");
      } catch (err) {
        res.json(err);
      }
    });
  
    router.get("/find/:id",  async (req, res) => {
      try {
        const orders = await Order.find({userid:req.params.id});
        
        res.json(orders);
      } catch (err) {
          res.send(err)
      }
    });
  
    router.get("/allorder", async (req, res) => {
      try { 
        const allorder = await Order.find();
        res.json( allorder );
      } catch (err) {
  
          res.send(err)
      }
    });
  
    
    
  
  
  module.exports = router;
  