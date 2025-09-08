const { Pool } = require("pg")


module.exports = new Pool({
    // host: "localhost",
    // user: "harry",
    // database: "top_users",
    // password: "sqlpassword",
    // port: 5432

    connectionString: process.env.LOCAL_CONNECTION_STRING,
})
