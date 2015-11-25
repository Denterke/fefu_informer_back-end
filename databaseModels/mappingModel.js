var orm = require("orm");

var usersDB = orm.connect("postgres://user:pass@31.131.24.188:5432/fefu_informer_db", function (err, db) {
  var response;

  if (err) {
    console.log(err);
    response = JSON.stringify({"status": 500, "message": "Проблемы с подключение к базе данных!" }); // phoneCode for testing
    return reply(response).code(500);
  };

  db.define("users", {
    first_name   : String,
    last_name    : String,
    phone_number : String, // упс, это должен быть INT :)
    id           : { type: 'integer' },
    avatar_src   : String,
    phone_code   : String, // упс, это должен быть INT :)
    password     : String,
    confirmation : Boolean
  });

  db.define("events", {
    title        : String,
    description  : String,
    img_src      : String,
    is_official  : Boolean,
    id           : { type: 'integer' },
    creator      : String
  });

  db.define("driving", {
    destination  : String,
    departure    : String,
    payment      : { type: 'integer' },
    note         : String,
    phone_number : String,
    creator      : String,
    id           : { type: 'serial' }
  });

});

module.exports = usersDB.models;
