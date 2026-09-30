import ChannelDetailPage from "../[id]/page";

export default function ChannelStaticPage() {
  return <ChannelDetailPage params={Promise.resolve({ id: "techinsights" })} />;
}
