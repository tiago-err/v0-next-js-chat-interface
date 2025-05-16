export interface User {
  id: string
  name: string
  avatar: string
  lastSeen: string
  status: "online" | "offline" | "away"
  email?: string
  unread?: number
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  text: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  participants: string[] // User IDs
  lastMessageId?: string
  createdAt: Date
  updatedAt: Date
}
