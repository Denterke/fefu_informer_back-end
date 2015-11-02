var pg = require('pg'); //require с postgres
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";

var newsLine = function(server) {

  server.route({
    method: 'GET',
    path:'/newsLine/{offsetValue}&{newsStatus}',
    handler: function (request, reply) {
      var whereOfficial;

      pg.connect(conString, function(err, client, done) {
        if (err) {
          reply('bad connection with database');
          return console.error('could not connect to postgres', err);
        }

        switch (request.params.newsStatus) {
          case "a":
            whereOfficial = "";
            break;
          case "o":
            whereOfficial = "WHERE is_official=true";
            break;
          case "u":
            whereOfficial = "WHERE is_official=false";
            break;
        }

        client.query(
          "SELECT * FROM news " +whereOfficial+ " ORDER BY id DESC LIMIT 5 OFFSET " + request.params.offsetValue,
          function(err, result) {
            done();
            if (err) {
              throw err;
              return reply('bad connection with database');
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
        //console.log(request.params.imgName);
        reply.file('images/newsline/' + request.params.imgName);
      }
    });
  });

};

module.exports = newsLine;
