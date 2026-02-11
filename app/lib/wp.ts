// app/lib/wp.ts
const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API_BASE;

if (!WP_API_BASE) {
  throw new Error("Missing NEXT_PUBLIC_WP_API_BASE in .env.local");
}

/**
 * WordPress.com REST types (minimal fields we actually use)
 */
export type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };

  // WordPress.com often provides this directly
  jetpack_featured_media_url?: string;

  // category IDs assigned to this post
  categories?: number[];
};

export type WPPage = {
  id: number;
  slug: string;
  parent: number;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
};

export type WPCategory = {
  id: number;
  name: string;
  slug: string;
};

async function wpFetch<T>(path: string): Promise<T> {
  const url = `${WP_API_BASE}${path}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`WP fetch failed ${res.status}: ${url}`);
  }
  return res.json() as Promise<T>;
}

/**
 * POSTS
 */
export async function getPosts(params?: Record<string, string | number | boolean | (string | number)[]>) {
  const usp = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (Array.isArray(v)) {
        usp.delete(k);
        for (const item of v) usp.append(k, String(item));
      } else {
        usp.set(k, String(v));
      }
    }
  }

  // helpful defaults
  if (!usp.has("per_page")) usp.set("per_page", "10");
  if (!usp.has("orderby")) usp.set("orderby", "date");
  if (!usp.has("order")) usp.set("order", "desc");

  if (!usp.has("_embed")) usp.set("_embed", "1");

  return wpFetch<WPPost[]>(`/posts?${usp.toString()}`);
}

export async function getPostBySlug(slug: string) {
  const posts = await wpFetch<WPPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=1`
  );
  return posts[0] ?? null;
}

export async function getPostsByCategorySlug(categorySlug: string, perPage = 3) {
  const cat = await getCategoryBySlug(categorySlug);
  if (!cat) return [];
  return getPosts({ categories: cat.id, per_page: perPage });
}

/**
 * PAGES (for building dropdown nav from parent/child)
 */
export async function getPages() {
  return wpFetch<WPPage[]>(`/pages?per_page=100&orderby=menu_order&order=asc&_embed=1`);
}

export async function getPageBySlug(slug: string) {
  const pages = await wpFetch<WPPage[]>(
    `/pages?slug=${encodeURIComponent(slug)}&_embed=1`
  );
  return pages[0] ?? null;
}

/**
 * CATEGORIES (so we can fetch News/Events/Exhibits by slug)
 */
export async function getCategories() {
  return wpFetch<WPCategory[]>(`/categories?per_page=100&orderby=name&order=asc`);
}

export async function getCategoryIdBySlug(slug: string) {
  const cats = await wpFetch<WPCategory[]>(
    `/categories?slug=${encodeURIComponent(slug)}`
  );
  return cats[0]?.id ?? null;
}

export async function getCategoryBySlug(slug: string) {
  const cats = await wpFetch<WPCategory[]>(
    `/categories?slug=${encodeURIComponent(slug)}`
  );
  return cats[0] ?? null;
}

/**
 * UTIL
 */
export function stripHtml(html: string) {
  // remove tags first
  const text = html.replace(/<[^>]+>/g, " ");

  // decode common HTML entities
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}


export function getPostImageUrl(post: WPPost) {
  return post.jetpack_featured_media_url ?? null;
}
