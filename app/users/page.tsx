import UserListPage from "@/components/user-list-page";
import {getAuth} from "@/lib/auth";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";

export default async function UsersPage() {
	const user = await getAuth();
	if (!user) return redirect("/login");

	const users = await db.users.findAll();
	const conversations = await db.conversations.findAll(user.id);

	const allowedUsers = users.filter(
		(u) => u.id !== user.id && !conversations.flatMap((x) => x.participants.flatMap((p) => p.userID)).includes(u.id),
	);

	const createConversation = async (userID: string) => {
		"use server";

		const conversation = await db.conversations.create([userID, user.id]);
		return redirect(`/chat/${conversation.id}`);
	};

	return <UserListPage users={allowedUsers} createConversation={createConversation} />;
}
