var dbTables = require('../databaseModels/mappingModel'); // map of database tables

var allUsersInfo = function (server) {
  server.route({
    method: 'GET',
    path:'/allUsersInfo',
    handler: function (request, reply) {
      var users = dbTables.users; // select table users

      // searching info about all users, only verified users!
      users.find({ confirmation: true }).only("first_name", "last_name", "avatar_src").run(function (err, users) {
        if (users.length === 0) {
          response = JSON.stringify({ "status": 400, "message": "Пользователи не найдены!" });
          return reply(response).code(400);
        }
        else {
          response = users;
          return reply(response).code(200);
        };
      });
    }
  });
};

module.exports = allUsersInfo;
