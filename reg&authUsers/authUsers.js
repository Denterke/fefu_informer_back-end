var dbTables = require('../databaseModels/mappingModel'); //map of database tables
var joi = require('joi'); // module of validation

var authUsers = function (server) {
  server.route({
    method: 'POST',
    path:'/authUsers',
    handler: function (request, reply) {
      var users       = dbTables.users; // select table users

      var phoneNumber = request.payload.phoneNumber.substring(1);
      var password    = request.payload.password;

      var response    = ''; // response from server to client

      //validating entered data
      var schema = {
        _phoneNumber : joi.string().regex(/^\d+$/).length(10),
        _password    : joi.string().required()
      };

      var value = {
        _phoneNumber : phoneNumber,
        _password    : password
      };

      joi.validate(value, schema, function (err, value) {
        if (err)
          return reply(require('../auxiliaries/validatorsHandler')(err.details[0].message)).code(400); // validation's errors hadler

        // checking whether there is a user with such data
        users.count({ phone_number: phoneNumber, password: password, confirmation: true }, function (err, count) {
          if (count === 1) {
            response = JSON.stringify({ "status": 200, "message": "Авторизация успешна!" });
            return reply(response).code(200);
          }
          else {
            response = JSON.stringify({ "status": 400, "message": "Авторизация не пройдена!" });
            return reply(response).code(400);
          };
        });
      });
    }
  });
};

module.exports = authUsers;
