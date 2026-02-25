// app/components/FacebookFeed.tsx (SERVER component)
import FacebookFeedCarouselClient from "./FacebookFeedCarouselClient";
import { getFacebookPosts } from "@/app/lib/facebook";

export default async function FacebookFeed({ limit = 6 }: { limit?: number }) {
  const posts = await getFacebookPosts(limit);
  return <FacebookFeedCarouselClient posts={posts} />;
}