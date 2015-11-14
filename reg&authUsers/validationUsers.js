var pg  = require('pg'); //require с postgres
var joi = require('joi');
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";


var validationUsers = function(server) {

  server.route({
    method: 'POST',
    path:'/validationUsers',
    handler: function (request, reply) {

      var phoneNumber = request.payload.phoneNumber.substring(1);
      var phoneCode   = request.payload.phoneCode;

      var schema = {
        phoneNumber: joi.string().regex(/^\d+$/).length(10),
        phoneCode: joi.string().alphanum().length(4)
      };
      var value = {
        phoneNumber: phoneNumber,
        phoneCode: phoneCode
      };

      joi.validate(value, schema, function (err, value) {
        if (err) {
          reply(err.details[0].message);
          return console.log(err.details[0].message);
        }
      });

      pg.connect(conString, function(err, client, done) {
        if (err) {
          reply("bad connection with database");
          return console.error('could not connect to postgres', err);
        }

        client.query(
          "UPDATE users SET confirmation = 't' WHERE phone_number = '"+phoneNumber+"' AND phone_code = '"+phoneCode+"'",
          function(err, result) {
            done();
            if (err) {
              throw err;
              return reply(err);
            }
            if (result.rowCount == 1)
              return reply('success');
            else
              return reply('failed');
        });
      });
    }
  });
};

module.exports = validationUsers;
