var express= require("express");
var bodyParser=require("body-parser");
var http=require("http");
var ejs=require("ejs");
var app= express();
var container=require("./container");
var mongoose=require("mongoose");
var _ =require("lodash");
const PORT=process.env.PORT || 5000;
require('dotenv').config();
container.resolve(function(users){
    mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true ,useUnifiedTopology: true},function(){
        console.log("DB has succesfully connected with Mongodb");
    });
    mongoose.set('useCreateIndex', true);
    var app=SetExpress();
    function SetExpress(){
        var app=express();
        var server=http.createServer(app);
        server.listen(PORT,function(){
            console.log("server is running on port 5000");
        })
        Configure(app);
        var router=require("express-promise-router")();
        users.SetRouting(router);
        app.use(router);
    }
    function Configure(app){
        app.use(express.static("public"));
        app.set("view engine","ejs");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.locals._=_;
    }
})