const userModel = require("../model/userModel");
const sharp = require("sharp");
const fs = require("fs");
const factory = require("../utility/factory");
// async function getMe(req, res) {
//   try {
//     const id = req.id;
//     // console.log(id);
//     const user = await userModel.findById(id);
//     res.status(200).json({
//       data: user,
//       status: "successfull"
//     })
//   }
//   catch (err) {
//     res.status(400).json({
//       err
//     })
//   }
// }

// async function createUser(req, res) {
//   // data
//   try {
//     const user = userModel.create(req.body);
//     res.status(201).json({
//       status: "successfull",
//       data: user
//     })
//   } catch (err) {
//     res.status(500).json({
//       err
//     })
//   }
// }
// async function getAllUsers(req, res) {
//   try {
//     const users = await userModel.find();
//     res.status(200).json({
//       data: users,
//       status: "successfull"
//     })
//   } catch (err) {
//     res.status(500).json({
//       err
//     })
//   }
// }

module.exports.updateProfileImage = async function updateProfileImage(req, res) {
  // update anything
  //  form data 
  try {
    // console.log(req.file);
    let serverPath = `public/img/users/user-${Date.now()}.jpeg`
    // process
    console.log("I was here");
    await sharp(req.file.path)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(serverPath);
    serverPath = serverPath.split("/").slice(1).join("/");

    let user = await userModel.findById(req.id);

    user.profileImage = serverPath;

    await user.save({ validateBeforeSave: false });
    // console.log("I was here");
    res.status(200).json({
      status: "image uploaded"
    })
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
}
module.exports.getUser = factory.getElement(userModel);
module.exports.getAllUsers = factory.getAllElement(userModel);
module.exports.updateUser = factory.updateElement(userModel);
module.exports.deleteUser = factory.deleteElement(userModel);
module.exports.createUser = factory.createElement(userModel);