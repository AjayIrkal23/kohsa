const router  = require('express').Router();
const User = require("../models/user")
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken')


//register Code

router.post('/register', async function(req, res) {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password,process.env.Pass_Key ).toString(),
 });

 try
 {const savedUser = await newUser.save();
   res.status(200).json(savedUser);
   console.log(savedUser)
}

    catch(err)
    {
        
       res.status(500).json(err);
    
    }
});
 

//Login Code

router.post('/login', async function(req, res){
    try {  
        
        const user =  await User.findOne({username: req.body.username,});
        
        !user && res.status(401).json("wrong credentials");

        const hashpass  = CryptoJs.AES.decrypt(user.password,process.env.Pass_Key);

        const OrignalPassword = hashpass.toString(CryptoJs.enc.Utf8);
        OrignalPassword !== req.body.password &&  res.status(401).json("wrong credentials");

        const accesstoken = jwt.sign({
            id:user._id ,
            isAdmin:user.isAdmin,
        },process.env.jwt_sec,
        {expiresIn:"3d"})

        const {password, ...others} = user._doc;
        
        res.status(200).json({...others,accesstoken});


    }

    catch (err) {
//  res.status(500).json(err);
    }
  

});


module.exports = router

