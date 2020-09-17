const mongoose = require("mongoose");
const config = require("../configs/config");
mongoose.connect(config.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(function (conn) {
  console.log("Review Db connected");
}).catch(function (err) {
  console.log(err);
})


const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "janplanmodel",
    required: [true, "Review must belong to a plan"]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "janUserModel"
  }
})


// findById,findOne,findByIDandupdate 
 reviewSchema.pre(/^find/, function (next) {
  console.log("I was triggred");
  this.populate({
    path: "plan",
    select: "name ratingsAverage"
  }).populate({
    path: "user", 
    select: "name email"});
  next();
})

reviewSchema.methods.updateReviewhelper = function (review, rating) {
  this.review = review;
  this.rating = rating;
  this.createdAt = Date.now();
}
const reviewModel = mongoose.model("reviewplanModel", reviewSchema);
module.exports = reviewModel;