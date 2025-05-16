"use server"

import { db } from "@/lib/db/mock-db"
import type { Message } from "@/lib/types"

/**
 * Get messages for a conversation
 */
export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  try {
    return await db.messages.findByConversation(conversationId)
  } catch (error) {
    console.error(`Failed to fetch messages for conversation ${conversationId}:`, error)
    throw new Error(`Failed to fetch messages for conversation ${conversationId}`)
  }
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(conversationId: string, text: string): Promise<Message> {
  try {
    // In a real app, you would get the current user ID from the session
    const currentUserId = "current-user"

    return await db.messages.create({
      conversationId,
      senderId: currentUserId,
      text,
    })
  } catch (error) {
    console.error(`Failed to send message in conversation ${conversationId}:`, error)
    throw new Error(`Failed to send message in conversation ${conversationId}`)
  }
}

/**
 * Mark all messages in a conversation as read
 */
export async function markConversationAsRead(conversationId: string): Promise<Message[]> {
  try {
    // In a real app, you would get the current user ID from the session
    const currentUserId = "current-user"

    return await db.messages.markAsRead(conversationId, currentUserId)
  } catch (error) {
    console.error(`Failed to mark conversation ${conversationId} as read:`, error)
    throw new Error(`Failed to mark conversation ${conversationId} as read`)
  }
}

/**
 * Get unread message count for a conversation
 */
export async function getUnreadMessageCount(conversationId: string): Promise<number> {
  try {
    // In a real app, you would get the current user ID from the session
    const currentUserId = "current-user"

    return await db.messages.getUnreadCount(conversationId, currentUserId)
  } catch (error) {
    console.error(`Failed to get unread count for conversation ${conversationId}:`, error)
    throw new Error(`Failed to get unread count for conversation ${conversationId}`)
  }
}
