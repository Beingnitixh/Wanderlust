const Listing = require("./models/listing");
const {listingSchema,reviewSchema} = require("./Schema");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
     req.session.redirectUrl = req.originalUrl;
     req.flash("error","User is not logged-in!");
     return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
     if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl ;
     }
     next();
};

module.exports.checkListOwner = async(req,res,next)=>{
      let {id} = req.params;
      let listing = await Listing.findById(id);
    if(res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)){
         req.flash("error","Authorization denied");
         return res.redirect(`/listings/${id}`);
      }
      next();
}

//Validation error handeling for listing schema
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
      next();
    }
};

//Validation error handeling for review schema
module.exports.validateReview = (req,res,next)=>{
    let{error} = reviewSchema.validate(req.body);
    console.log(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
       throw new ExpressError(400,errmsg);
    }else{
        next();
    }
};

module.exports.checkRevAuthor = async(req,res,next)=>{
      let {id,reviewId} = req.params;
      let review = await Review.findById(reviewId);
    if(res.locals.currUser && !review.author.equals(res.locals.currUser._id)){
         req.flash("error","Authorization denied");
         return res.redirect(`/listings/${id}`);
      }
      next();
}