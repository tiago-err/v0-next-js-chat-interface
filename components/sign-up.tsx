"use client";

import type React from "react";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {MessageSquareText, Github, Mail} from "lucide-react";
import {User} from "@/generated/prisma";
import {toast} from "sonner";

interface Credentials {
	name: string;
	email: string;
	password: string;
}

interface Props {
	signUp: (data: Credentials) => Promise<{user?: User; error: string | null}>;
}

export default function SignUpForm({signUp}: Props) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<Credentials>({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		signUp(formData)
			.then(({user, error}) => {
				if (!!error) return toast(error);

				toast(`Welcome to the app, ${user!.name}!`);
				setTimeout(() => router.push("/"), 1000);
			})
			.catch(() => toast("That e-mail is already in use!"))
			.finally(() => setIsLoading(false));
	};

	return (
		<Card className="w-full max-w-md shadow-lg border-muted">
			<CardHeader className="space-y-2 text-center">
				<div className="flex justify-center mb-2">
					<div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
						<MessageSquareText className="h-6 w-6" />
					</div>
				</div>
				<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
				<CardDescription>Enter your information to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Full Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							placeholder="John Doe"
							value={formData.name}
							onChange={handleChange}
							required
							className="bg-muted/30"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="name@example.com"
							value={formData.email}
							onChange={handleChange}
							required
							className="bg-muted/30"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Create a password"
							value={formData.password}
							onChange={handleChange}
							required
							className="bg-muted/30"
						/>
						<p className="text-xs text-muted-foreground">Must be at least 8 characters and include a number and a symbol</p>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Creating account..." : "Create account"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-6">
				<p className="text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
						Sign in
					</Link>
				</p>
				<p className="text-xs text-muted-foreground">
					By creating an account, you agree to our{" "}
					<Link href="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link href="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
						Privacy Policy
					</Link>
					.
				</p>
			</CardFooter>
		</Card>
	);
}
