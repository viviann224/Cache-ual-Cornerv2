$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
//update LOGGED TRUE LATER ONCE USER CLICKS SIGN IN
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    login();
    //update the login state to true
     updateLogState(userData.email);
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    //clear out the values after logged in
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password

    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }
  //function update logged state to true
  function updateLogState(email) 
  {
    var loginData=
    {
      email:email,
      logged:true
    }
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

  function login() {
  localStorage.clear();
  //get the user email, store in local storage
  var email = $("#email-input").val().trim();
  localStorage.setItem("Cache-ual-Corner", email);
  $('#email').val('');

  

}

function getUpdate() {
  $.get("/api/update/", function(res) {
    updateArr = res;
    console.log(updateArr);
  })
}


//on Login button click
  // $('#btnLogin').on("click", function () {
  //   event.preventDefault();
  //   login();

  // });

  // //on Signup button click
  // $('#btnSignup').on("click", function () {
  //   event.preventDefault();
  //   login();

  // });

});


  // function login() {
  //   localStorage.clear();

  //   var email=$("#email-input").val().trim();
  //   localStorage.setItem("Cache-ual-Corner", email);
  //   $("#email").val("");
  // }