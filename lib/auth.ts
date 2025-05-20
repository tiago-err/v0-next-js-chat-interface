"use server";

import bcrypt from "bcryptjs";
import {deleteCookie, getCookie} from "./cookies";
import {db} from "./db";
import {checkJWT, createJWT, decodeJWT, setSessionCookie} from "./jwt";
import {signInSchema, signUpSchema} from "./zod";

export const getAuth = async () => {
	const cookie = await getCookie("session");
	if (!cookie) return undefined;

	if (!checkJWT(cookie.value)) return undefined;
	const userID = decodeJWT(cookie.value);
	if (!userID || typeof userID !== "string") return undefined;

	const user = await db.users.findById(userID);
	if (!user) return undefined;

	return user;
};

export const signIn = async (data: {email: string; password: string}) => {
	const {email, password} = await signInSchema.parseAsync(data);

	const user = await db.users.findByEmail(email);
	if (!user) return {error: "Invalid email!"};

	const isSamePassword = bcrypt.compareSync(password, user.password);
	if (!isSamePassword) return {error: "Invalid password!"};

	await setSessionCookie(createJWT(user.id));

	return {user, error: null};
};

export const signOut = async () => {
	return await deleteCookie("session");
};

export const signUp = async (data: {email: string; password: string; name: string}) => {
	const {email, password, name} = await signUpSchema.parseAsync(data);

	const repeatedUser = await db.users.findByEmail(email);
	if (!!repeatedUser) return {error: "E-mail already in use!"};

	const user = await db.users.create({email, password, name});
	await setSessionCookie(createJWT(user.id));

	return {user, error: null};
};
