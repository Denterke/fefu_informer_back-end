var dbTables = require('../databaseModels/mappingModel'); //map of database tables
var joi = require('joi'); // module of validation

var validationUsers = function (server) {
  server.route({
    method: 'POST',
    path:'/validationUsers',
    handler: function (request, reply) {
      var users       = dbTables.users; // select table users

      var phoneNumber = request.payload.phoneNumber.substring(1);
      var phoneCode   = request.payload.phoneCode;

      var response    = ''; // response from server to client

      //validating entered data
      var schema = {
        _phoneNumber : joi.string().regex(/^\d+$/).length(10),
        _phoneCode   : joi.string().regex(/^\d+$/).length(4)
      };

      var value = {
        _phoneNumber : phoneNumber,
        _phoneCode   : phoneCode
      };

      joi.validate(value, schema, function (err, value) {
        if (err)
          return reply(require('../auxiliaries/validatorsHandler')(err.details[0].message)).code(400);

        // checking validation's code of user
        users.find({ phone_number: phoneNumber, phone_code: phoneCode }, function (err, raw) {
          if (raw[0] === undefined) {
            response = JSON.stringify({ "status": 400, "message": "Верификация не пройдена!" });
            return reply(response).code(400);
          }
          else {
            raw[0].save({ confirmation: true });
            response = JSON.stringify({ "status": 200, "message": "Верификация успешна!" });
            return reply(response).code(200);
          };
        });
      });
    }
  });
};

module.exports = validationUsers;
