import express, { NextFunction, Request, Response } from "express";
import { PrismaClient, users } from "@prisma/client";
import log from "../utils/logger.ts";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtSecret = process.env.JWT_SECRET || "shhh";
const bcryptRound = parseInt(process.env.BCRYPT_ROUNDS || "10");

type SanitizedUser = Omit<
	users,
	| "id"
	| "password"
	| "created_at"
	| "updated_at"
	| "last_login"
	| "login_attempts"
	| "verification_token"
	| "password_reset_expires"
	| "password_reset_token"
	| "last_password_change"
	| "is_active"
	| "is_verified"
	| "role"
	| "locked_until"
	| "two_factor_secret"
>;

interface AuthenticatedRequest extends Request {
	user?: SanitizedUser;
	token?: string;
}

export default function createAuthRouter(db: PrismaClient) {
	const router = express.Router();

	router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, username, firstName, lastName, password } = req.body;

			console.log(req.body);

			if (!validator.isEmail(email)) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-params" });
			}

			if (!validator.isStrongPassword(password)) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-params" });
			}

			if (!validator.isAlphanumeric(username)) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-params" });
			}

			if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-params" });
			}

			const hashedPassword = await bcrypt.hash(password, bcryptRound);

			const isEmailTaken = await db.users.findFirst({ where: { email } });

			if (isEmailTaken) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "email-taken" });
			}

			const newUser = await db.users.create({
				data: {
					email,
					username,
					first_name: firstName,
					last_name: lastName,
					password: hashedPassword,
				},
			});

			const sanitizedUser = sanitizeUser(newUser);
			const token = await jwt.sign(sanitizedUser, jwtSecret);
			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 3600000,
			});
			log(req.originalUrl, "SUCCESS");
			log(req.originalUrl, "SUCCESS");
			res.status(200).json({ message: "created" });
		} catch (error) {
			next(error);
		}
	});

	router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const email = req.body.email;
			const password = req.body.password;

			if (!validator.isEmail(email)) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-credentials" });
			}

			if (!validator.isStrongPassword(password)) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-credentials" });
			}

			const user = await db.users.findFirst({ where: { email } });

			// If the user does not exist
			if (!user) {
				return res.status(401).json({ message: "invalid-credentials" });
			} else {
				// If the user exists, compare the password
				const passwordMatch = await bcrypt.compare(password, user.password);
				if (!passwordMatch) {
					return res.status(401).json({ message: "invalid-credentials" });
				}
				// If the user exists, password matches but is not verified
				if (!user.is_verified) {
					return res.status(401).json({ message: "not-verified" });
				}
				// If the user exists, password matches, is verified but is not active
				if (!user.is_active) {
					return res.status(401).json({ message: "not-active" });
				}
				// If the user exists, password matches, is verified, and is active
				const sanitizedUser = sanitizeUser(user);
				const token = await jwt.sign(sanitizedUser, jwtSecret);
				res.cookie("token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "strict",
					maxAge: 3600000,
				});
				log(req.originalUrl, "SUCCESS");
				res.status(200).json({ message: "authorized" });
			}
		} catch (error) {
			next(error);
		}
	});

	router.get("/logout", requireUser, async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.cookie("token", "", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				expires: new Date(0),
			});

			log(req.originalUrl, "SUCCESS");
			res.status(200).json({ message: "logged-out" });
		} catch (error) {
			next(error);
		}
	});

	router.post("/verify", async (req, res, next) => {
		try {
			const email = req.body.email;
			const code = req.body.code;

			const user = await db.users.findFirst({ where: { email } });
			if (!user) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-user" });
			}
			if (user.is_verified) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "already-verified" });
			}
			if (!user.is_active) {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "not-active" });
			}

			// TODO: Turn this on when the code verification is implemented
			// if (code === user.verification_token) {
			if (code === "12345") {
				await db.users.update({ where: { email }, data: { is_verified: true } });
				log(req.originalUrl, "SUCCESS");
				return res.status(200).json({ message: "authorized" });
			} else {
				log(req.originalUrl, "SUCCESS");
				return res.status(401).json({ message: "invalid-code" });
			}
		} catch (error) {
			next(error);
		}
	});

	router.get("/session", requireUser(db), async (req: AuthenticatedRequest, res: Response) => {
		const user = req.user;
		log(req.originalUrl, "SUCCESS");
		res.status(200).json({ user, message: "authorized" });
	});

	return router;
}

export function requireUser(db: PrismaClient) {
	return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const token = req.cookies["token"];

		if (!token) {
			return res.status(401).json({ message: "no-user" });
		}

		try {
			const { email } = (await jwt.verify(token, jwtSecret)) as { email: string };
			const user = await db.users.findFirst({ where: { email } });
			if (!user) {
				return res.status(401).json({ message: "no-record" });
			}
			if (!user.is_verified) {
				return res.status(401).json({ message: "not-verified" });
			}
			if (!user.is_active) {
				return res.status(401).json({ message: "not-active" });
			}
			const sanitizedUser = sanitizeUser(user);
			req.user = sanitizedUser;
			req.token = token;
			return next();
		} catch (e) {
			console.error(e);
			return res.status(401).json({ message: "server-error" });
		}
	};
}

function sanitizeUser(user: users) {
	const { email, first_name, last_name, profile_picture_url, username } = user;
	return { email, first_name, last_name, profile_picture_url, username };
}
