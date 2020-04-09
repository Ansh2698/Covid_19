"use strict";
module.exports=function(){
    return{
        SetRouting:function(router){
            router.get("/",this.homePage);
        },
        homePage:function(req,res){
            return res.send("We are at home page");
        }
    }
}