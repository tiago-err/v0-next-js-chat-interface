import ChatPage from "@/components/chat-page";
import {Message, User} from "@/generated/prisma";
import {getAuth} from "@/lib/auth";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function ChatPageRoute({params}: {params: Promise<{conversationID: string}>}) {
	const user = await getAuth();
	if (!user) return redirect("/login");

	const conversation = await db.conversations.findById((await params).conversationID);
	if (!conversation) return redirect("/");

	await db.conversations.markAsRead(conversation.id, user.id);

	const conversations = await db.conversations.findAll(user.id);
	const formattedConversations = conversations.map((c) => ({
		id: c.id,
		messages: c.messages,
		participant: c.participants.map((p) => p.user).find((p) => p.id !== user.id)!,
	}));

	const sendMessage = async (text: string) => {
		"use server";
		if (!text.trim()) return;

		const message = await db.messages.create({
			conversationID: conversation.id,
			senderID: user.id,
			text: text.trim(),
		});

		revalidatePath(`/chat/${conversation.id}`);
		return message;
	};

	const reload = async () => {
		"use server";
		revalidatePath(`/chat/${conversation.id}`);
	};

	return (
		<ChatPage
			user={user}
			messages={conversation.messages}
			participant={conversation.participants.map((p) => p.user).find((p) => p.id !== user.id)!}
			conversations={formattedConversations}
			conversation={conversation}
			sendMessage={sendMessage}
			reload={reload}
		/>
	);
}
