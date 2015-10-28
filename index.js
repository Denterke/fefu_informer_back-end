var Hapi = require('hapi'); //require с hapi
//var db = require('./dbConnection');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: '31.131.24.188',
    port: 8080
});


server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
      reply('Server WORK!');
    }
});

// register Users
require('./registerUsers')(server);

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
