"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {ArrowLeft, Plus} from "lucide-react";
import {Conversation, User, Message} from "@/generated/prisma";
import UserAvatar from "./ui/user-avatar";

interface ChatSidebarProps {
	conversations: {id: string; participant: User; messages: Message[]}[];
	selectedConversation: string | null;
	showBackButton?: boolean;
	onBack?: () => void;
}

export default function ChatSidebar({conversations, selectedConversation, showBackButton = true, onBack}: ChatSidebarProps) {
	return (
		<div className="flex flex-col w-full h-full border-r border-border bg-background">
			<div className="flex items-center justify-between p-4 border-b border-border bg-chat-light/50">
				<div className="flex items-center gap-2">
					{showBackButton && onBack ? (
						<Button variant="ghost" size="icon" onClick={onBack} className="text-primary hover:text-white">
							<ArrowLeft className="h-5 w-5" />
							<span className="sr-only">Back to conversations</span>
						</Button>
					) : null}

					<h2 className="text-lg font-semibold text-primary">Chats</h2>
				</div>

				<Link href="/users">
					<Button variant="ghost" size="icon" className="text-primary hover:text-white">
						<Plus className="h-5 w-5" />
						<span className="sr-only">New conversation</span>
					</Button>
				</Link>
			</div>

			<div className="flex-1 overflow-auto p-2">
				<ul className="space-y-1">
					{conversations.map((convo) => {
						const isActive = selectedConversation === convo.id;
						const unread = convo.messages.filter((x) => x.senderID === convo.participant.id && !x.read).length;

						return (
							<Link href={`/chat/${convo.id}`} key={convo.id}>
								<Button
									variant="ghost"
									className={cn(
										"w-full justify-start px-3 py-2.5 h-auto rounded-lg transition-all ease-in-out duration-300 group",
										isActive
											? "bg-chat-light border-l-4 border-primary text-primary font-medium hover:!text-white"
											: "hover:bg-chat-light/50",
									)}>
									<div className="flex items-center w-full gap-3">
										<UserAvatar
											name={convo.participant.name}
											size="medium"
											className={cn(
												isActive && "ring-2 ring-primary",
												"group-hover:!text-white group-hover:!bg-white/50 group-hover:!ring-white transition ease-in-out duration-300",
											)}
										/>
										<div className="flex-grow flex flex-col gap-1 min-w-0">
											<div className="flex justify-between items-center">
												<p className="text-sm font-medium truncate">{convo.participant.name}</p>
												{!!unread && unread > 0 && (
													<Badge variant="default" className="ml-2 bg-primary">
														{unread}
													</Badge>
												)}
											</div>
											<p
												className={cn(
													"text-xs text-muted-foreground truncate w-fit transition ease-in-out duration-300",
													isActive && "group-hover:text-white",
													convo.messages.length === 0 && "italic",
												)}>
												{[...convo.messages].pop()?.text || "No messages yet"}
											</p>
										</div>
									</div>
								</Button>
							</Link>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
