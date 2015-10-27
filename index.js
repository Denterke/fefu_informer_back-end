var Hapi = require('hapi'); //require с hapi
var pg = require('pg'); //require с postgres

// Create a server with a host and port
var server = new Hapi.Server();
var client = new pg.Client("postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db");

server.connection({
    host: '31.131.24.188',
    port: 8080
});

client.connect();

// TestConnection to DB
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
      client.query('SELECT first_name FROM users', function(err, result) {
        if(err) throw err;

        reply (result.rows[0].first_name);
      });
    }
});

// Test Post method
require('./registerUsers')(server);

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
