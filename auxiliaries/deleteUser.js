var dbTables = require('../databaseModels/mappingModel'); //map of database tables

var deleteUser = function (server) {
  server.route({
      method: 'GET',
      path:'/deleteUser/{phoneNumber}',
      handler: function (request, reply) {
        var users       = dbTables.users; // select table users
        var phoneNumber = request.params.phoneNumber.substring(1); // becouse preservation in the database a phone number without '8'
        console.log("Илья удалил пользователя: " + phoneNumber);

        users.find({ phone_number: phoneNumber }, function (err, user) {
          user[0].remove();
        });
        reply("removed!");
      }
  });
};

module.exports = deleteUser;
