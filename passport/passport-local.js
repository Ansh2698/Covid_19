var passport=require("passport");
var User=require("../model/shopkeeper");
var LocalStrategy=require("passport-local").Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});
passport.use("local.signup",new LocalStrategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback:true
  },
  function(req,email, password, done) {
    User.findOne({ "email": email }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false,req.flash("error","Email already exist"));
        }
          var newUser=new User();
          newUser.shopname=req.body.shopname;
          newUser.email=req.body.email;
          newUser.password=req.body.password;   
          newUser.save(err,function(){
              done(null,newUser);
          });
    });
  }
));