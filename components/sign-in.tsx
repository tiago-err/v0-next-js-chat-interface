"use client";

import type React from "react";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {MessageSquareText, Github, Mail} from "lucide-react";
import {User} from "@/generated/prisma";
import {toast} from "sonner";
import {Toast} from "./ui/toast";

interface Props {
	signIn: (credentials: {email: string; password: string}) => Promise<{user?: undefined; error: string} | {user: User; error: null}>;
}

export default function SignInForm({signIn}: Props) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		signIn(formData)
			.then(({user, error}) => {
				if (!!error) return toast(error);
				toast(`Welcome ${user!.name}`);
				setTimeout(() => router.push("/"), 500);
			})
			.catch(() => alert("NO"))
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
				<CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
				<CardDescription>Sign in to your account to continue</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
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
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							<Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							required
							className="bg-muted/30"
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-6">
				<p className="text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="text-primary hover:text-primary/80 transition-colors font-medium">
						Sign up
					</Link>
				</p>
				<p className="text-xs text-muted-foreground">
					By signing in, you agree to our{" "}
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
