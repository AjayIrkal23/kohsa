const {
  verifytoken,
  verifytokenauth,
  verifytokenauthadmin,
} = require("./verifytoken");
const CryptoJs = require("crypto-js");
const Product = require("../models/products")
const router = require("express").Router();

// Create 

router.post('/new',async (req, res) => {
    const newProduct = new Product(req.body);


    try{
        const savedprod = await newProduct.save();
        res.json(savedprod);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
   
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedProduct);
    } 
    catch (err) {
      res.json(err);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await Product.findById(req.params.id);
      res.json("Product has been deleted");
    } catch (err) {
      res.json(err);
    }
  });

  router.get("/find/:id",  async (req, res) => {
    try {
      const IDProduct = await Product.findById(req.params.id);
      
      res.json(IDProduct);
    } catch (err) {
        res.send(err)
    }
  });
  
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router;
