"use client"

import { useState } from "react"
import ChatSidebar from "./chat-sidebar"
import ChatArea from "./chat-area"
import type { User, Message } from "@/lib/types"
import { useMobile } from "@/hooks/use-mobile"

// Mock data
const mockUsers: User[] = [
  { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", lastSeen: "5m ago", unread: 3 },
  { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40", lastSeen: "2h ago", unread: 0 },
  { id: "3", name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", lastSeen: "1d ago", unread: 5 },
  { id: "4", name: "Sarah Williams", avatar: "/placeholder.svg?height=40&width=40", lastSeen: "Just now", unread: 0 },
  { id: "5", name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40", lastSeen: "3d ago", unread: 1 },
]

const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", senderId: "1", text: "Hey there! How are you?", timestamp: new Date(Date.now() - 3600000) },
    {
      id: "m2",
      senderId: "current-user",
      text: "I'm good, thanks! How about you?",
      timestamp: new Date(Date.now() - 3500000),
    },
    { id: "m3", senderId: "1", text: "Doing well! Just checking in.", timestamp: new Date(Date.now() - 3400000) },
  ],
  "2": [
    {
      id: "m4",
      senderId: "2",
      text: "Did you see the latest project update?",
      timestamp: new Date(Date.now() - 86400000),
    },
    { id: "m5", senderId: "current-user", text: "Yes, looks great!", timestamp: new Date(Date.now() - 85000000) },
  ],
  "3": [
    { id: "m6", senderId: "3", text: "Meeting at 3pm tomorrow?", timestamp: new Date(Date.now() - 172800000) },
    { id: "m7", senderId: "current-user", text: "Sure, I'll be there.", timestamp: new Date(Date.now() - 170000000) },
    { id: "m8", senderId: "3", text: "Great, see you then!", timestamp: new Date(Date.now() - 169000000) },
  ],
  "4": [
    {
      id: "m9",
      senderId: "4",
      text: "Just sent you the files you requested.",
      timestamp: new Date(Date.now() - 600000),
    },
  ],
  "5": [
    {
      id: "m10",
      senderId: "5",
      text: "Can we discuss the project next week?",
      timestamp: new Date(Date.now() - 259200000),
    },
    {
      id: "m11",
      senderId: "current-user",
      text: "Yes, Monday works for me.",
      timestamp: new Date(Date.now() - 250000000),
    },
  ],
}

export default function ChatInterface() {
  const [selectedUser, setSelectedUser] = useState<User | null>(mockUsers[0])
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMobile()

  const handleSendMessage = (text: string) => {
    if (!selectedUser || !text.trim()) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "current-user",
      text,
      timestamp: new Date(),
    }

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }))
  }

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex w-full h-screen bg-background">
      <ChatSidebar
        users={mockUsers}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      <ChatArea
        user={selectedUser}
        messages={selectedUser ? messages[selectedUser.id] || [] : []}
        onSendMessage={handleSendMessage}
        onToggleSidebar={toggleSidebar}
      />
    </div>
  )
}
