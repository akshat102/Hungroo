const express = require("express")
const planRouter = express.Router();
const { getAllPlans, getPlan, removePlan, createPlan, updatePlan } = require("../controller/planController")
const { protectRoute, isAuthorized } = require("../controller/authController")
planRouter
  .route("")
  .get(getAllPlans)
  .post(createPlan);
  // .post(protectRoute, isAuthorized(["admin", "resturant owner"]), createPlan);
planRouter
  .route("/:planId")
  .get(getPlan)
  .patch(updatePlan)
  // admin
  .delete(protectRoute, isAuthorized(["admin"]),
    removePlan);

module.exports = planRouter;


// "ratingsAverage": 8,
// 	"name": "High Carb",
// 	"discount": 30,
// 	"description": "a high carb diet to gain muscle for all",
// 	"price": 70