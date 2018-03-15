$(document).ready(function() 
{
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var usernameInput =$("input#username-input");
  //var usernameInput ="defaultName";
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    //forgot need to add true for logged : logged: true
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      userName: usernameInput.val(),
    };

    if (!userData.email || !userData.password ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.userName);
    emailInput.val("");
    passwordInput.val("");
    usernameInput.val("");

  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, userName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      userName:userName
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }




  
// Getting references to our form and input
  var updateForm = $("form.update");
   updateForm.on("submit", function(event) 
   {
    ///update user

  //need to get the correct defaultname
  var updatenameInput = $("#updateUserName").val();

   var imgInput = "/img/testAvatar.png";
   var inputColor=$("#updateColor").val();
   //console.log(inputColor);
   var updateColor=inputColor;
   var updateArr=[];
   var updateUser=updatenameInput;
       console.log($("#userName").val());
   //var updateUser="bob";
    event.preventDefault();
    //grabbing current user to update their info

   var updateData = 
   {
      userName: $("#userName").val(), 
      avatar_image:$("input:radio[name ='img']:checked").val(),
      message_color: $("#updateColor").val(),
      email: useremail,
      logged: true
    };

    updateUserInfo(updateData);
    console.log(updateData)
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
