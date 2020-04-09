var express= require("express");

var app= express();
app.get("/",(req,res)=>{
    res.send("We are at home page");
});
app.listen(3000);