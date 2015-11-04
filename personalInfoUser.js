var pg = require('pg'); //require с postgres
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";


var personalInfoUser = function(server) {

  var userInfo;

  server.route({
    method: 'GET',
    path:'/personalInfoUser/{phoneNumber}',
      handler: function (request, reply) {
        var phoneNumber = request.params.phoneNumber.substring(1);
          pg.connect(conString, function(err, client, done) {
          if (err) {
            reply('could not connect to postgres');
            return console.error('could not connect to postgres', err);
          }

          client.query(
            "SELECT * FROM users WHERE phone_number = '"+phoneNumber+"'",
            function(err, result) {
              done();

              if (err) throw err;

              userInfo = result.rows[0];
              reply(result.rows[0]);
          });
        });
      }
  });

//for working with static file
  server.register(require('inert'), function () {
    server.route({
      method: 'GET',
      path:'/images/users_avatars/{imgName}',
      handler: function (request, reply) {
        console.log(request.params.imgName);
        reply.file('images/users_avatars/' + request.params.imgName);
      }
    });
  });

};

module.exports = personalInfoUser;
