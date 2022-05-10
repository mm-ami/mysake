const environment = "production";
const knex = require("knex")(require("../../knexfile")[environment]);

module.exports = knex;