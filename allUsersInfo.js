var pg = require('pg');
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";


var allUsersInfo = function(server) {

  server.route({
    method: 'GET',
    path:'/allUsersInfo',
      handler: function (request, reply) {
          pg.connect(conString, function(err, client, done) {
          if (err) {
            reply('could not connect to postgres');
            return console.error('could not connect to postgres', err);
          }

          client.query(
            "SELECT first_name, last_name, avatar_src FROM users WHERE confirmation='true'",
            function(err, result) {
              if (err)
                return reply('bad connection with database');

              done();

              return reply(result.rows);
          });
        });
      }
  });
};

module.exports = allUsersInfo;
