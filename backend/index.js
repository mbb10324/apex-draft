/*imports
 ========================================================================*/
const { log } = require("./logger.js");
const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

/* Initialize environment vars
 ========================================================================*/
require("dotenv").config();
const port = process.env.PORT;
const apiUrl = process.env.API_URL;
const clientUrl = process.env.CLIENT_URL;
const nodeEnv = process.env.NODE_ENV;

/* Express server endpoint
 ========================================================================*/
let endpoint = "";
if (!apiUrl || nodeEnv === "development") {
	endpoint = `http://localhost:${port}`;
} else if (apiUrl && nodeEnv === "production") {
	endpoint = apiUrl;
}

/* Establish middleware
 ========================================================================*/
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

/* Establish database connection
 ========================================================================*/
const knex = require("knex")(require("./knexfile.js")[nodeEnv]);

/* Server running: terminal indicator
 ========================================================================*/
app.listen(port, () => {
	console.log(chalk.greenBright(`\n⚡️ Server is running at ${endpoint} ⚡️\n`));
});

/* Server running: endpoint indicator
 ========================================================================*/
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* Check if database is connected
 ========================================================================*/
app.get("/db", async (req, res, next) => {
	try {
		await knex.raw("SELECT 1+1 as result");
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

/* Get client url
 ========================================================================*/
app.get("/client_url", (req, res) => {
	res.json({ clientUrl: clientUrl });
});

/* Import routers
 ========================================================================*/
const workoutRouter = require("./routers/workouts.js");
const communityRouter = require("./routers/community.js");

/* Use the routers
 ========================================================================*/
app.use("/workouts", workoutRouter);
app.use("/community", communityRouter);

/* Error handling
 ========================================================================*/
app.use((error, req, res, next) => {
	next();
	log(req.originalUrl, "ERROR");
	console.error(error);
	res.status(500).json({ error: "Internal Server Error" });
});
