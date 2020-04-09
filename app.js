var express= require("express");
var bodyParser=require("body-parser");
var http=require("http");
var app= express();
var container=require("./container");
var session=require("express-session");
container.resolve(function(users){
    var app=SetExpress();
    function SetExpress(){
        var app=express();
        var server=http.createServer(app);
        server.listen(3000,function(){
            console.log("server is running on port 3000");
        })
        Configure(app);
        var router=require("express-promise-router")();
        users.SetRouting(router);
        app.use(router);
    }
    function Configure(app){
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
})