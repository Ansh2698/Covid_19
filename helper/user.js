const { check, validationResult } = require('express-validator');
module.exports=function(){
    return {
        SignUpvalidation:function(req,res,next){
            check("shopname","Shopname is required").notEmpty();
            check("email","Email is required").notEmpty();
            check("password","Password is required").notEmpty();
            check("email","Invalid Email").isEmail();
            var errors = validationResult(req);
            if(errors){
                req.session.errors = errors;
                req.session.success = false;
                var error=errors.array();
                var message=[];
                error.forEach(erro=> {
                    message.push(erro.msg);
                });
                req.flash("error",message);
                res.redirect("/signup_shopkeeper");
            }
            else{
                req.session.success = true;
            }
        }
    }
}