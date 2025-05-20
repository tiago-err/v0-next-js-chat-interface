// After login
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";
import {setCookie} from "./cookies";

const jwtSecret = process.env.JWT_SECRET!;

export function createJWT(userID: string) {
	return jwt.sign({sub: userID}, jwtSecret, {expiresIn: "7d"});
}

export function checkJWT(token: string) {
	return jwt.verify(token, jwtSecret);
}

export function decodeJWT(token: string) {
	return jwt.decode(token)?.sub;
}

export async function setSessionCookie(token: string) {
	await setCookie("session", token, {
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7,
	});
}
