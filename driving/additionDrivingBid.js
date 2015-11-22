var joi          = require('joi'); // module of validation
var dbTables     = require('../databaseModels/mappingModel'); // map of database tables
var randomString = require('random-string'); // generate a random string

var additionDrivingBid = function (server) {
  server.route({
    method: 'POST',
    path:'/additionDrivingBid',
    handler: function (request, reply) {
      var users         = dbTables.users; // select table users
      var driving          = dbTables.driving; // select table news

      var destination = decodeURI(request.payload.destination);       // were problems with cirilic
      var departure   = decodeURI(request.payload.departure);
      var payment     = request.payload.payment;
      var note        = decodeURI(request.payload.note);
      var phoneNumber = request.payload.phoneNumber.substring(1);

      var response      = ''; // response from server to client

      //validating entered data
      var schema = {
        _destination  : joi.string().min(5).max(50).required(),
        _departure    : joi.string().min(5).max(50).required(),
        _payment      : joi.string().regex(/^\d+$/).max(50),
        _note         : joi.string().max(100),
        _phoneNumber  : joi.string().regex(/^\d+$/).length(10)
      };

      var value = {
        _destination  : destination,
        _departure    : departure,
        _payment      : payment,
        _note         : note,
        _phoneNumber  : phoneNumber
      };

      joi.validate(value, schema, function (err, value) {
        if (err)
          return reply(require('../auxiliaries/validatorsHandler')(err.details[0].message)).code(400); // validation's errors hadler

        //adding driving bid, only if the user is certified!
        users.find({ phone_number: phoneNumber, confirmation: true }).only("first_name", "last_name").run(function (err, user) {
          if (user.length === 0) {
            response = JSON.stringify({ "status": 400, "message": "Пользователь не верефицирован, добавление невозможно!" });
            return reply(response).code(400);
          };

          // if user is certified
          driving.create({
            destination : destination,
            departure   : departure,
            payment     : payment,
            note        : note,
            phone_number : phoneNumber,
            creator: user[0].first_name + " " + user[0].last_name },
            function (err) {
              response = JSON.stringify({ "status": 200, "message": "Заявка успешно добавлена!" });
              return reply(response).code(200);
          });
        });
      });
    }
  });
};

module.exports = additionDrivingBid;
