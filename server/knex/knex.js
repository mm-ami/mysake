const environment = "development";
const knex = require("knex")(require("../../knexfile")[environment]);

module.exports = knex;