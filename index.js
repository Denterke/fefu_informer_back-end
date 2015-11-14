var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
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

require('./registrationUsers')(server); // register Users
require('./validationUsers')(server) // validate auth
require('./authUsers')(server); // user auth

require('./allUsersInfo')(server); // personal Info about all user
require('./userInfo')(server); // personal Info about user

require('./additionNews')(server); // add new news;
require('./newsline')(server); // line of news;

require('./staticFiles')(server); // get static file - img and others

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
