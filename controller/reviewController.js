const reviewModel = require("../model/reviewModel");
const factory = require("../utility/factory");
// const mongoose = require("mongoose");
// async function createReview(req, res) {
//     try {
//       const review = await reviewModel.create(req.body);
//       res.status(201).json({ review });
//     } catch (err) {
//       res.status(200).json({
//         err: err.message
//       })
//     }
//   }

// async function getAllReviews(req, res) {
//     try{
//       const review = await reviewModel.find();//.populate({path: "plan", select: "name ratingsAverage"}).populate({path: "user", select: "name"});
//     res.status(201).json({ review });
//   }catch(err){
//     res.status(200).json({
//       err: err.message
//     })
//   }
// }

// async function updateReview(req, res){
//   try{
//    const id = req.params.id;
//    const user = await userModel.findById(id);
//    if (user) {
//    if (Date.now() < user.expiresIn) {
//      const { password, confirmPassword } = req.body;
//      user.resetPasswordhelper(password, confirmPassword);
//      await user.save();
//      res.status(200).json({
//        success: "user password updated login with new password"
//      })
//    } else {
//      throw new Error("token has expired");
//    }
//   }else{
//     throw new Error("user not found");
//   }
// }catch (err) {
//  //console.log(err);
//  res.status(400).json({
//    err: err.messsage
//  })
// }
// }


module.exports.getReview = factory.getElement(reviewModel);
module.exports.getAllReviews = factory.getAllElement(reviewModel);
module.exports.updateReview = factory.updateElement(reviewModel);
module.exports.deleteReview = factory.deleteElement(reviewModel);
module.exports.createReview = factory.createElement(reviewModel);
  