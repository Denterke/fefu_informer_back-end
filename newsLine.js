var pg = require('pg'); //require с postgres
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";

var newsLine = function(server) {

  server.route({
    method: 'GET',
    path:'/newsLine',
    handler: function (request, reply) {


        pg.connect(conString, function(err, client, done) {
          if (err) {
            response = "bad connection with database";
            return console.error('could not connect to postgres', err);
          }

          client.query(
            "SELECT * FROM news",
            function(err, result) {
              done();
              if (err) {
                response = "bad connection with database";
                throw err;
              }
              return reply(result.rows);
          });
        });
    }
  });

  server.register(require('inert'), function () {
    server.route({
      method: 'GET',
      path:'/images/newsline/{imgName}',
      handler: function (request, reply) {
        console.log(request.params.imgName);
        reply.file('images/newsline/' + request.params.imgName);
      }
    });
  });

};

module.exports = newsLine;
