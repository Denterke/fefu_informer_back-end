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

require('./reg&authUsers/registrationUsers')(server); // register Users
require('./reg&authUsers/validationUsers')(server) // validate auth
require('./reg&authUsers/authUsers')(server); // user auth

require('./interactionUsers/allUsersInfo')(server); // personal Info about all user
require('./interactionUsers/userInfo')(server); // personal Info about user

require('./news/additionNews')(server); // add new news;
require('./news/newsline')(server); // line of news;

require('./staticFiles')(server); // get static file - img and others

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
