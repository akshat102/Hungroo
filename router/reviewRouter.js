const express = require("express");
const reviewRouter = express.Router();
const {createReview, getReview, getAllReviews} = require("../controller/reviewController");

reviewRouter.route("").post(createReview).get(getAllReviews);
// update 
// delete 
reviewRouter.route("/:id")
.get(getReview);
module.exports = reviewRouter;