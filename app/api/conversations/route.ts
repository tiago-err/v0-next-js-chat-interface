import { NextResponse } from "next/server"
import { createOrGetConversation, getConversationsWithUsers } from "@/lib/actions/conversation-actions"

export async function GET() {
  try {
    const conversations = await getConversationsWithUsers()
    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { participantId } = await request.json()

    if (!participantId) {
      return NextResponse.json({ error: "Participant ID is required" }, { status: 400 })
    }

    const conversation = await createOrGetConversation(participantId)
    return NextResponse.json(conversation)
  } catch (error) {
    console.error("Error creating conversation:", error)
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 })
  }
}
