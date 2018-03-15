//on successful login/sign up
/*function login() {
  localStorage.clear();
  //get the user email, store in local storage
  var email = $("#email").val().trim();
  localStorage.setItem("Cache-ual-Corner", email);
  $('#email').val('');

  /// do the update for logged= true
}*/

$(function () {

  //socket gets created 
  var socket = io();
  var chat_time = new Date();
  /*
  //on Login button click
  $('#btnLogin').on("click", function () {
    event.preventDefault();
    login();

  });

  //on Signup button click
  $('#btnSignup').on("click", function () {
    event.preventDefault();
    login();

  });
*/
  //on LogOut button click
  $('#btnLogout').on("click", function () {
    event.preventDefault();
    localStorage.removeItem("Cache-ual-Corner");
    socket.disconnect();
    /// do the update for logged= false
  });

  //on send message button click
  $('#btnSend').on("click", function () {
    event.preventDefault();
    //get the message from input and email from local storage 
    //to link user with each message they send
    var chat_messages = $('#m').val().trim();
    var email = localStorage.getItem("Cache-ual-Corner");

    console.log("name " + email);
    if (email) {
      // get the user data from the email
      $.get("/api/user/" + email, function (data) {

        var chat = {
          id: data.id,
          user: data.userName,
          msg: chat_messages,
          time: chat_time
        };

        // emit chat message using socket connection
        socket.emit('chat message', chat);
        //to store in db 
        $.post("/api/newChat", chat)
          // On success, run the following code
          .then(function (data) {
            // Log the data we found
            console.log("chat row inserted");
          });
      });
    }
    $('#m').val('');
    return false;
  });

  if (socket) {
    //get the message from socket back to client
    socket.on('chat message', function (msg) {
      $('#currentMsg').append("<p>" + msg.user + "  " + msg.msg + "   " + moment(msg.time).format('h:mm a') + "</p>");
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

});

// Make a get request to our api route that will return every chat
$.get("/api/all", function (data) {

  for (var i = 0; i < data.length; i++) {
    $('#messages').append("<p>" + data[i].User.userName + "  " + data[i].chat_messages + "   " + moment(data[i].chat_time).format('h:mm a') + "</p>");

  }
});

// Make a get request to our api route that will return all the logged users
$.get("/api/users", function (data) {

  for (var i = 0; i < data.length; i++) {
    $('#userList').append("<li>" + data[i].userName + "</li>");

  }
});