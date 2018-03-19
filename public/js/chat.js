$(function () {

  //socket gets created 
  var socket = io();

  //on LogOut button click
  $('#logout').on("click", function () {
    event.preventDefault();
    socket.disconnect();

    var useremail = localStorage.getItem("Cache-ual-Corner");
    localStorage.removeItem("Cache-ual-Corner");    

    var signoutData =
    {
      email:useremail,
      logged:false
    }

    $.ajax({
      method : "PUT",
      url : "/logout",
      data : signoutData
    }).then(
      window.location.replace("/login")
    );
  });
  //on send message button click
  $('#chatInput').on("submit", function () {
    event.preventDefault();
    var chat_time = new Date();
    //get the message from input and email from local storage 
    //to link user with each message they send
    var chat_messages = $('#m').val().trim();
    var email = localStorage.getItem("Cache-ual-Corner");

   
    if (email) {
      // get the user data from the email
      $.get("/api/user/" + email, function (data) {
        var chat = {
          id: data.id,
          user: data.userName,
          msg: chat_messages,
          time: chat_time,
          color: data.message_color,
          avatar: data.avatar_image
        };

        // emit chat message using socket connection
        socket.emit('chat message', chat);
        //to store in db 
        $.post("/api/newChat", chat)
          // On success, run the following code
          .then(function (data) {
            // Log the data we found

          });
      });
    }
    $('#m').val('');
    return false;
  });

  if (socket) {
    //get the message from socket back to client
    socket.on('chat message', function (msg) {

      $('#chatMessages').append("<div class='chatMessage'><img src='" + msg.avatar +"' /><div><h3>" + msg.user + ": </h3><p style='color:" + msg.color + "'>" + msg.msg + "</p><h6>" + moment(msg.time).format('h:mm a') + "</h6></div></div>");
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

});

// Make a get request to our api route that will return every chat
$.get("/api/all", function (data) {
  for (var i = 0; i < data.length; i++) {
    $('#chatMessages').prepend("<div class='chatMessage'><img src='" + data[i].User.avatar_image +"' /><div><h3>" + data[i].User.userName + ": </h3><p style='color:" + data[i].User.message_color + "'>" + data[i].chat_messages + "</p><h6>" + moment(data[i].chat_time).format('h:mm a') + "</h6></div></div>");
  }
});

// Make a get request to our api route that will return all the logged users
$.get("/api/users", function (data) {

  for (var i = 0; i < data.length; i++) {
    $('#userList').append("<li>" + data[i].userName + "</li>");

  }
});

  $.get("/api/user/" + localStorage.getItem("Cache-ual-Corner"), function (data) {
    $("#userName").text(data.userName);
    $("#userAvatar").attr("src", data.avatar_image);
  });