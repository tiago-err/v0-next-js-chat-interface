import ChatPage from "@/components/chat-page"

export default function ChatPageRoute({ params }: { params: { userId: string } }) {
  return <ChatPage userId={params.userId} />
}
