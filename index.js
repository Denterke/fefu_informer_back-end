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
//for work of Ilya
require('./auxiliaries/deleteUser')(server); // testing sockets...

require('./chatServer')(server); // testing sockets...

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
