const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware");


//search result
module.exports.searchRes = async(req,res)=>{
   let {q} = req.query;
   const allListings = await Listing.find({});
   res.render("../views/listings/searchRes.ejs",{allListings,q});
}

//index route
module.exports.index = async(req,res)=>{
  const allListings = await Listing.find({});
    res.render("../views/listings/index.ejs",{allListings,isLoggedIn});
};


//to render new listing form
module.exports.new = (req,res)=>{
    res.render("../views/listings/create.ejs");
}

//to display any perticular listing
module.exports.show = async(req,res)=>{
    let {id} = req.params;
   const listing = await Listing.findById(id).populate({
    path :"reviews",
     populate:{
      path: "author"},
    }).populate("owner");

   if(!listing){
     req.flash("error","Listing does not exists!");
     res.redirect("/listings");
   }else{
   console.log(listing.reviews);
   res.render("/Users/Nitish/Desktop/Coding.cpp/Sigma(7.0)/WEB DEV/MajorProj/views/listings/show.ejs",{listing});
   }
  }

//to add listing in database
module.exports.createListing = async(req,res,next)=>{
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {filename,url};
  await newListing.save();
  req.flash("success","New Listing Created!");
  res.redirect("/listings");
}

//to render the edit page for a perticular listing
module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);

     let originalURl = listing.image.url;
    originalURl = originalURl.replace("/upload","/upload/e_blur:100,r_10,c_crop,w_600,h_300");
    res.render("../views/listings/edit.ejs",{listing,originalURl});
   
  }

//to update listing in db
module.exports.update = async(req,res)=>{
  let {id} = req.params;
  let updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
  
  if(typeof req.file !=="undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  updatedListing.image = {filename,url};
  await updatedListing.save();
  }
  req.flash("success","Listing Updated!");
  res.redirect(`/listings/${id}`);
}

module.exports.delete = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id, {...req.body.listing});
    req.flash("success","Listing deleted!");
     res.redirect("/listings");
}