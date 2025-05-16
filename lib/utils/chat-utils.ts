import type { Conversation, Message, User } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

/**
 * Format the last seen time
 */
export function formatLastSeen(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

/**
 * Get the other participant in a conversation (not the current user)
 */
export function getOtherParticipant(conversation: Conversation, currentUserId = "current-user"): string {
  return conversation.participants.find((id) => id !== currentUserId) || ""
}

/**
 * Get the last message in a conversation
 */
export function getLastMessage(messages: Message[]): Message | null {
  if (messages.length === 0) return null
  return messages[messages.length - 1]
}

/**
 * Get unread message count for a user in a conversation
 */
export function getUnreadCount(messages: Message[], userId = "current-user"): number {
  return messages.filter((msg) => msg.senderId !== userId && !msg.read).length
}

/**
 * Format a conversation for display
 */
export function formatConversationForDisplay(
  conversation: Conversation,
  users: User[],
  messages: Message[],
  currentUserId = "current-user",
): {
  id: string
  user: User
  lastMessage: Message | null
  unreadCount: number
} {
  const otherParticipantId = getOtherParticipant(conversation, currentUserId)
  const user = users.find((u) => u.id === otherParticipantId) as User
  const lastMessage = getLastMessage(messages)
  const unreadCount = getUnreadCount(messages, currentUserId)

  return {
    id: conversation.id,
    user,
    lastMessage,
    unreadCount,
  }
}
