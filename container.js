var dependable=require("dependable");
var path=require("path");
var container=dependable.container();

var MyModule=[
    ["_","lodash"],
    ["Product","./model/product"],
    ["multer","multer"],
    ["fs","fs"],
    ["async","async"],
    ["axios","axios"]
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