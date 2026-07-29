const express = require('express');
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../Schema");
const router = express.Router();
const flash = require("connect-flash");
const {isLoggedIn,checkListOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage})

//route for trending properties search
router.get("/category/:tag",wrapAsync(listingController.filterByTag));

//search result listing on the basis of location and country
router.get("/search",wrapAsync(listingController.searchRes));

//index route
router.get("/",wrapAsync(listingController.index));

//create/add listing
router.get("/new",isLoggedIn,(listingController.new));


//show/display route
router.get("/:id",wrapAsync(listingController.show));

//to add listing in database through hopschoch
 router.post("/",isLoggedIn,
    
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing));


//Edit listing
router.get("/:id/edit",isLoggedIn, wrapAsync(listingController.edit));
//Update route
router.put("/:id",isLoggedIn,checkListOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.update));

//Delete listing
router.post("/:id/delete",isLoggedIn,checkListOwner,wrapAsync(listingController.delete));



module.exports = router;