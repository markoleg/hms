import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

// Storyblok webhook target: https://hms-english.com/api/revalidate?secret=...
// Content changes rarely, so pages are cached long-term and refreshed here on publish.
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true });
}
