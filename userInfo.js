var pg = require('pg');
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";


var userInfo = function(server) {

  var userInfo;

  server.route({
    method: 'GET',
    path:'/userInfo/{phoneNumber}',
      handler: function (request, reply) {
        var phoneNumber = request.params.phoneNumber.substring(1);
          pg.connect(conString, function(err, client, done) {
          if (err) {
            reply('bad connection wuth database');
            return console.error('could not connect to postgres', err);
          }

          client.query(
            "SELECT first_name, last_name, avatar_src FROM users WHERE phone_number = '"+phoneNumber+"'",
            function(err, result) {
              done();

              if (err)
                return reply('bad connection wuth database');

              userInfo = result.rows[0];
              return reply(result.rows[0]);
          });
        });
      }
  });

};

module.exports = userInfo;
