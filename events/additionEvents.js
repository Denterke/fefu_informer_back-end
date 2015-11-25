var fs           = require('fs'); //file system
var joi          = require('joi'); // module of validation
var dbTables     = require('../databaseModels/mappingModel'); // map of database tables
var randomString = require('random-string'); // generate a random string

var additionEvents = function (server) {
  server.route({
    method: 'POST',
    path:'/additionEvents',
    handler: function (request, reply) {
      var users         = dbTables.users; // select table users
      var events        = dbTables.events; // select table events

      var title         = decodeURI(request.payload.title);       // were problems with cirilic
      var description   = decodeURI(request.payload.description);
      var image         = request.payload.fileUpload;
      var eventsStatus  = request.payload.eventsStatus;
      var imgSrc        = 'images/eventsList/default_events.jpg';
      var phoneNumber   = request.payload.phoneNumber.substring(1);

      var response      = ''; // response from server to client

      //validating entered data
      var schema = {
        _title          : joi.string().min(5).max(50).required(),
        _description    : joi.string().min(10).max(160).required(),
        _eventsStatus   : joi.string().regex(/^(true|false)$/).required(),
        _phoneNumber    : joi.string().regex(/^\d+$/).length(10)
      };

      var value = {
        _title          : title,
        _description    : description,
        _eventsStatus   : eventsStatus,
        _phoneNumber    : phoneNumber
      };

      joi.validate(value, schema, function (err, value) {
        if (err) {
          console.log(err.details[0].message);
          return reply(require('../auxiliaries/validatorsHandler')(err.details[0].message)).code(400); // validation's errors hadler
        };

        if (image) {
          imgSrc   = 'images/eventsList/'+randomString(10)+'.jpg';
          image = new Buffer(image, 'base64');

          fs.writeFile(
            imgSrc,
            image,
            function(err) {
              if (err) throw err;
          });
        };

        //adding events, only if the user is certified!
        users.find({ phone_number: phoneNumber, confirmation: true }).only("first_name", "last_name").run(function (err, user) {
          if (user.length === 0) {
            response = JSON.stringify({ "status": 400, "message": "Пользователь не верефицирован, добавление невозможно!" });
            return reply(response).code(400);
          };

          // if user is certified
          events.create({
            title: title,
            description: description,
            img_src: imgSrc,
            is_official: eventsStatus,
            creator: user[0].first_name + " " + user[0].last_name },
            function (err) {
              response = JSON.stringify({ "status": 200, "message": "Новость успешно добавлена!" });
              return reply(response).code(200);
          });
        });
      });
    }
  });
};

module.exports = additionEvents;
