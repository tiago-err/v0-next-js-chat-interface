import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {cookies} from "next/headers";

export const setCookie = async (key: string, value: string, data?: Partial<ResponseCookie>) => {
	const cookieStore = await cookies();
	cookieStore.set({
		name: key,
		value,
		httpOnly: true,
		...(!data ? {} : data),
	});
};

export const getCookie = async (key: string) => {
	const cookieStore = await cookies();
	return cookieStore.get(key);
};

export const deleteCookie = async (key: string) => {
	const cookieStore = await cookies();
	return cookieStore.delete(key);
};
