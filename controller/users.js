"use strict";

const { body } = require("express-validator");

module.exports = function (axios,local,fs,async) {
    return {
        SetRouting: function (router) {
            router.get("/", this.homePage);
            router.get("/cart",this.CartPage);
            router.get("/submit",this.GetSubmitpage);
            router.post("/submit",local.Upload.single("productImage"),this.SubmitProduct);
        },
        homePage: function (req, res) {
            return res.render("home",{title:"I am at the Home page"});
        },
        CartPage:function(req,res){
            return res.render("cart");
        },
        GetSubmitpage:function(req,res){
            return res.render("submit_product");
        },
        SubmitProduct:function(req,res){
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var image="data:image/"+req.file.mimetype+";base64,"+encode_image;
            const External_API="http://localhost/api/product/create.php";
            let bodystring={
                "name" : req.body.Name,
                "price" : req.body.Price,
                "description" : req.body.Description,
                "category_id" : req.body.Category_id,
                "image":image
            }
            axios.post(External_API,bodystring)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
            res.redirect("/submit");
        }
        // SubmitPage:function(req,res){
        //     return res.render("submit_product");
        // },
        // SubmitProduct:function(req,res){
        //     var img = fs.readFileSync(req.file.path);
        //     console.log(req.body.Name);
        //     console.log(img);
        //     res.redirect("/submit");
        //     // var encode_image = img.toString('base64');
        //     // var image="data:image/"+req.file.mimetype+";base64,"+encode_image;
        //     // const External_API="http://localhost/api/product/create.php";
        //     // let bodystring={
        //     //     "name" : req.body.Name,
        //     //     "price" : req.body.Price,
        //     //     "description" : req.body.Description,
        //     //     "category_id" : req.body.Category_id,
        //     //     "image":image
        //     // }
        //     // axios.post(External_API,bodystring)
        //     // .then(function(response){
        //     //     console.log(response);
        //     // })
        //     // .catch(function(error){
        //     //     console.log(error);
        //     // })
        // }
    }
}