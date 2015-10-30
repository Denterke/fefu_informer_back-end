var db = require('./dbConnection');

var personalInfoUser = function(server) {

  var userInfo;

  server.route({
    method: 'GET',
    path:'/personalInfoUser/{userId}',
      handler: function (request, reply) {
        var userId = request.params.userId;
        db.connect( function(err) {
          if (err)
            return console.error('could not connect to postgres', err);

          db.query("SELECT * FROM users WHERE id = '"+userId+"'", function(err, result) {
            if (err) throw err;
            db.end();
            userInfo = result.rows[0];
            reply("Имя:" + userInfo.first_name + " Фамилия:" + userInfo.last_name + " Ссылка на img: " + userInfo.avatar_src);
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
