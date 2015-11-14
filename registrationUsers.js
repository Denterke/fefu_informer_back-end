var fs  = require('fs'); //file system
var joi = require('joi');
var pg  = require('pg'); //require postgres
var md5 = require('md5'); //require postgres
var conString    = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";
var randomString = require('random-string');
var getRequest = require('request');

var registrationUser = function(server) {
  server.route({
    method: 'POST',
    path:'/registrationUsers',
    handler: function (request, reply) {

      var firstName   = decodeURI(request.payload.firstName); //were problems with cirilic
      var lastName    = decodeURI(request.payload.lastName);
      var avatar      = request.payload.fileUpload;
      var phoneNumber = request.payload.phoneNumber.substring(1); //preservation in the database a phone number without '8'
      var password    = request.payload.password;
      var phoneCode   = randomString({length: 4, numeric: true, letters: false});
      var avatarSrc   = 'images/users_avatars/default_avatar.png';

      //validating entered data
      var schema = {
        firstName: joi.string().regex(/[\u0400-\u04FF]/).min(3).max(15).required(),
        lastName: joi.string().regex(/[\u0400-\u04FF]/).min(5).max(20).required(),
        phoneNumber: joi.string().regex(/^\d+$/).length(10),
        password: joi.string().alphanum().min(4).max(10).required()
      };
      var value = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: password
      };

      joi.validate(value, schema, function (err, value) {
        if (err) {
          console.log(err.details[0].message);
          return reply(err.details[0].message);
        }
      });

      //TODO: check mime-type
      if (avatar) {
        avatarSrc   = 'images/users_avatars/'+randomString()+lastName+'.jpg';
        fs.writeFile(
          avatarSrc,
          avatar,
          function(err) {
            if (err) throw err;
          }
        );
      }

      //working with database and sending sms
      pg.connect(conString, function(err, client, done) {
        if (err) {
          reply('bad connection with database');
          return console.error('could not connect to postgres', err);
        }

        client.query(
          "INSERT INTO users (first_name, last_name, phone_number, avatar_src, phone_code, password) VALUES ('" +firstName+ "','"+lastName+"','"+phoneNumber+"','http://31.131.24.188:8080/"+avatarSrc+"','"+phoneCode+"','"+md5(password)+"')",
          function(err, result) {
            done();
            if (err) {
              console.log(err);
              return reply('this number has been added!');
            }

          getRequest('http://gate.prostor-sms.ru/send/?phone=%2B7'+phoneNumber+'&text='+phoneCode+'&login=t89242331814&password=456570', function (error, response, body) {
            if (!error && response.statusCode == 200)
              console.log(body) // Show the HTML for the Google homepage.
            else console.log(response);
          });

          console.log(firstName, lastName, phoneNumber, phoneCode, md5(password));
          return reply('success');
        });
      });
    }
  });
};

module.exports = registrationUser;
