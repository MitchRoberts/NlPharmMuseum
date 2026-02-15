import { extractAllImageUrlsFromRenderedHtml } from "@/app/lib/wpGalleryUrls";

export function getGalleryImagesFromPostContent(renderedHtml: string) {
  return extractAllImageUrlsFromRenderedHtml(renderedHtml);
}