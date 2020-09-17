const stripe = require("stripe")('sk_test_VOBkftGiER8vIbeIt3Q6W6iK00N3XXpv1b');
const planModel = require("../model/planModel");
const userModel = require("../model/userModel");
async function createSession(req, res){
try{
    let { userId } = req.id;
    let { planId } = req.body;
    console.log(userId);
const user = await userModel.findById(req.id);
const plan = await planModel.findById(planId);
//console.log(user);
//console.log(plan);
const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: user.email,
    client_reference_id: req.planId,
    line_items: [{
      name: plan.name,
      description: plan.description,
      //images: ['https://example.com/t-shirt.png'],
      amount: plan.price*100,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: 'http://localhost:3005/profilePage',// -`${req.protocol}://${req.get("host")}/profile`,
    cancel_url: 'http://localhost:3005/somethingWentWrong',  // -`${req.protocol}://${req.get("host")}/somethingWentWrong`,
  });
  console.log(res.status);
  res.status(200).json({
      status: "success",
      session
  })
}catch(err){
    res.status(200).json({
        err: err.message
    })
}
}
module.exports.createSession = createSession;