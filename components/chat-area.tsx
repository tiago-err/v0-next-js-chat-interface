"use client";

import type React from "react";

import {useState, useRef, useEffect, useMemo} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {ArrowLeft, Check, Menu, Send, Smile} from "lucide-react";
import {format} from "date-fns";
import {Message, User} from "@/generated/prisma";
import {groupBy} from "lodash";
import UserAvatar from "./ui/user-avatar";

interface ChatAreaProps {
	participant: User;
	user: User;
	messages: Message[];
	onSendMessage: (text: string) => Promise<(Message & {sender: User}) | undefined>;
	onToggleSidebar: () => void;
	onBack?: () => void;
}

export default function ChatArea({user, participant, messages, onSendMessage, onToggleSidebar, onBack}: ChatAreaProps) {
	const [inputValue, setInputValue] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isInputFocused, setIsInputFocused] = useState(false);

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
	}, [messages]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onSendMessage(inputValue);
			setInputValue("");
		}
	};

	if (!participant) {
		return (
			<div className="flex-1 flex items-center justify-center p-4">
				<p className="text-muted-foreground">Select a chat to start messaging</p>
			</div>
		);
	}

	// Group messages by date
	const groupedMessages = useMemo(
		() =>
			groupBy(
				messages.map((m) => ({...m, date: format(m.timestamp, "MMMM d, yyyy")})),
				"date",
			),
		[messages],
	);

	return (
		<div className="flex-1 flex flex-col h-full bg-chat-light/20">
			{/* Chat header */}
			<div className="flex items-center p-4 border-b border-border bg-background shadow-sm">
				<div className="flex items-center">
					<Button
						variant="ghost"
						size="icon"
						onClick={onToggleSidebar}
						className="mr-2 text-primary hover:text-primary/80"
						aria-label="Toggle sidebar">
						<Menu className="h-5 w-5" />
					</Button>

					{onBack && (
						<Button variant="ghost" size="icon" onClick={onBack} className="mr-2 md:hidden text-primary hover:text-primary/80">
							<ArrowLeft className="h-5 w-5" />
							<span className="sr-only">Back to conversations</span>
						</Button>
					)}
				</div>

				<UserAvatar name={participant.name} size="medium" className="mr-3 ring-2 ring-primary/20" />

				<div>
					<h3 className="font-medium text-primary">{participant.name}</h3>
					{/* <p className="text-xs text-muted-foreground">{participant}</p> */}
				</div>
			</div>

			{/* Messages area */}
			<div className="flex-1 overflow-y-auto p-4 space-y-6">
				{Object.entries(groupedMessages).map(([date, dateMessages]) => (
					<div key={date} className="flex flex-col items-center w-full space-y-4">
						<div className="flex justify-center">
							<span className="text-xs bg-chat-light px-3 py-1 rounded-full text-primary/70 font-medium">{date}</span>
						</div>

						{dateMessages.map((message, index) => {
							const isSender = message.senderID === user.id;
							const showAvatar = !isSender && (index === 0 || dateMessages[index - 1]?.senderID !== message.senderID);

							return (
								<div key={message.id} className={cn("flex items-end gap-2 relative w-fit", isSender ? "self-end" : "self-start")}>
									{!isSender && showAvatar ? <UserAvatar name={participant.name} /> : !isSender ? <div className="w-8" /> : null}

									<div className={cn(isSender ? "chat-message-sent text-right" : "chat-message-received")}>
										<p>{message.text}</p>
										<div className={cn("flex items-end gap-1", isSender && "justify-end")}>
											<p
												className={cn(
													"text-xs mt-1 text-right text-nowrap",
													isSender ? "text-primary-foreground/70" : "text-muted-foreground",
												)}>
												{format(message.timestamp, "HH:mm")}
											</p>
											{isSender && message.read && <Check size={16} className="text-primary-foreground/70" />}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>

			{/* Message input */}
			<div className="p-4 border-t border-border bg-background">
				<form onSubmit={handleSubmit} className="flex items-center gap-2">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className={cn("text-muted-foreground", isInputFocused ? "hover:text-primary" : "hover:text-muted-foreground")}>
						<Smile className="h-5 w-5" />
						<span className="sr-only">Add emoji</span>
					</Button>

					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
						placeholder="Type a message..."
						className="chat-input flex-1"
					/>

					<Button type="submit" size="icon" disabled={!inputValue.trim()} className="rounded-full h-10 w-10 flex-shrink-0">
						<Send className="h-5 w-5" />
						<span className="sr-only">Send message</span>
					</Button>
				</form>
			</div>
		</div>
	);
}
