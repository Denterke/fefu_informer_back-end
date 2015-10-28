var pg = require('pg'); //require с postgres
var db = new pg.Client("postgres://postgres:bafffefu123@31.131.24.188:5432/fefu_informer_db");

module.exports = db;
