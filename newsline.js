var pg = require('pg'); //require с postgres
var conString = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";

var newsline = function(server) {

  server.route({
    method: 'GET',
    path:'/newsline/{offsetValue}&{newsStatus}',
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
              return reply('bad connection with database');
            }
            //console.log(result.rows);
            return reply(result.rows);
        });
      });
    }
  });

};

module.exports = newsline;
