import { ChatClient } from "@/components/chat/ChatClient";

export default function ChatPage({ params }: { params: { matchId: string } }) {
  return <ChatClient matchId={params.matchId} />;
}
