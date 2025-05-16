import type { User, Message } from "@/lib/types"

// Mock users data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "5m ago",
    status: "online",
    unread: 3,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "2h ago",
    status: "offline",
    unread: 0,
  },
  {
    id: "3",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "1d ago",
    status: "away",
    unread: 5,
  },
  {
    id: "4",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "Just now",
    status: "online",
    unread: 0,
  },
  {
    id: "5",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "3d ago",
    status: "offline",
    unread: 1,
  },
]

// Additional users for the user list page
export const allUsers: User[] = [
  ...mockUsers,
  {
    id: "6",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "4h ago",
    status: "online",
    unread: 0,
  },
  {
    id: "7",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "2d ago",
    status: "away",
    unread: 0,
  },
  {
    id: "8",
    name: "Olivia Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "1h ago",
    status: "online",
    unread: 0,
  },
  {
    id: "9",
    name: "James Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "3h ago",
    status: "offline",
    unread: 0,
  },
  {
    id: "10",
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "Just now",
    status: "online",
    unread: 0,
  },
]

// Mock messages data
export const mockMessages: Record<string, Message[]> = {
  "1": [
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
  ],
  "2": [
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
  ],
  "3": [
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
  ],
  "4": [
    {
      id: "m9",
      conversationId: "conv4",
      senderId: "4",
      text: "Just sent you the files you requested.",
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
  ],
  "5": [
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
  ],
}
