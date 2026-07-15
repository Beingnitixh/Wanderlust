const express = require('express');
const router = express.Router({mergeParams: true});
const User = require("../models/user");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const {saveRedirectUrl} = require("../middleware");
const userController = require("../controller/user");

router.get("/signup",(req,res)=>{
  res.render("../views/users/signup.ejs");
});

router.post("/signup",wrapAsync(userController.signup));


router.get("/login", (req,res)=>{
  let {id}=req.params;
  res.render("../views/users/login.ejs",{id});
});

router.post("/login",saveRedirectUrl,passport.authenticate('local',{
     failureRedirect:"/login",
     failureFlash: true
    }),
    userController.login);

router.get("/logout",isLoggedIn,userController.logout);

module.exports = router;