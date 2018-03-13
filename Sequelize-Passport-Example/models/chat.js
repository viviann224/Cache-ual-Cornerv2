
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
  return Chat;
};

