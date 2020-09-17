const express = require("express")
const userRouter = express.Router();
const { getAllUsers, createUser, updateProfileImage } = require("../controller/userController");
const { getUser } = require("../controller/userController");
const { signup, login, protectRoute, isAuthorized, forgetPassword, resetPassword, logout } = require("../controller/authController");
const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "public/img/users");
  }
})
const fileFilter = function (req, file, cb){
  if(file.mimetype.startsWith("image")){
    cb(null, true)
  }else{
    cb(new Error("Not an image! Please upload one"), false)
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter
});
userRouter.patch("/updateProfile", protectRoute, upload.single("user"), updateProfileImage)
// signup
userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.get("/profilePage", protectRoute, getUser);
userRouter.patch("/forgetPassword", forgetPassword)
userRouter.patch("/resetPassword/:token", resetPassword);
userRouter.get("/logout", logout);
// login 
// forgetPassword
//resetPassword
// userRouter
//   .route("/:userId")
//   .patch(updateUser)
//   .delete(removeUser)
//   .get(getUser);
// admin
userRouter.use(protectRoute, isAuthorized(["admin"]));
userRouter.route("").
  get(getAllUsers)
  .post(createUser);
module.exports = userRouter;