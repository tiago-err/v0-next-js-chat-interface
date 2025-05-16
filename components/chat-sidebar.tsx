"use client"

import Link from "next/link"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ArrowLeft, Plus } from "lucide-react"

interface ChatSidebarProps {
  users: User[]
  selectedUser: User | null
  onSelectUser: (user: User) => void
  showBackButton?: boolean
  onBack?: () => void
}

export default function ChatSidebar({
  users,
  selectedUser,
  onSelectUser,
  showBackButton = false,
  onBack,
}: ChatSidebarProps) {
  return (
    <div className="flex flex-col w-full h-full border-r border-border bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border bg-chat-light/50">
        <div className="flex items-center gap-2">
          {showBackButton && onBack ? (
            <Button variant="ghost" size="icon" onClick={onBack} className="text-primary hover:text-primary/80">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to conversations</span>
            </Button>
          ) : null}

          <h2 className="text-lg font-semibold text-primary">Chats</h2>
        </div>

        <Link href="/users">
          <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
            <Plus className="h-5 w-5" />
            <span className="sr-only">New conversation</span>
          </Button>
        </Link>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <ul className="space-y-1">
          {users.map((user) => {
            const isActive = selectedUser?.id === user.id

            return (
              <li key={user.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2.5 h-auto rounded-lg transition-all",
                    isActive
                      ? "bg-chat-light border-l-4 border-primary text-primary font-medium"
                      : "hover:bg-chat-light/50",
                  )}
                  onClick={() => onSelectUser(user)}
                >
                  <div className="flex items-center w-full">
                    <Avatar className={cn("h-10 w-10 mr-3", isActive && "ring-2 ring-primary")}>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        {user.unread && user.unread > 0 && (
                          <Badge variant="default" className="ml-2 bg-primary">
                            {user.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.lastSeen}</p>
                    </div>
                  </div>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
