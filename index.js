var Hapi = require('hapi');
var server = new Hapi.Server();

// Create a server connection with a host and port
server.connection({
    host: '31.131.24.188',
    port: 8080
});

//testing work of server
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
      reply('SERVER IS WORK!');
    }
});

require('./reg&authUsers/registrationUsers')(server); // register users
require('./reg&authUsers/validationUsers')(server) // validate users
require('./reg&authUsers/authUsers')(server); // auth users

require('./interactionUsers/allUsersInfo')(server); // info about all user
require('./interactionUsers/userInfo')(server); // info about specific user

require('./driving/additionDrivingBid')(server); // add new driving bid
require('./driving/drivingBidsList')(server); // get list of driving bids

require('./events/additionEvents')(server); // add new news
require('./events/eventsList')(server); // line of news

require('./auxiliaries/staticFiles')(server); // get static file - img and others

require('./chatServer')(server); // testing sockets...

// for Ilya
var dbTables = require('./databaseModels/mappingModel'); //map of database tables
server.route({
    method: 'GET',
    path:'/{phoneNumber}',
    handler: function (request, reply) {
      var users       = dbTables.users; // select table users
      var phoneNumber = request.params.phoneNumber.substring(1); // becouse preservation in the database a phone number without '8'
      console.log(phoneNumber);

      users.find({ phone_number: phoneNumber }, function (err, user) {
        user[0].remove();
      });
      reply("removed!");
    }
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
