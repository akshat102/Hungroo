let d = document;
let resetPassword = d.querySelector(".reset-passwords");

async function resetPasswordHelper(password, confirmPassword, token) {
    try{
        if (password == confirmPassword) {
             const response = await axios.patch(`/api/users/resetPassword/${token}`, {
              password, confirmPassword
             })
            if (response.data.success == "user password updated login with new password") {
              //console.log("dopne the work");
              alert(`Your Password is updated`);
              location.assign("/login");
            } else {
              alert("Please try again");
            }
        } else {
            alert("Your Password and Confirm Password does not match");
        }
      
      //console.log("respnose"+response.data.status);
    }catch(err){
      console.log(err)
    }  
  }
  
  
  if(resetPassword){
      resetPassword.addEventListener("click", function(e){
        e.preventDefault();
        let password = d.getElementById("reset-password").value;
        let confirmpassword = d.getElementById("reset-confirmPassword").value;
        let token = d.querySelector("a").dataset.token;
   //console.log("token");
   //console.log(token);
        resetPasswordHelper(password, confirmpassword, token);
      })
    }
      