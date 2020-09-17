const express = require("express");
const viewRouter = express.Router();
const {getTestPage, getPlanListing, getLoginPage, getSignUp, getHomePage, getPassword, getProfilePage, resetPassword, getManagePlansPage, getSomethingWentWrong, getAllReviews} = require("../controller/viewController");
const { isUserLoggedIn, protectRoute, handleResetRequest } =require("../controller/authController");
//token
viewRouter.use(isUserLoggedIn)
viewRouter.get("/test", getTestPage);
viewRouter.get("/", getHomePage);
viewRouter.get("/plans", getPlanListing);
viewRouter.get("/login", getLoginPage);
viewRouter.get("/profilePage", protectRoute, getProfilePage);
viewRouter.get("/signup", getSignUp);
viewRouter.get("/forgetPassword", getPassword);
viewRouter.get("/somethingWentWrong", getSomethingWentWrong);
viewRouter.get("/resetPassword/:token", handleResetRequest, resetPassword);
viewRouter.get("/reviews", getAllReviews);
//viewRouter.get("/resetPassword", resetPassword);

viewRouter.get("/managePlans", getManagePlansPage);
module.exports = viewRouter;