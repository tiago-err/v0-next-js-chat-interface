"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ChatSidebar from "./chat-sidebar"
import ChatArea from "./chat-area"
import ResponsiveChatLayout from "./layout/responsive-chat-layout"
import { mockUsers, mockMessages } from "@/lib/mock-data"
import type { User, Message } from "@/lib/types"
import { useMobile } from "@/hooks/use-mobile"

interface ChatPageProps {
  userId: string
}

export default function ChatPage({ userId }: ChatPageProps) {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages)
  const isMobile = useMobile()

  // Find the user based on the userId param
  useEffect(() => {
    const user = mockUsers.find((u) => u.id === userId) || null
    setSelectedUser(user)
  }, [userId])

  const handleSendMessage = (text: string) => {
    if (!selectedUser || !text.trim()) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      conversationId: `conv${selectedUser.id}`,
      senderId: "current-user",
      text,
      timestamp: new Date(),
      read: true,
    }

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }))
  }

  const handleSelectUser = (user: User) => {
    router.push(`/chat/${user.id}`)
  }

  const handleBack = () => {
    router.push("/")
  }

  // Sidebar component
  const sidebar = (
    <ChatSidebar
      users={mockUsers}
      selectedUser={selectedUser}
      onSelectUser={handleSelectUser}
      showBackButton={isMobile}
      onBack={handleBack}
    />
  )

  // Content component with toggleSidebar prop
  const content = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <ChatArea
      user={selectedUser}
      messages={selectedUser ? messages[selectedUser.id] || [] : []}
      onSendMessage={handleSendMessage}
      onToggleSidebar={toggleSidebar}
      onBack={handleBack}
    />
  )

  return <ResponsiveChatLayout sidebar={sidebar} content={content} isMobile={isMobile} />
}
