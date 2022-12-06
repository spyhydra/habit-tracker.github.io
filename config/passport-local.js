const passport=require('passport');

const User= require('../models/user');


const LocalStrategy= require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email',
},
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        if (user.password!=password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


  passport.serializeUser(function (user,done) {
    done(null,user.id);
  })
  

  passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){

        if(err){
            console.log('error in finding user ',err);
            return done(err);
        }
              return done(null,user);
    })

  });
       //check if user is Authenticated or not 
  passport.checkAuthentication=function(req,res,next){
      
    //if user is Authenticated then next
    if(req.isAuthenticated()){
      return next();
    }
        return res.redirect('/users/login');
  }


  passport.useAuthenticatedUser=function(req,res,next){

    if(req.isAuthenticated()){
//res.local store a information about login user cookie 

      res.locals.user=req.user;
    }
    next();

  }





  module.exports=passport;
