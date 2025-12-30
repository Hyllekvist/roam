import { AfterClient } from "@/components/after/AfterClient";

export default function AfterPage({ params }: { params: { matchId: string } }) {
  return <AfterClient matchId={params.matchId} />;
}
