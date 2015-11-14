var fs  = require('fs'); //file system
var joi = require('joi');
var pg  = require('pg');
var conString    = "postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db";
var randomString = require('random-string');

var additionNews = function(server) {
  server.route({
    method: 'POST',
    path:'/additionNews',
    handler: function (request, reply) {

      var title         = decodeURI(request.payload.title);
      var description   = decodeURI(request.payload.description);
      var image         = request.payload.fileUpload;
      var officialParam = request.payload.officialParam;
      var imgSrc        = 'images/newsline/default_news.jpg';

      var schema = {
        title:         joi.string().regex(/[\u0400-\u04FF]/).min(3).max(15).required(),
        description:   joi.string().regex(/[\u0400-\u04FF]/).min(20).max(140).required(),
        officialParam: joi.string().regex(/true|false/).required()
      };
      var value = {
        title: title,
        description: description,
        officialParam: officialParam
      };

      joi.validate(value, schema, function (err, value) {
        if (err) {
          console.log(err.details[0].message);
          return reply(err.details[0].message);
        }
      });

      if (image) {
        imgSrc   = 'images/newsline/'+randomString()+title+'.jpg'; //сделать уникальное имя
        fs.writeFile(
          imgSrc,
          image,
          function(err) {
            if (err) throw err;
          }
        );
      }

      pg.connect(conString, function(err, client, done) {
        if (err) {
          reply('bad connection with database');
          return console.error('could not connect to postgres', err);
        }

        client.query(
          "INSERT INTO news (title, description, img_src, is_official) VALUES ('"+title+"','"+description+"','http://31.131.24.188:8080/"+imgSrc+"','"+officialParam+"')",
          function(err, result) {
            done();
            if (err) {
              console.log(err);
              return reply('u have error!');
            }

          console.log(title, description, imgSrc, officialParam);
          return reply('success');
        });
      });
    }
  });
};

module.exports = additionNews;
