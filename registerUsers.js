var fs = require('fs'); //file system
var Joi = require('joi');
var pg = require('pg'); //require postgres
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";
var randomString = require('random-string');

var registerUser = function(server) {
  server.route({
    method: 'POST',
    path:'/registerUsers',
    handler: function (request, reply) {

      var firstName   = decodeURI(request.payload.firstName);
      var lastName    = decodeURI(request.payload.lastName);
      var avatar      = request.payload.fileUpload;
      var phoneNumber = request.payload.phoneNumber;
      var phoneCode   = randomString({length: 4, numeric: false, letters: true}) + randomString({length: 2, numeric: true, letters: false});
      var avatarSrc   = 'images/users_avatars/default_avatar.png'; //сделать уникальное имя
      var response    = 'new user added!';

      var schema = {
        firstName: Joi.string().regex(/[\u0400-\u04FF]/).min(3).max(15).required(),
        lastName: Joi.string().regex(/[\u0400-\u04FF]/).min(5).max(20).required(),
        phoneNumber: Joi.string().regex(/^\d+$/).length(11)
      };
      var value = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
      };

      Joi.validate(value, schema, function (err, value) {
        if (err) {
          response = err.details[0].message;
          console.log(err.details[0].message);
        }
        else {
          if (avatar) {//дописать проверку расширения
            avatarSrc   = 'images/users_avatars/'+randomString()+lastName+'.jpg'; //сделать уникальное имя
            fs.writeFile(
              avatarSrc,
              avatar,
              function(err) {
                if (err) throw err;
              }
            );
          }

          pg.connect(conString, function(err, client, done) {
            if (err) {
              response = "bad connection with database";
              return console.error('could not connect to postgres', err);
            }

            client.query(
              "INSERT INTO users (first_name, last_name, phone_number, avatar_src, phone_code) VALUES ('" +firstName+ "','"+lastName+"','"+phoneNumber+"','http://31.131.24.188:8080/"+avatarSrc+"','"+phoneCode+"')",
              function(err, result) {
                done();
                if (err) {
                  response = 'new user not added!';
                  throw err;
                }

              console.log(firstName, lastName, phoneNumber, phoneCode);
            });
          });
        }
    });

    reply(response);
    }
  });

  server.route({
    method: 'GET',
    path:'/registerUsers/{phoneCode}&{userId}',
    handler: function (request, reply) {

      var userCode;
      var response;
      var userId = request.params.userId;

        pg.connect(conString, function(err, client, done) {
          if (err) {
            response = "bad connection with database";
            return console.error('could not connect to postgres', err);
          }

          client.query(
            "SELECT (phone_code) FROM users WHERE id = '"+userId+"'",
            function(err, result) {
              done();
              if (err) {
                response = "bad connection with database";
                throw err;
              }

              userCode = result.rows[0].phone_code;
              console.log("server code: " + userCode);

              if (request.params.phoneCode == userCode)
                response = "регистрация пройдена успешно!";
              else response = "неверный код подтверждения!";

              return reply(response);
          });
        });

      console.log(response);
      console.log("user code: " + request.params.phoneCode);
    }
  });
};

module.exports = registerUser;
