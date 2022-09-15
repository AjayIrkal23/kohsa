const mongoose  = require('mongoose');


const OrderSchema = new mongoose.Schema({
    userid:{type:String,required:true},
    products:[{
        title:{type:String},
        size:{type:String},
        quantity:{type:Number,default:1},
        price:{type:Number},
        img:{type:String}
    }],
    amount:{type:Number,required:true},
    useraddress:{type:Object,required:true},
    status:{type:String,default:"Pending"},
    DeliveryUrl:{type:String,default:"N/A"},
  
   

   
},{timestamps:true})

module.exports = mongoose.model('Order',OrderSchema);