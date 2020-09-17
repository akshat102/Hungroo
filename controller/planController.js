const planModel = require("../model/planModel");
const factory = require("../utility/factory");
const QueryHelper = require("../utility/utility");
async function getAllPlans(req, res) {
  try {
    // let myQuery = { ...req.query };
    // let toExcludeFields = ["sort", "select","limit", "page"];
    // for(let i=0;i<toExcludeFields.length;i++){
    //   delete myQuery[toExcludeFields[i]];
    // }
    // let plansPromise = planModel.find(myQuery);
    // if(req.query.sort){
    //   plansPromise = plansPromise.sort(req.query.sort);
    // }
    // if(req.query.select){
    //   let selectString = req.query.select.split("%").join(" ");
    //   plansPromise = plansPromise.select(selectString);
    // }
    // let pageNo = Number(req.query.page) || 1;
    // let limit = Number(req.query.limit) || 4;
    // const toSkip = limit*(pageNo-1);
    // plansPromise.skip(toSkip).limit(limit);
    // const plans = await plansPromise;
   let willGetllPlansPromise = new QueryHelper(planModel.find(), req.query);
   let filteredPlans = willGetllPlansPromise.filter().sort().select().paginate();
  let plns = await filteredPlans.query;
    res.status(200).json({
      status: "successfull",
      plans
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }

}

// async function createPlan(req, res) {
//   //console.log("inside createplan");
//   // data
//   try {
//     //console.log(req.body);
//     //console.log("thi aapki req body")
//     const plan = await planModel.create(req.body);
//     //console.log(plan);
//     res.status(201).json({ status: "New Plan Created", plan });
//   }
//   catch (err) {
//     res.status(400).json({ err:err.message });
//   }
// }
// async function getPlan(req, res) {
//   try {
//     const { planId } = req.params;
//     const plan = await planModel.findById(planId);
//     res.status(200).json({
//       status: `result for ${planId}`,
//       plan,
//     });
//   } catch (err) {
//     res.json({
//       err
//     })
//   }
// }

// async function updatePlan(req, res) {
//   try {
//     const planId = req.params.planId;
//     const tobeUpdatedData = req.body;
//     const oldPlan = await planModel.findById(planId);
//     const keys = Object.keys(tobeUpdatedData);
//     for (key in keys) {
//       oldPlan[key] = tobeUpdatedData[key];
//     }
//     await oldPlan.save();
//     res.status(200).json({
//       status: "PlanUpdated"
//     });
//   } catch (err) {

//   }


// }

// async function removePlan(req, res) {
//   try {
//     const { planId } = req.params;
//     const deletedPlan = await planModel.findByIdAndDelete(planId);
//     res.json({
//       data: deletedPlan,
//       status: "successfull"
//     })
//   } catch (err) {
//     res.status(400).json({ err })
//   }

// }

module.exports.getAllPlans = factory.getAllElement(planModel);
module.exports.getPlan = factory.getElement(planModel);
module.exports.createPlan = factory.createElement(planModel);
module.exports.updatePlan = factory.updateElement(planModel);
module.exports.removePlan = factory.deleteElement(planModel);









