"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockUsers, mockMessages } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Plus, Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"

export default function ConversationListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Prepare conversation data
  const conversations = useMemo(() => {
    return mockUsers.map((user) => {
      const messages = mockMessages[user.id] || []
      const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
      const hasUnread = user.unread && user.unread > 0

      return {
        user,
        lastMessage,
        hasUnread,
      }
    })
  }, [])

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return conversations
    }

    const query = debouncedSearchQuery.toLowerCase()
    return conversations.filter((conversation) => {
      const { user, lastMessage } = conversation

      // Search in user name
      if (user.name.toLowerCase().includes(query)) {
        return true
      }

      // Search in last message
      if (lastMessage && lastMessage.text.toLowerCase().includes(query)) {
        return true
      }

      // Search in last seen / timestamp
      if (user.lastSeen.toLowerCase().includes(query)) {
        return true
      }

      return false
    })
  }, [conversations, debouncedSearchQuery])

  // Set searching state based on query
  useEffect(() => {
    setIsSearching(searchQuery.length > 0)
  }, [searchQuery])

  // Highlight matching text in a string
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim() || !text.includes(query.toLowerCase())) {
      return text
    }

    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-primary/20 text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="container max-w-md mx-auto p-4 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <Link href="/users">
          <Button size="icon" className="rounded-full h-10 w-10">
            <Plus className="h-5 w-5" />
            <span className="sr-only">New conversation</span>
          </Button>
        </Link>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("pl-9 pr-9 bg-muted/30 border-muted transition-all", isSearching && "border-primary")}
        />
        {isSearching && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {/* Search results count */}
      {isSearching && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {filteredConversations.length} {filteredConversations.length === 1 ? "result" : "results"} for "
          {debouncedSearchQuery}"
        </div>
      )}

      {!isSearching && (
        <Badge variant="outline" className="bg-chat-light text-primary px-3 py-1 text-xs font-medium mb-4">
          {mockUsers.length} Conversations
        </Badge>
      )}

      {filteredConversations.length > 0 ? (
        <div className="space-y-3">
          {filteredConversations.map(({ user, lastMessage, hasUnread }) => (
            <Link href={`/chat/${user.id}`} key={user.id} className="block">
              <Card className={`conversation-card ${hasUnread ? "bg-chat-light/50" : "bg-card"}`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-background">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {hasUnread && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {user.unread}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-medium truncate ${hasUnread ? "text-primary font-semibold" : ""}`}>
                        {isSearching ? highlightMatch(user.name, debouncedSearchQuery) : user.name}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {lastMessage
                          ? isSearching
                            ? highlightMatch(
                                formatDistanceToNow(lastMessage.timestamp, { addSuffix: true }),
                                debouncedSearchQuery,
                              )
                            : formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })
                          : isSearching
                            ? highlightMatch(user.lastSeen, debouncedSearchQuery)
                            : user.lastSeen}
                      </span>
                    </div>

                    <div className="flex items-center mt-1">
                      {lastMessage ? (
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {lastMessage.senderId === "current-user" ? "You: " : ""}
                          {isSearching ? highlightMatch(lastMessage.text, debouncedSearchQuery) : lastMessage.text}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Start a conversation
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-medium mb-1">No conversations found</h3>
          <p className="text-sm text-muted-foreground mb-4">Try a different search term or start a new conversation</p>
          <Link href="/users">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
