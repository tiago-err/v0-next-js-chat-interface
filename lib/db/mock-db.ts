import type { User, Message, Conversation } from "@/lib/types"

// Mock database for users
let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "5m ago",
    status: "online",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "2h ago",
    status: "offline",
    email: "jane.smith@example.com",
  },
  {
    id: "3",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "1d ago",
    status: "away",
    email: "alex.johnson@example.com",
  },
  {
    id: "4",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "Just now",
    status: "online",
    email: "sarah.williams@example.com",
  },
  {
    id: "5",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "3d ago",
    status: "offline",
    email: "michael.brown@example.com",
  },
  {
    id: "6",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "4h ago",
    status: "online",
    email: "emily.davis@example.com",
  },
  {
    id: "7",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "2d ago",
    status: "away",
    email: "david.wilson@example.com",
  },
  {
    id: "8",
    name: "Olivia Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "1h ago",
    status: "online",
    email: "olivia.taylor@example.com",
  },
  {
    id: "9",
    name: "James Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "3h ago",
    status: "offline",
    email: "james.anderson@example.com",
  },
  {
    id: "10",
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "Just now",
    status: "online",
    email: "sophia.martinez@example.com",
  },
]

// Mock database for conversations
let conversations: Conversation[] = [
  {
    id: "conv1",
    participants: ["current-user", "1"],
    lastMessageId: "m3",
    createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 3400000), // Updated with last message
  },
  {
    id: "conv2",
    participants: ["current-user", "2"],
    lastMessageId: "m5",
    createdAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
    updatedAt: new Date(Date.now() - 85000000), // Updated with last message
  },
  {
    id: "conv3",
    participants: ["current-user", "3"],
    lastMessageId: "m8",
    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 169000000), // Updated with last message
  },
  {
    id: "conv4",
    participants: ["current-user", "4"],
    lastMessageId: "m9",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 600000), // Updated with last message
  },
  {
    id: "conv5",
    participants: ["current-user", "5"],
    lastMessageId: "m11",
    createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
    updatedAt: new Date(Date.now() - 250000000), // Updated with last message
  },
]

// Mock database for messages
let messages: Message[] = [
  {
    id: "m1",
    conversationId: "conv1",
    senderId: "1",
    text: "Hey there! How are you?",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: "m2",
    conversationId: "conv1",
    senderId: "current-user",
    text: "I'm good, thanks! How about you?",
    timestamp: new Date(Date.now() - 3500000),
    read: true,
  },
  {
    id: "m3",
    conversationId: "conv1",
    senderId: "1",
    text: "Doing well! Just checking in.",
    timestamp: new Date(Date.now() - 3400000),
    read: false,
  },
  {
    id: "m4",
    conversationId: "conv2",
    senderId: "2",
    text: "Did you see the latest project update?",
    timestamp: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: "m5",
    conversationId: "conv2",
    senderId: "current-user",
    text: "Yes, looks great!",
    timestamp: new Date(Date.now() - 85000000),
    read: true,
  },
  {
    id: "m6",
    conversationId: "conv3",
    senderId: "3",
    text: "Meeting at 3pm tomorrow?",
    timestamp: new Date(Date.now() - 172800000),
    read: true,
  },
  {
    id: "m7",
    conversationId: "conv3",
    senderId: "current-user",
    text: "Sure, I'll be there.",
    timestamp: new Date(Date.now() - 170000000),
    read: true,
  },
  {
    id: "m8",
    conversationId: "conv3",
    senderId: "3",
    text: "Great, see you then!",
    timestamp: new Date(Date.now() - 169000000),
    read: false,
  },
  {
    id: "m9",
    conversationId: "conv4",
    senderId: "4",
    text: "Just sent you the files you requested.",
    timestamp: new Date(Date.now() - 600000),
    read: false,
  },
  {
    id: "m10",
    conversationId: "conv5",
    senderId: "5",
    text: "Can we discuss the project next week?",
    timestamp: new Date(Date.now() - 259200000),
    read: true,
  },
  {
    id: "m11",
    conversationId: "conv5",
    senderId: "current-user",
    text: "Yes, Monday works for me.",
    timestamp: new Date(Date.now() - 250000000),
    read: true,
  },
]

// Helper function to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock database operations
export const db = {
  // User operations
  users: {
    findAll: async () => {
      await delay(300) // Simulate network delay
      return [...users]
    },

    findById: async (id: string) => {
      await delay(200)
      return users.find((user) => user.id === id) || null
    },

    findByIds: async (ids: string[]) => {
      await delay(300)
      return users.filter((user) => ids.includes(user.id))
    },

    search: async (query: string) => {
      await delay(300)
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          (user.email && user.email.toLowerCase().includes(query.toLowerCase())),
      )
    },

    updateStatus: async (userId: string, status: User["status"]) => {
      await delay(200)
      users = users.map((user) => (user.id === userId ? { ...user, status } : user))
      return users.find((user) => user.id === userId) || null
    },
  },

  // Conversation operations
  conversations: {
    findAll: async (userId: string) => {
      await delay(300)
      return conversations.filter((conv) => conv.participants.includes(userId))
    },

    findById: async (id: string) => {
      await delay(200)
      return conversations.find((conv) => conv.id === id) || null
    },

    findByParticipants: async (participantIds: string[]) => {
      await delay(300)
      return (
        conversations.find(
          (conv) =>
            participantIds.every((id) => conv.participants.includes(id)) &&
            conv.participants.length === participantIds.length,
        ) || null
      )
    },

    create: async (participantIds: string[]) => {
      await delay(400)
      const existingConv = await db.conversations.findByParticipants(participantIds)

      if (existingConv) {
        return existingConv
      }

      const newConversation: Conversation = {
        id: `conv${conversations.length + 1}`,
        participants: participantIds,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      conversations = [...conversations, newConversation]
      return newConversation
    },

    update: async (id: string, data: Partial<Conversation>) => {
      await delay(300)
      conversations = conversations.map((conv) => (conv.id === id ? { ...conv, ...data, updatedAt: new Date() } : conv))
      return conversations.find((conv) => conv.id === id) || null
    },
  },

  // Message operations
  messages: {
    findByConversation: async (conversationId: string) => {
      await delay(300)
      return messages
        .filter((msg) => msg.conversationId === conversationId)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    },

    findById: async (id: string) => {
      await delay(200)
      return messages.find((msg) => msg.id === id) || null
    },

    create: async (data: Omit<Message, "id" | "timestamp" | "read">) => {
      await delay(400)
      const newMessage: Message = {
        id: `m${messages.length + 1}`,
        timestamp: new Date(),
        read: false,
        ...data,
      }

      messages = [...messages, newMessage]

      // Update the conversation's lastMessageId and updatedAt
      await db.conversations.update(data.conversationId, {
        lastMessageId: newMessage.id,
        updatedAt: new Date(),
      })

      return newMessage
    },

    markAsRead: async (conversationId: string, userId: string) => {
      await delay(300)
      messages = messages.map((msg) =>
        msg.conversationId === conversationId && msg.senderId !== userId && !msg.read ? { ...msg, read: true } : msg,
      )

      return messages.filter((msg) => msg.conversationId === conversationId && msg.read)
    },

    getUnreadCount: async (conversationId: string, userId: string) => {
      await delay(200)
      return messages.filter((msg) => msg.conversationId === conversationId && msg.senderId !== userId && !msg.read)
        .length
    },
  },
}
