var pg  = require('pg'); //require с postgres
var md5 = require('md5');
var joi = require('joi');
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";


var authUsers = function(server) {

  server.route({
    method: 'POST',
    path:'/authUsers',
    handler: function (request, reply) {

      var phoneNumber = request.payload.phoneNumber;
      var password    = request.payload.password;

      var schema = {
        phoneNumber: joi.string().regex(/^\d+$/).length(11),
        password: joi.string().alphanum().min(4).max(10)
      };
      var value = {
        phoneNumber: phoneNumber,
        password: password
      };

      joi.validate(value, schema, function (err, value) {
        if (err) {
          reply(err.details[0].message);
          return console.log(err.details[0].message);
        }
        else {
          pg.connect(conString, function(err, client, done) {
            if (err) {
              reply("bad connection with database");
              return console.error('could not connect to postgres', err);
            }

            client.query(
              "SELECT COUNT (*) FROM users WHERE phone_number = '"+phoneNumber+"' AND password = '"+md5(password)+"'",
              function(err, result) {
                done();
                if (err) {
                  throw err;
                  return reply('bad connection with database');
                }
              if (result.rows[0].count == 1)
                return reply('success');
              else
                return reply('failed');
            });
          });
        }
      });
    }
  });
};

module.exports = authUsers;
