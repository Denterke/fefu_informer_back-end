var dbTables = require('../databaseModels/mappingModel'); // map of database tables

var userInfo = function (server) {
  server.route({
    method: 'GET',
    path:'/userInfo/{phoneNumber}',
    handler: function (request, reply) {
      var users       = dbTables.users; // select table users

      var phoneNumber = request.params.phoneNumber.substring(1); // becouse preservation in the database a phone number without '8'

      var response    = ''; // response from server to client

      // searching info about user, only verified users!
      users.find({ phone_number: phoneNumber, confirmation: true }).only("first_name", "last_name", "avatar_src").run(function (err, user) {
        if (user[0] === undefined) {
          response = JSON.stringify({ "status": 400, "message": "Пользователь не найден!" });
          return reply(response).code(400);
        }
        else {
          response = user[0];
          return reply(response).code(200);
        };
      });
    }
  });
};

module.exports = userInfo;
