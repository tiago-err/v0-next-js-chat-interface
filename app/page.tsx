import ConversationListPage from "@/components/conversation-list-page";
import {getAuth, signOut} from "@/lib/auth";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";

export default async function Home() {
	const user = await getAuth();
	if (!user) return redirect("/login");

	const conversations = (await db.conversations.findAll(user.id)).map((x) => ({
		id: x.id,
		participant: x.participants.map((p) => p.user).find((p) => p.id !== user.id)!,
		messages: x.messages,
	}));

	const logout = async () => {
		"use server";
		await signOut();
		return redirect("/login");
	};

	return <ConversationListPage signOut={logout} user={user} conversations={conversations} />;
}
