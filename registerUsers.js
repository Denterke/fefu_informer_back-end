var fs = require('fs'); //file system
var db = require('./dbConnection');

var registerUser = function(server) {
  server.route({
    method: 'POST',
    path:'/registerUsers',
    handler: function (request, reply) {

      var firstName   = decodeURI(request.payload.firstName);
      var lastName    = decodeURI(request.payload.lastName);
      var avatar      = request.payload.fileUpload;
      var phoneNumber = request.payload.phoneNumber;
      var avatarSrc   = 'images/users_avatars/'+lastName+'avatar.jpg'; //сделать уникальное имя
      var response    = 'new user added!';

      if (avatar)
        fs.writeFile(
          avatarSrc,
          avatar,
          function(err) {
            if (err) throw err;
          }
        );

      db.connect( function(err) {
        if (err)
          return console.error('could not connect to postgres', err);

        db.query(
          "INSERT INTO users (first_name, last_name, phone_number, avatar_src) VALUES ('" +firstName+ "','"+lastName+"','"+phoneNumber+"','"+avatarSrc+"')",
          function(err, result) {
            if (err) {
              response = 'new user not added!';
              throw err;
            }

          console.log(firstName, lastName, phoneNumber);
          db.end();
        });
      });

    reply(response);

    }
  });
};

module.exports = registerUser;
