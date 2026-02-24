// app/lib/facebook.ts
export type FBPost = {
  id: string;
  message?: string;
  created_time?: string;
  permalink_url?: string;
  full_picture?: string;
};

type FBPostsResponse = {
  data: FBPost[];
};

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const TOKEN = process.env.FACEBOOK_PAGE_TOKEN;

// Keep fields minimal & stable
const FIELDS = "message,created_time,permalink_url,full_picture";

export async function getFacebookPosts(limit = 6): Promise<FBPost[]> {
  if (!PAGE_ID || !TOKEN) return [];

  const url =
    `https://graph.facebook.com/v25.0/${PAGE_ID}/posts` +
    `?fields=${encodeURIComponent(FIELDS)}` +
    `&limit=${limit}` +
    `&access_token=${encodeURIComponent(TOKEN)}`;

  const res = await fetch(url, { cache: "no-store" });
  const json = (await res.json()) as FBPostsResponse & { error?: any };

  if (!res.ok) {
    // surface helpful error in terminal, but don’t crash the whole page
    console.error("Facebook API error:", json);
    return [];
  }

  return Array.isArray(json?.data) ? json.data : [];
}