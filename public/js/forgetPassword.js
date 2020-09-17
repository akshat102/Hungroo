let d = document;
let forgetPassword = d.querySelector(".forgetPassword");

async function passwordHelper(email) {
  //console.log(email);  
  try{

    const response = await axios.patch("http://localhost:3005/api/users/forgetPassword", {
      "email":email
    })
    //console.log("hello frnd...")
    const x = "Email send to "+email;
    //console.log(x);
    if (response.data.status == x) {
      //console.log(response.data);
      alert(`An email has been sent to ${email} to reset your password.`)
    //location.assign(`/resetPassword`);
    } else {
      alert("Please try again");
    }
  }catch(err){
    console.log(err)
  }
}


if(forgetPassword){
    forgetPassword.addEventListener("click", function(e){
      e.preventDefault();
      let email = d.getElementById("forget-email").value;
     // console.log(email);
      passwordHelper(email)
    })
  }
    