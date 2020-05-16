"use strict";
module.exports = function (Shopkeeper, User, bcrypt,async) {
    return {
        SetRouting: function (router) {
            router.get("/", this.homePage);
            router.get("/cart",this.CartPage);
            router.get("/shopkeeper/:ShopId",this.getShop);
            router.get("/User/:UserId",this.getUser);
            router.post("/signup_shopkeeper", this.Signup_Shopkeeper);
            router.post("/login_shopkeeper",this.Login_Shopkeeper);
            router.post("/signup_users", this.Signup_User);
            router.get("/User/:UserId/:ShopId",this.GetShopProduct);
            router.post("/User/:UserId/:ShopId/Order",this.OrderProduct);
            router.post("/shopkeeper/:ShopId/Addproduct",this.Addproduct);
        },
        homePage: function (req, res) {
            return res.render("home",{title:"I am at the Home page"});
        },
        CartPage:function(req,res){
            return res.render("cart");
        },
        getShop:function(req,res){
            Shopkeeper.find({_id:req.params.ShopId}).exec()
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                return res.status(500).json({
                    error:err
                })
            })
        },
        getUser:function(req,res){
            User.find({_id:req.params.UserId}).exec()
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                return res.status(500).json({
                    error:err
                })
            })
        },
        GetShopProduct:function(req,res){
            Shopkeeper.find({_id:req.params.ShopId}).exec()
            .then(data=>{
                res.status(200).json(data[0].Product);
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        },
        Signup_Shopkeeper: function (req, res) {
            Shopkeeper.find({ email: req.body.email }).exec()
                .then(user => {
                    if (user.length >= 1) {
                        return res.status(409).json({
                            message: "Mail Already Exist"
                        })
                    }
                    else {
                        bcrypt.hash(req.body.password, 10, function (err, hash) {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                })
                            }
                            else {
                                var newShk = new Shopkeeper();
                                newShk.shopname = req.body.shopname;
                                newShk.email = req.body.email;
                                newShk.password = hash;
                                newShk.save()
                                    .then(data => {
                                        return res.redirect("/shopkeeper/"+data._id);
                                    })
                                    .catch(err => {
                                        res.json({ message: err });
                                    });
                            }
                        });
                    }
                })
        },
        Login_Shopkeeper:function(req,res){
            Shopkeeper.find({email:req.body.email}).exec()
            .then(data=>{
                if(data.length<1){
                    return res.status(401).json({
                        message:"Auth Failed"
                    })
                }
                bcrypt.compare(req.body.password,data[0].password,function(err,results){
                    if(err){
                        return res.status(401).json({
                            message:"Auth Failed"
                        })
                    }
                    if(results){
                        return res.redirect("/shopkeeper/"+data[0]._id);
                    }
                    else{
                        return res.status(401).json({
                            message:"Auth Failed"
                        })
                    }
                })
            })
            .catch(err=>{
                console.log(err);
                return res.status(500).json({
                    error:err
                })
            })
        },
        Addproduct:function(req,res){
            Shopkeeper.updateOne({
                '_id':req.params.ShopId
            },{
                $push:{
                    Product:{
                        Product_Name:req.body.Product_Name,
                        Quantity:req.body.Quantity,
                        Price:req.body.Price
                    }
                }
            },function(err,count){
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                console.log(count);
                res.status(200).json(count);
            })
        },
        Signup_User: function (req, res) {
            User.find({ username: req.body.username }).exec()
                .then(user => {
                    if (user.length >= 1) {
                        return res.status(409).json({
                            message: "Username Already Exist"
                        })
                    }
                    else {
                        bcrypt.hash(req.body.password, 10, function (err, hash) {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                })
                            }
                            else {
                                var newuser = new User();
                                newuser.username = req.body.username;
                                newuser.password = hash;
                                newuser.save()
                                    .then(data => {
                                        return res.redirect("/User/"+data._id);
                                    })
                                    .catch(err => {
                                        res.json({ message: err });
                                    });
                            }
                        });
                    }
                })
        },
        OrderProduct:function(req,res){
            shopkeeper.find({
                '_id':req.params.ShopId,
                'Product.Quantity':{$gte:req.body.Quantity}
            }).exec()
            .then(data=>{
                async.parallel([
                    function(callback){
                        if(req.body.OrderProduct){
                            User.updateOne({
                                '_id':req.params.UserId
                            },{
                                $push:{
                                    orders:{
                                        shopkeeperId:req.params.ShopId,
                                        Product_Name:req.body.OrderProduct,
                                        Quantity:req.body.Quantity
                                    }
                                }
                            },function(err,results){
                                callback(err,results);
                            })
                        }
                    },
                    function(callback){
                        if(req.body.OrderProduct){
                            shopkeeper.updateOne({
                                '_id':req.params.ShopId
                            },{
                                $push:{
                                    request:{
                                        userId:req.params.UserId,
                                        orders:{
                                            Product_name:req.body.OrderProduct,
                                            quantity:req.body.Quantity
                                        }
                                    }
                                },
                                $inc:{totalRequest:1}
                            },function(err,results){
                                callback(err,results);
                            })
                        }
                    }
                ],function(err,results){
                    res.redirect()
                })
            })
        }
    }
}