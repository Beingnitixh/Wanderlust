const User = require("../models/user");

module.exports.signup = async(req,res,next)=>{
   try{
    let {username,email,password} = req.body;
    let newUser = new User({username,email});
    let registeredUser = await User.register(newUser,password);
    req.flash("success","User was Registered Succefully");
    req.login(registeredUser,(err)=>{
       if(err){
        return next(err);
       }
      res.redirect("/listings");
    });
   } catch(e){
    req.flash("error","User Already Exists");
    res.redirect("/signup");
   }
}

module.exports.login = async(req,res)=>{
    let {id} = req.params;
     req.flash("success","Log-In successfull!");
     if(res.locals.redirectUrl){
     res.redirect(res.locals.redirectUrl);
     }else{
      res.redirect("/listings");
     }
  }

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
    if(err){
      next(err);
    }
    req.flash("success","Logged out successfull");
    res.redirect("/listings");
    });
  }