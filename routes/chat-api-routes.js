var db = require("../models");

module.exports = function (app) {

  // Get all chats
  app.get("/api/all", function (req, res) {

    //select all messages, time and username from tables chat and login order by id 
    db.Chat.findAll({
      attributes: ['chat_messages', 'chat_time'],
      include: [{
        model: db.User,
        attributes: ['userName', 'message_color', 'avatar_image']
      }],
      order: [
        ['id', 'ASC']
      ],
      limit: 20

    }).then(function (results) {
      res.json(results);
    });
  });

  // Get userid, username for the email
  app.get("/api/user/:email", function (req, res) {
    //select  username, id  from login table for the given email id and logged true
    db.User.findOne({
      attributes: ['userName', 'id', 'message_color', 'avatar_image'],
      where: {
        email: req.params.email
        /*logged: true*/
      }
    }).then(function (user) {
      res.json(user);
    });

  });

  // Add a chat row
  app.post("/api/newChat", function (req, res) {
    // insert a new row in chat table 
    db.Chat.create({
      UserId: req.body.id,
      chat_messages: req.body.msg,
      chat_time: req.body.time
    });

  });

  // Get all logged users
  app.get("/api/users", function (req, res) {
    // select from Login table all logged users
    db.User.findAll({
      where: {
        logged: true
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  /*// Delete chats for 500 msgs
  app.post("/api/delete", function(req, res) {
    console.log("chat Data: " +req.body);
    
    Chat.destroy({
      where: {
        id: req.body.id
      }
    });
  });*/
  
};
