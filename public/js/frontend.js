let d = document;
const stripe = Stripe('pk_test_maUF1VrKsfa7KtHw0Sv3Fp1d00CM7r0nRR');
let loginBtn = d.querySelector(".login-button");
let signupForm = d.querySelector(".signup-button");
let logoutBtn = d.querySelector(".logout");
let addPlan = d.querySelector(".add-plan");
let payment = d.querySelector(".payment");

async function loginHelper(email, password) {
  const response = await axios.post("/api/users/login", {
    email, password
  })
  if (response.data.status == "successfull") {
    alert("Login Successfull")
    location.assign("/profilePage");
  } else {
    alert("Try again");
  }
}

async function signupHelper(name, email, age, password, confirmPassword, gender) {
    const response = await axios.post("http://localhost:3005/api/users/signup", {
    name, email, age, password, confirmPassword, gender
  })
  if (response.data.status == "user signed up") {
    alert("Signup Successfull")
    location.assign("/login");
  } else {
    alert("Try again");
  }
}

async function logoutHelper(){
  let response = await axios.get("/api/users/logout");
  if(response.data.status == "logged Out"){
    location.assign("/");
  }else{
    alert("some error occured");
  }
}

if (signupForm) {
  signupForm.addEventListener("click", function (e) {
    e.preventDefault();
    let name = d.getElementById("signup-name").value;
    let email = d.getElementById("signup-email").value;
    let age = d.getElementById("signup-age").value;
    let password = d.getElementById("signup-password").value;
    let confirmPassword = d.getElementById("signup-confirmPassword").value;
    if(d.getElementById("signup-male").checked)
     var gender = d.getElementById("signup-male").value; 
    else if(d.getElementById("signup-female").checked)
     var gender = d.getElementById("signup-female").value; 
    else
     var gender = d.getElementById("signup-other").value; 
    
    // console.log(gender);
    signupHelper(name, email, age, password, confirmPassword, gender)
  })
}

if(loginBtn){
  loginBtn.addEventListener("click", function (e){
    e.preventDefault();
    let email = d.getElementById("login-email").value;
    let password = d.getElementById("login-password").value;
    loginHelper(email, password) 
  })
}

if(logoutBtn){
  logoutBtn.addEventListener("click", function (e){
    e.preventDefault();
    logoutHelper();
  })
}

// --------------Plans----------------
async function addPlanHelper(name, price, discount, description, ratingsAverage){
  let response = await axios.post("/api/plans", {
    name, price, discount, description, ratingsAverage
  })
  if(response.data.status == "New Plan Created"){
    alert("Plan Added Successfully")
    location.reload();
  } else {
    alert("Try again");
  }
}

if(addPlan){
  addPlan.addEventListener("click", function (e){
    e.preventDefault();
    let name = d.getElementById("plan-name").value;
    let price = d.getElementById("plan-price").value;
    let discount = d.getElementById("plan-discount").value;
    let description = d.getElementById("plan-description").value;
    let ratingsAverage = d.getElementById("plan-star").value;
    addPlanHelper(name, price, discount, description, ratingsAverage)
  })
}

// -----------Payment--------------
async function paymentHelper(planId){
  let response = await axios.post("/api/bookings/createSession",{
    planId
  })
  console.log(response.data.description);
  if(response.data.status){
    alert("Payment done Successfully")
    const { session } = response.data;
    const id = session.id;
    stripe.redirectToCheckout({
       sessionId: id
    }).then(function (result) {
      alert(result.error.message);
    });
  } else {
    alert("Payment failed");
  }
}

if(payment){
  payment.addEventListener("click", function (e){
e.preventDefault();
const planId = payment.getAttribute("plan-id");
paymentHelper(planId)
})
}

