const express = require('express');
const router = express.Router({mergeParams: true});
const {listingSchema,reviewSchema} = require("../Schema");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview,checkRevAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js");

//To add a review
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.addReview));;

//to delete a review 
router.delete("/:reviewId",isLoggedIn,checkRevAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;