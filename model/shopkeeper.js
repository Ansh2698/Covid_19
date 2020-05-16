var mongoose=require("mongoose");
var ShopkeeperSchema=mongoose.Schema({
    shopname:{type:String,unique:true,required:true},
    email:{type:String,
        unique:true,
        required:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{type:String,required:true},
    Product:[{
        Product_Name:{type:String,default:""},
        Quantity:{type:Number,default:0},
        Price:{type:Number,default:0}
    }],
    request:[{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        orders:[{
            Product_name:{type:String,default:""},
            quantity:{type:Number,default:0}
        }],
    }],
    totalRequest:{type:Number,default:0}
});
module.exports=mongoose.model("Shopkeeper",ShopkeeperSchema);