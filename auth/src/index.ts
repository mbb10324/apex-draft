/*imports
 ========================================================================*/
import express, { NextFunction, Request, Response } from "express";
import createAuthRouter from "@routers/auth.ts";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import log from "./utils/logger.ts";
import chalk from "chalk";
import cors from "cors";
import path from "path";

/* Initialize express app
  ========================================================================*/
const app = express();

/* Initialize database connection
  ========================================================================*/
const db = new PrismaClient();

/* Initialize environment vars
  ========================================================================*/
const port = process.env.PORT;
const apiUrl = process.env.API_URL;
const clientUrl = process.env.CLIENT_URL;
const nodeEnv = process.env.NODE_ENV || "development";

/* Establish server endpoint
  ========================================================================*/
let endpoint = "";
if (!apiUrl || nodeEnv === "development") {
	endpoint = `http://localhost:${port}`;
} else if (apiUrl && nodeEnv === "production") {
	endpoint = apiUrl;
}

/* Establish middlewares
  ========================================================================*/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: clientUrl,
		credentials: true,
	})
);

/* Server running: terminal indicator
  ========================================================================*/
app.listen(port, () => {
	console.log(chalk.greenBright(`\n⚡️ Server is running at ${endpoint} ⚡️\n`));
});

/* Server running: endpoint indicator
  ========================================================================*/
app.get("/", (_, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* Get database connection
  ========================================================================*/
app.get("/db", async (_, res, next) => {
	try {
		await db.$queryRaw`SELECT 1+1 as result`;
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

/* Get client url
  ========================================================================*/
app.get("/client", (_, res) => {
	res.json({ clientUrl: clientUrl });
});

/* Use the routers
  ========================================================================*/
app.use("/auth", createAuthRouter(db));

/* Error handling
  ========================================================================*/
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	next();
	log(req.originalUrl, "ERROR");
	console.error(error);
	res.status(500).json({ error: "Internal Server Error" });
});
