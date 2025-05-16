import { NextResponse } from "next/server"
import { getConversationMessages, sendMessage, markConversationAsRead } from "@/lib/actions/message-actions"

export async function GET(request: Request, { params }: { params: { conversationId: string } }) {
  try {
    const conversationId = params.conversationId
    const messages = await getConversationMessages(conversationId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { conversationId: string } }) {
  try {
    const conversationId = params.conversationId
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Message text is required" }, { status: 400 })
    }

    const message = await sendMessage(conversationId, text)
    return NextResponse.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { conversationId: string } }) {
  try {
    const conversationId = params.conversationId
    const messages = await markConversationAsRead(conversationId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error marking messages as read:", error)
    return NextResponse.json({ error: "Failed to mark messages as read" }, { status: 500 })
  }
}
