require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: "postgresql",
		connection: {
			host: "127.0.0.1",
			// host: "database-1.coahjlijuhep.us-east-1.rds.amazonaws.com",
			password: process.env.PG_PASSWORD,
			user: process.env.PG_USER,
			port: process.env.PG_PORT,
			database: process.env.PG_DB_NAME,
		},
	},
};
