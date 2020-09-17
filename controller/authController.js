// signup
//  user create
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/config");
const Email = require("../utility/email");

async function signup(req, res) {
  //console.log(req.body+" from signup method in authcontroller");
  try {
    const user = await userModel.create(req.body);
    res.status(201).json({
      status: "user signed up",
      user
    })
  } catch (err) {
    res.status(400).json({ err: err.messsage })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    // console.log(user);
    if (user) {
      if (password == user.password) {
        // jwt
        const { _id } = user;
        const token = jwt.sign({ id: _id }, JWT_SECRET, {
          expiresIn: Date.now() + 1000 * 60 * 30
        })
        res.cookie("jwt", token, {httpOnly: true});
        res.status(200).json({
          status: "successfull",
          user,
          token
        })
      } else {
        throw new Error("user or password didn't match")
      }
    } else {
      throw new Error("user or password didn't match ");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.messsage
    })
  }
}
// authenticate => user
async function protectRoute(req, res, next) {
  // console.log("in protect")
   try {
    // headers 
    let token
    if (req.headers && req.headers.authorization) {
       token = req.headers.authorization.split(" ").pop();
      // console.log(token)
    }else if(req.cookies && req.cookies.jwt){
      token = req.cookies.jwt;
    } else {
      throw new Error("Please provide a token");
    }
      if (token) {
        const decryptedData = jwt.verify(token, JWT_SECRET);
        if (decryptedData) {
          const id = decryptedData.id;
          // console.log(decryptedData)
          req.id = id;
          // console.log(id);
          next();
        } else {
          throw new Error("Invalid Token");
        }
      } else {
        throw new Error("Please login again to access this route ");
      }
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: "unsuccessfull",
      err: err.messsage
    })
  }
}

async function isUserLoggedIn(req, res, next){
  try{
    let token
    if(req.heders && req.headers.authorization){
      token = req.headers.authorization.split(" ").pop();
    }else if(req.cookies && req.cookies.jwt){
      token = req.cookies.jwt;
    }else{
      //console.log(token)
      return next();
    }
    //console.log(token);
    if(token){
      const decryptedData = jwt.verify(token, JWT_SECRET);
      if(decryptedData){
        const id = decryptedData.id;
        req.id = id;
        req.user = await userModel.findById(id);
       // console.log(req.user);
        return next();
      }else{
        return next();
      }
    }else{
      return next();
    }
  } catch(err){
   // console.log("I was in catch user");
    res.status(400).json({
      status: "unsuccessful",
      err: err.messsage
    })
  }
}

// authorization
async function isAdmin(req, res, next) {
  try {
    const user = await userModel.findById(req.id);
    if (user) {
      if (user.role == "admin") {
        next()
      } else {
        throw new Error("User not authorized");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ err: err.messsage });
  }
}

function isAuthorized(roles) {
  return (async function (req, res, next) {
   //const { id } = req.id;
    try {
      // console.log(id)
      //console.log(req.id)
      const user = await userModel.findById(req.id);
      const { role } = user;
      if (roles.includes(role) == true) {
        next()
      } else {
        throw new Error("You are not authorized ");
      }
    } catch (err) {
      res.status(403).json(
        { err: err.messsage }
      )
    }
  })
}

async function logout(req, res){
res.cookie("jwt", "bgfdgcgf", {
  expires: new Date(Date.now()+100)
});
res.json({
  status: "logged Out"
})
}

async function forgetPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      // console.log(user);
      const token = user.createToken();
      // db => save
      // db => intgrity ,consistency
      await user.save({ validateBeforeSave: false });
      const resetPasswordLink = `http://localhost:3005/resetPassword/${token}`
      const emailOptions = {};
      emailOptions.html = `<h1> Please click on the link given below to reset your password</h1>
      <p> ${resetPasswordLink}</p>`;
      emailOptions.to = email;
      emailOptions.from = "customersupport@hungroo.com";
      emailOptions.subject = "Reset Password Link";
      await Email(emailOptions);
      res.status(200).json({
        resetPasswordLink,
        status: `Email send to ${email}`,
        token
      })
      //return next();
    } else {
      throw new Error("You does not exist");
    }
  } catch (err) {
    //console.log(err);
    res.status(400).json({
      err: err.messsage
    })
  }
}

async function handleResetRequest(req, res, next){
try{
  const { token } = req.params;
let user = await userModel.findOne({resetToken: token});
if(user){
  req.token = token;
  //res.redirect("/resetPassword");
  next();
}else{
  res.redirect("/somethingWentWrong");
}
}catch(err){
res.redirect("/somethingWentWrong");
}
}

async function resetPassword(req, res){
   try{
    const token = req.params.token;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
    if (Date.now() < user.expiresIn) {
      const { password, confirmPassword } = req.body;
      user.resetPasswordhelper(password, confirmPassword);
      await user.save();
      res.status(200).json({
        success: "user password updated login with new password"
      })
    } else {
      throw new Error("token has expired");
    }
   }else{
     throw new Error("user not found");
   }
 }catch (err) {
  //console.log(err);
  res.status(400).json({
    err: err.messsage
  })
}
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.isAdmin = isAdmin;
module.exports.isAuthorized = isAuthorized;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPassword = resetPassword;
module.exports.isUserLoggedIn = isUserLoggedIn;
module.exports.logout = logout;
module.exports.handleResetRequest = handleResetRequest;