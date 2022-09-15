const {
    verifytoken,
    verifytokenauth,
    verifytokenauthadmin,
  } = require("./verifytoken");
  const CryptoJs = require("crypto-js");
const Cart = require("../models/cart")
  const router = require("express").Router();
  
  // Create 
  
  router.post('/', async (req, res) => {
      const newCart = new Cart(req.body);
  
  
      try{
          const savedCart = await newCart.save();
          res.json(savedCart);
      }
      catch(err){
          res.status(500).json(err);
      }
  });
  
  router.put("/:id", async (req, res) => {
     
      try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.json(updatedCart);
      } 
      catch (err) {
        res.json(err);
      }
    });
  
    router.delete("/:id",async (req, res) => {
      try {
        await Cart.findById(req.params.id);
        res.json("Product has been deleted");
      } catch (err) {
        res.json(err);
      }
    });
  
    router.get("/find/:id", async (req, res) => {
      try {
        const IDcart = await Cart.findById(req.params.id);
        
        res.json(IDcart);
      } catch (err) {
          res.send(err)
      }
    });
  
    router.get("/allcart", async (req, res) => {
      try { 
        const allcart = await Cart.find();
        res.json( allcart );
      } catch (err) {
  
          res.send(err)
      }
    });
  
    
    
  
  
  module.exports = router;
  