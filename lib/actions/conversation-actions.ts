"use server"

import { db } from "@/lib/db/mock-db"
import type { Conversation, User } from "@/lib/types"

/**
 * Get all conversations for the current user
 */
export async function getUserConversations(): Promise<Conversation[]> {
  try {
    // In a real app, you would get the current user ID from the session
    const currentUserId = "current-user"

    return await db.conversations.findAll(currentUserId)
  } catch (error) {
    console.error("Failed to fetch conversations:", error)
    throw new Error("Failed to fetch conversations")
  }
}

/**
 * Get a conversation by ID
 */
export async function getConversationById(conversationId: string): Promise<Conversation | null> {
  try {
    return await db.conversations.findById(conversationId)
  } catch (error) {
    console.error(`Failed to fetch conversation with ID ${conversationId}:`, error)
    throw new Error(`Failed to fetch conversation with ID ${conversationId}`)
  }
}

/**
 * Create a new conversation or get existing one
 */
export async function createOrGetConversation(participantId: string): Promise<Conversation> {
  try {
    // In a real app, you would get the current user ID from the session
    const currentUserId = "current-user"

    // Check if a conversation already exists between these users
    const participants = [currentUserId, participantId].sort()
    const existingConversation = await db.conversations.findByParticipants(participants)

    if (existingConversation) {
      return existingConversation
    }

    // Create a new conversation
    return await db.conversations.create(participants)
  } catch (error) {
    console.error("Failed to create conversation:", error)
    throw new Error("Failed to create conversation")
  }
}

/**
 * Get conversations with user details
 */
export async function getConversationsWithUsers(): Promise<Array<Conversation & { users: User[] }>> {
  try {
    // In a real app, you would get the current user ID from the session
    const currentUserId = "current-user"

    const conversations = await db.conversations.findAll(currentUserId)

    // Get all unique user IDs from conversations (excluding current user)
    const userIds = Array.from(
      new Set(conversations.flatMap((conv) => conv.participants.filter((id) => id !== currentUserId))),
    )

    // Fetch all users in one go
    const users = await db.users.findByIds(userIds)

    // Map users to conversations
    return await Promise.all(
      conversations.map(async (conv) => {
        // Get the other participants (excluding current user)
        const participantIds = conv.participants.filter((id) => id !== currentUserId)
        const participantUsers = users.filter((user) => participantIds.includes(user.id))

        // Get unread count
        const unreadCount = await db.messages.getUnreadCount(conv.id, currentUserId)

        // Add unread count to the first user (for display purposes)
        const usersWithUnread = participantUsers.map((user, index) =>
          index === 0 ? { ...user, unread: unreadCount } : user,
        )

        return {
          ...conv,
          users: usersWithUnread,
        }
      }),
    )
  } catch (error) {
    console.error("Failed to fetch conversations with users:", error)
    throw new Error("Failed to fetch conversations with users")
  }
}
