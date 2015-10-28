var fs = require('fs'); //file system
var db = require('./dbConnection');

var registerUser = function(server) {
  db.connect();
  server.route({
    method: 'POST',
    path:'/registerUsers',
    handler: function (request, reply) {
      var firstName = decodeURI(request.payload.firstName);
      var lastName  = decodeURI(request.payload.lastName);
      var avatar    = request.payload.fileUpload;

      if (avatar)
        fs.writeFile(
          'images/users_avatars/'+firstName+'avatar.jpg',
          avatar,
          function(err) {
            if (err) throw err;
          }
        );

      db.query("INSERT INTO users (first_name, last_name) VALUES ('" +firstName+ "','" +lastName+"')", function(err, result) {
        if(err) throw err;
        reply('new user added!');
      });

      db.end();
    }
  });

  server.register(require('inert'), function () {}); //for working with static file
  server.route({
    method: 'GET',
    path:'/registerUsers',
      handler: function (request, reply) {
        reply('ok');
        //reply.file('images/users_avatars/'+firstName+'avatar.jpg');
      }
  });

};

module.exports = registerUser;
