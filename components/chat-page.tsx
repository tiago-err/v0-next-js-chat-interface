"use client";

import {useRouter} from "next/navigation";
import ChatSidebar from "./chat-sidebar";
import ChatArea from "./chat-area";
import ResponsiveChatLayout from "./layout/responsive-chat-layout";
import {useMobile} from "@/hooks/use-mobile";
import {Conversation, User, Message} from "@/generated/prisma";
import {useEffect} from "react";

interface ChatPageProps {
	conversation: Conversation;
	conversations: {id: string; participant: User; messages: Message[]}[];
	participant: User;
	user: User;
	messages: Message[];
	sendMessage: (text: string) => Promise<(Message & {sender: User}) | undefined>;
	reload: () => Promise<void>;
}

export default function ChatPage({conversation, conversations, participant, user, messages, sendMessage, reload}: ChatPageProps) {
	const router = useRouter();
	const isMobile = useMobile();

	useEffect(() => {
		const reloader = setInterval(reload, 2000);

		return () => clearInterval(reloader);
	}, []);

	const handleBack = () => {
		router.push("/");
	};

	// Sidebar component
	const sidebar = <ChatSidebar conversations={conversations} selectedConversation={conversation.id} showBackButton onBack={handleBack} />;

	// Content component with toggleSidebar prop
	const content = ({toggleSidebar}: {toggleSidebar: () => void}) => (
		<ChatArea
			participant={participant}
			user={user}
			messages={messages}
			onSendMessage={sendMessage}
			onToggleSidebar={toggleSidebar}
			onBack={handleBack}
		/>
	);

	return <ResponsiveChatLayout sidebar={sidebar} content={content} isMobile={isMobile} />;
}
