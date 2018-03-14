$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

///update user
// Getting references to our form and input
  var updateForm = $("form.update");
  var usernameInput = $("input#userName");

   var imgInput = "/img/testAvatar.png";
   var inputColor=$("input#updateColor").val();
   console.log(inputColor);
   var updateColor="#"+inputColor;
   var updateArr=[];
   //var updateUser=usernameInput.val().trim();


  

   updateForm.on("submit", function(event) 
   {
    event.preventDefault();
    //grabbing current user to update their info
   console.log(useremail);
   //var to update
  //console.log(updateUser);
   console.log(imgInput);
   console.log(updateColor);

   var updateData = 
   {
      //userName: updateUser, 
      avatar_image:imgInput,
      message_color: updateColor,
      email: useremail,
      logged: true
    };

    updateUserInfo(updateData);

   //updateUserInfo(updateUser, imgInput, updateColor);
  });

function updateUserInfo(update)
{
  $.ajax({
      method: "PUT",
      url: "/api/update/",
      data: update
    }).then(getUpdate);
}

 // This function grabs todos from the database and updates the view
  function getUpdate() {
    $.get("/api/update/", function(data) {
      updateArr = data;

    });
  }
 //   {
 //   function updateUserInfo(update)
 //   {
 //    console.log("updating");
 //    //console.log("inside update user: "+ username + " "+ img+ " "+ color);
 //   //console.log(id);
 // $.get("/api/update/", update)
 //   // On success, run the following code
 //   .then(function (updateData) {
 //     // Log the data we found

 //     console.log("updated");
 //     location.reload();

 //   });
 //   }


});
