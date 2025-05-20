import SignInForm from "@/components/sign-in";
import {getAuth, signIn} from "@/lib/auth";
import {getCookie} from "@/lib/cookies";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
	title: "Sign In | Chat App",
	description: "Sign in to your account to access your conversations",
};

export default async function SignInPage() {
	const user = await getAuth();
	if (!!user) return redirect("/");

	const signIntoApp = async (credentials: {email: string; password: string}) => {
		"use server";

		return await signIn(credentials);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 flex items-center justify-center p-4 sm:p-8">
				<SignInForm signIn={signIntoApp} />
			</main>
		</div>
	);
}
