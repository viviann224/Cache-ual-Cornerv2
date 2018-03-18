// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    console.log("username in api route: "+req.body.userName);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      avatar_image: "../img/avatar/avatar01.jpg",
      message_color: "#000000",
      logged: true
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) 
  {
    console.log("last logout");
    req.logout();
    // res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

//  app.get("/api/update", function (req, res) {
//   db.Login.update({
//       userName: req.body.userName,
//    avatar_image: req.body.avatar_image,
//    message_color: req.body.message_color
//   }, {
//     where: {
//       email: req.body.email
//     }
//   }).then(function (results) {

//     res.json(results);
//   });


// });

// GET route for getting all of the todos
  app.get("/api/update", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

app.put("/api/update/", function (req, res) {
  console.log("doing the in api routes update");
  db.User.update({
      //userName: req.body.userName,
   avatar_image: req.body.avatar_image,
   message_color: req.body.message_color,
   userName: req.body.userName,
   logged: true
  }, {
    where: {
      email: req.body.email
    }
  }).then(function (getUpdate) {
    console.log("Updated!!!");
    res.json(getUpdate);
  });


});


//update logged off on the database by setting state to false
app.get("/api/leave/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
    res.redirect("/logout");
  });


app.put("/logout", function (req, res) 
{
  console.log("logging out");
  db.User.update(
  { logged: false}, 
  {  
    where: {  email: req.body.email}
  }).then(function (getUpdate) {
    console.log("goodbye!!!");
    res.json(getUpdate);

  });


});

//end of logout area 

//update login state
app.put("/api/login", function (req, res) 
{
  db.User.update(
  { logged: true}, 
  {  
    where: { email: req.body.email}
  }).then(function (getUpdate) {
    res.json(getUpdate);

  });


});





};
