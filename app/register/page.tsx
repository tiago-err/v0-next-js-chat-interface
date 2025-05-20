import SignInForm from "@/components/sign-in";
import SignUpForm from "@/components/sign-up";
import {getAuth, signUp} from "@/lib/auth";
import {db} from "@/lib/db";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
	title: "Sign Up | Chat App",
	description: "Create your account to access your conversations",
};

export default async function SignUpPage() {
	const user = await getAuth();
	if (!!user) return redirect("/");

	const signUpIntoApp = async (data: {name: string; email: string; password: string}) => {
		"use server";

		return await signUp(data);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 flex items-center justify-center p-4 sm:p-8">
				<SignUpForm signUp={signUpIntoApp} />
			</main>
		</div>
	);
}
