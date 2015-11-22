var fs           = require('fs'); // file system
var joi          = require('joi'); // module of validation
var randomString = require('random-string'); // generate a random string
var getRequest   = require('request'); // sent request
var dbTables     = require('../databaseModels/mappingModel'); // map of database tables

var registrationUser = function (server) {
  server.route({
    method: 'POST',
    path:'/registrationUsers',
    handler: function (request, reply) {
      var users       = dbTables.users; // select table users

      var firstName   = decodeURI(request.payload.firstName); // were problems with cirilic
      var lastName    = decodeURI(request.payload.lastName);
      var avatar      = request.payload.fileUpload;
      var phoneNumber = request.payload.phoneNumber.substring(1); // preservation in the database a phone number without '8'
      var password    = request.payload.password;
      var phoneCode   = randomString({length: 4, numeric: true, letters: false});
      var avatarSrc   = 'images/users_avatars/default_avatar.png';

      var response    = ''; // response from server to client

      //validating entered data
      var schema = {
        _firstName   : joi.string().regex(/^[\u0400-\u04FF]+$/).min(3).max(15).required(),
        _lastName    : joi.string().regex(/^[\u0400-\u04FF]+$/).min(5).max(20).required(),
        _phoneNumber : joi.string().regex(/^\d+$/).length(10),
        _password    : joi.string().required()
      };

      var value = {
        _firstName   : firstName,
        _lastName    : lastName,
        _phoneNumber : phoneNumber,
        _password    : password
      };

      joi.validate(value, schema, function (err, value) {
        if (err)
          return reply(require('../auxiliaries/validatorsHandler')(err.details[0].message)).code(400); // validation's errors hadler

        if (avatar) {
          avatarSrc   = 'images/users_avatars/'+randomString()+lastName+'.jpg';

          //if image is in base64
          if ((typeof(avatar) === 'string') && (avatar.indexOf('base64') != -1))
            avatar = new Buffer(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), "base64");

          // creating images
          fs.writeFile(
            avatarSrc,
            avatar,
            function (err) {
              if (err) throw err;
          });
        };

        // validation passed, inserting data in databas table
        users.create({
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          avatar_src: "http://31.131.24.188:8080/" + avatarSrc,
          phone_code: phoneCode,
          password: password,
          confirmation: false },
          function (err) {
            if (err) {
              response = JSON.stringify({ "status": 400, "message": "Этот номер телефона уже был использован для регистрации!" });
              return reply(response).code(400);
            };

            // send validation code on user's phone number
            //getRequest('http://gate.prostor-sms.ru/send/?phone=%2B7'+phoneNumber+'&text='+phoneCode+'&login=t89242331814&password=456570');

            response = JSON.stringify({ "status": 200, "message": "Регистрация успешна!", "phoneCode": phoneCode }); // phoneCode for testing
            return reply(response).code(200);
        });
      });
    }
  });
};

module.exports = registrationUser;
