const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const planRouter = require("./router/planRouter");
const userRouter = require("./router/userRouter");
const viewRouter = require("./router/viewRouter");
const reviewRouter = require("./router/reviewRouter");
const bookingRouter = require("./router/bookingRouter");
const errorExtender = require("./utility/errorExtender");
// global object
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
//process.env.NODE_ENV = "production";
app.use(cookieParser());
app.use(express.static("public"))
app.use(express.json());
//templting engine
app.set("view engine","pug");
//templting address
app.set("views","views");
app.use("/api/reviews", reviewRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/plans", planRouter)
app.use("/api/users", userRouter)
app.use("/", viewRouter);
//404 not found
app.use("*", function (req, res, next) {
  err = new errorExtender("Page Not Found", 404);
  next(err); 
})
// wildcard
app.use("*", function (err,req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "unknown error";
  err.message = err.message;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});
const port = process.env.port|| 3005
app.listen(port, function () {
  console.log("Server is listening at port 3005");
});
// http routes
// plans
// json parse => req.body
// json=> http message body
// 1.
//userdefined middleware
// 2.
//3.
// app.param("planId", function (req, res, next, planId) {
//   if (planId <= 0 || planId > plans.length) {
//     return res.status(404).json({
//       status: "Invalid Id",
//     });
//   }
//   next();
// });






