let planModel = require("../model/planModel");
let reviewModel = require("../model/reviewModel");
function getTestPage(req, res){
    res.render("test.pug", {
        title: "test page"
    })
}
async function getHomePage(req, res){
    const user = req.user;
    const plans = await planModel.find().limit(3);
    const reviews = await reviewModel.find().limit(3);
    res.render("home.pug", {
        title: "Home page",
        plans: plans,
        reviews: reviews,
        key: "homepage",
        user,
    })
}
async function getPlanListing(req, res){
    const user = req.user;
    const plans = await planModel.find();
    res.render("plans.pug", {
        title: "Plans page",
        plans: plans,
        key: "plans Page",
        user
    })
}
async function getAllReviews(req, res){
    const user = req.user;
    const review = await reviewModel.find();
    res.render("reviewsAll.pug",{
        title:"Review Page",
        plans:plans,
        key: "review",
        review,
        user
    })
}
async function getLoginPage(req, res){
    const user = req.user;
    res.render("auth.pug",{
    title: "Login Page",
    user: user
})
}
async function getSignUp(req,res){
    res.render("auth.pug",{
        title: "Signup Page",
    })
}
async function getPassword(req, res){
    res.render("forgetPassword.pug",{
        title: "Forget Password ",
    })
}
async function resetPassword(req, res){
    const {token} = req;
    //console.log("in view controller the token is;;;;;");
    //console.log(token);
    res.render("resetPassword.pug",{
        title: "Reset Password",
        token
    }
    )
}
async function getSomethingWentWrong(req, res){
    res.render("somethingWentWrong",{
        title: "Something went Wrong",
        key:"abcdfdf"
    }
    )
}

async function getProfilePage(req, res){
    const user = req.user;
    //console.log(user);
    //console.log("in profile page");
    res.render("profilePage.pug",{
        title: "Profile Page",
        key: "profilePage",
        user: user
    })
}
async function getManagePlansPage(req, res){
    const user = req.user;
    const plans = await planModel.find();
    res.render("managePlans.pug", {
        title: "Manage Plans ",
        key: "manage plans",
        plans: plans,
        user
    })
}
module.exports.getTestPage = getTestPage;
module.exports.getHomePage = getHomePage;
module.exports.getPlanListing = getPlanListing;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignUp = getSignUp;
module.exports.getPassword = getPassword;
module.exports.resetPassword = resetPassword;
module.exports.getProfilePage = getProfilePage;
module.exports.getManagePlansPage = getManagePlansPage;
module.exports.getSomethingWentWrong = getSomethingWentWrong;
module.exports.getAllReviews = getAllReviews;