var mongoose=require("mongoose");
var userschema=mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    orders:[{
        shopkeeperId:{type:mongoose.Schema.Types.ObjectId,ref:"Shopkeeper"},
        Product_Name:{type:String,default:""},
        Quantity:{type:Number,default:0}
    }]
})
module.exports=mongoose.model("User",userschema);