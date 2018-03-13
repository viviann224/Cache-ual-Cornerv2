// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/chat-api-routes.js")(app);
//require("./routes/login-api-routes.js")(app);
//require("./routes/html-routes.js")(app);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ }).then(function() {
  server=app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    var io = require('socket.io').listen(server);

  io.on('connection', function(socket){
  //console.log('user connected ' +socket.id);
    socket.on('chat message', function(msg){    
    io.emit('chat message', msg);

  });
    
 socket.on('disconnect', function(){
   // console.log(socket.id + '   user disconnected');
  });

});
  });
});
