const {
  verifytoken,
  verifytokenauth,
  verifytokenauthadmin,
} = require("./verifytoken");
const CryptoJs = require("crypto-js");
const User = require("../models/user");
const router = require("express").Router();

router.put("/:id", verifytokenauth, async (req, res) => {
  if (req.body.passowrd) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.Pass_Key
    ).toString();
  }
  try {
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifytokenauth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json("User has been deleted");
  } catch (err) {
    res.json(err);
  }
});

router.get("/find/:id", verifytokenauthadmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.json({ ...others });
  } catch (err) {}
});

router.get("/allusers", verifytokenauthadmin, async (req, res) => {
  try {
    const user = await User.find();
    res.json({ ...user });
  } catch (err) {}
});

router.get("/stats",verifytokenauthadmin, async (req, res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group:{
            _id:"$month",
            total:{$sum:1}
        }
      }
    ]);
    res.json(data)
  } catch {}
});

module.exports = router;
