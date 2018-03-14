/*
module.exports = function(sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {

    socket_id: DataTypes.TEXT,
    chat_messages: DataTypes.TEXT,
    chat_time:{ type:DataTypes.DATE, defaultValue:DataTypes.NOW}
  }, {
    timestamps: false
  });

/*
  Chat.associate = function(models) {
    Chat.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
*/
//  return Chat;
//};

//newest update to chat
//Table Chat to store all chat data
module.exports = function (sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {

    chat_messages: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    chat_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  });


  //defining association of chat with login table
  Chat.associate = function (models) {
    Chat.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Chat;
};