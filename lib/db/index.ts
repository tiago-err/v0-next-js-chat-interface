import {Message, User} from "@/generated/prisma";
import prisma from "./prisma";
import ShortUniqueId from "short-unique-id";
import bcrypt from "bcryptjs";

export const db = {
	// User operations
	users: {
		findAll: async () => {
			return await prisma.user.findMany();
		},

		findById: async (id: string) => {
			return await prisma.user.findUnique({where: {id}});
		},

		findByEmail: async (email: string) => {
			return await prisma.user.findUnique({where: {email}});
		},

		findByIds: async (ids: string[]) => {
			return await prisma.user.findMany({where: {id: {in: ids}}});
		},

		search: async (query: string) => {
			return (await prisma.user.findMany()).filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
		},

		create: async (data: {email: string; name: string; password: string}) => {
			const {randomUUID} = new ShortUniqueId({length: 10});
			const hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));

			return await prisma.user.create({data: {...data, id: randomUUID(), password: hashedPassword}});
		},

		update: async (id: string, body: Partial<User>) => {
			return await prisma.user.update({where: {id}, data: body});
		},
	},

	// Conversation operations
	conversations: {
		findAll: async (userID: string) => {
			return await prisma.conversation.findMany({
				where: {
					participants: {
						some: {
							userID: userID,
						},
					},
				},
				include: {
					participants: {
						include: {
							user: true, // optional: include user data
						},
					},
					messages: true, // optional: include messages in each conversation
				},
			});
		},

		findById: async (id: string) => {
			return await prisma.conversation.findUnique({where: {id}, include: {messages: true, participants: {include: {user: true}}}});
		},

		findByParticipants: async (participantIds: string[]) => {
			return await prisma.conversation.findMany({
				where: {
					participants: {
						every: {
							userID: {in: participantIds},
						},
					},
				},
				include: {
					participants: {
						include: {
							user: true, // optional: include user data
						},
					},
					messages: true, // optional: include messages in each conversation
				},
			});
		},

		markAsRead: async (id: string, userID: string) => {
			return await prisma.message.updateMany({where: {conversationID: id, senderID: {not: userID}, read: false}, data: {read: true}});
		},

		create: async (participantIds: string[]) => {
			const {randomUUID} = new ShortUniqueId({length: 10});
			return await prisma.conversation.create({
				data: {
					id: randomUUID(),
					participants: {
						create: participantIds.map((u) => ({user: {connect: {id: u}}})),
					},
				},
			});
		},
	},

	// Message operations
	messages: {
		findByConversation: async (conversationID: string) => {
			return await prisma.message.findMany({where: {conversationID}, orderBy: {timestamp: "desc"}, include: {sender: true}});
		},

		findById: async (id: string) => {
			return await prisma.message.findUnique({where: {id}});
		},

		create: async (data: Omit<Message, "id" | "timestamp" | "read">) => {
			const {randomUUID} = new ShortUniqueId({length: 10});

			return await prisma.message.create({data: {...data, id: randomUUID(), timestamp: new Date(), read: false}, include: {sender: true}});
		},

		markAsRead: async (id: string) => {
			return await prisma.message.update({where: {id}, data: {read: true}});
		},

		markMultipleAsRead: async (ids: string[]) => {
			return await prisma.message.updateMany({where: {id: {in: ids}}, data: {read: true}});
		},

		getUnreadCount: async (conversationID: string, userID: string) => {
			return await prisma.message.count({where: {conversationID, read: false, senderID: {not: userID}}});
		},
	},
};
