// Storyblok images are resized by Storyblok's own image service instead of
// Vercel Image Optimization, so they don't count against Vercel usage.
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://a.storyblok.com/") && !src.endsWith(".svg")) {
    return `${src}/m/${width}x0/filters:quality(${quality || 75})`;
  }
  // local files from /public are served as-is from the CDN
  return `${src}?w=${width}`;
}
