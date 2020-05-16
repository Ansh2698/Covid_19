var dependable=require("dependable");
var path=require("path");
var container=dependable.container();

var MyModule=[
    ["_","lodash"],
    ["Shopkeeper","./model/shopkeeper"],
    ["User","./model/user"],
    ["async","async"],
    ["bcrypt","bcrypt"],
    ["passport","passport"]
];
MyModule.forEach(function(val){
    container.register(val[0],function(){
        return require(val[1]);
    })
});
container.load(path.join(__dirname,"/controller"));
container.load(path.join(__dirname,"/helper"));
container.register("container",function(){
    return container;
});
module.exports=container;