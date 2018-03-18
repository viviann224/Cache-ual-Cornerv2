$(document).ready(function() {
 // Getting references to our form and inputs for user login pw and email
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  //FunctionloginForm passes in the email and password and creates a local storage
  //for user email, updates the logged state to true, and passes the email and
  //password to validate user login.
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = 
    {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    //if email or password not submitted jump out of the function
    if (!userData.email || !userData.password) {
      return;
    }
    //call login function and put email in local storage
    login();
    //update the login state to true
     updateLogState(userData.email);
    //if valid email and password go ahead and pass to loginUser function
    loginUser(userData.email, userData.password);
    //clear out the values after logged in
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route to determine users that are current logged in
  function loginUser(email, password) {
    $.post("/api/login", 
    {
      email: email,
      password: password

    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }
  //once logged in use the email and update the log state to true
  function updateLogState(email) 
  {
    var loginData=
    {
      email:email,
      logged:true
    }
    //calling ajax call to update the login state of the user then get the updated data from api call
  $.ajax({
    method : "PUT",
    url : "/api/login",
    data: loginData
  }).then(getUpdate);
  console.log(getUpdate);
  }

  function updateLogState(email) 
  {
    console.log(email);
//update logged state to true
    var updatelog=
    {
      email:email
    }

  /// do the update for logged= true
  $.ajax({
    method : "PUT",
    url : "/api/login",
    data: updatelog
  }).then(getUpdate);
   console.log("finished to log in");
  }
  //function login() addeds current user's email to local storage
  function login() 
  {//clear what is currently in local storage
    localStorage.removeItem("Cache-ual-Corner");
    //get the user email, store in local storage
    var email = $("#email-input").val().trim();
    localStorage.setItem("Cache-ual-Corner", email);
    //clear the email value
    $('#email').val(''); 
  }
//function getUpdate updates the user's setting once the user updates their 
//personal information
function getUpdate() {
  $.get("/api/update/", function(res) {
    updateArr = res;
    console.log(updateArr);
  })
}

});