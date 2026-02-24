import { NextResponse } from "next/server";

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const TOKEN = process.env.FACEBOOK_PAGE_TOKEN;

// You can tweak fields later
const FIELDS =
  "message,created_time,permalink_url,full_picture,attachments{subattachments,media,type,url},from";

export async function GET() {
  if (!PAGE_ID || !TOKEN) {
    return NextResponse.json(
      { error: "Missing FACEBOOK_PAGE_ID or FACEBOOK_PAGE_TOKEN" },
      { status: 500 }
    );
  }

  const url =
    `https://graph.facebook.com/v19.0/${PAGE_ID}/posts` +
    `?fields=${encodeURIComponent(FIELDS)}` +
    `&limit=6` +
    `&access_token=${encodeURIComponent(TOKEN)}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Facebook API error", details: data },
      { status: res.status }
    );
  }

  // Return only what your frontend needs
  return NextResponse.json(data, { status: 200 });
}