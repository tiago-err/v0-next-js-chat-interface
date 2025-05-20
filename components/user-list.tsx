"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {ArrowLeft, Search, UserPlus} from "lucide-react";
import {allUsers} from "@/lib/mock-data";
import UserAvatar from "./ui/user-avatar";

export default function UserList() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	// Filter users based on search query
	const filteredUsers = allUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

	const startNewChat = (userId: string) => {
		// In a real app, you might create a new chat in the database here
		// For now, we'll just redirect to the chat page
		router.push(`/chat/${userId}`);
	};

	return (
		<div className="container max-w-md mx-auto p-4">
			<CardHeader className="px-0 pb-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" onClick={() => router.back()} className="text-primary hover:text-primary/80">
							<ArrowLeft className="h-5 w-5" />
							<span className="sr-only">Back</span>
						</Button>
						<CardTitle>New Conversation</CardTitle>
					</div>
				</div>

				<div className="mt-4 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search users..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-9 bg-muted/30 border-none"
					/>
				</div>
			</CardHeader>

			<CardContent className="px-0">
				<div className="space-y-3">
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user) => (
							<Card key={user.id} className="conversation-card cursor-pointer" onClick={() => startNewChat(user.id)}>
								<div className="flex items-center space-x-4">
									<UserAvatar name={user.name} />

									<div className="flex-1 min-w-0">
										<div className="flex justify-between items-center">
											<h3 className="font-medium">{user.name}</h3>
											<Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary/80">
												<UserPlus className="h-4 w-4" />
												<span className="sr-only">Start chat with {user.name}</span>
											</Button>
										</div>
										<p className="text-sm text-muted-foreground truncate">Tap to start a conversation</p>
									</div>
								</div>
							</Card>
						))
					) : (
						<div className="text-center py-8">
							<p className="text-muted-foreground">No users found</p>
						</div>
					)}
				</div>
			</CardContent>
		</div>
	);
}
