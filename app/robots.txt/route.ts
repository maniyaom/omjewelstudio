// app/robots.txt/route.ts
import { NextResponse } from "next/server";

export function GET() {
  const baseUrl = "https://www.omjewelstudio.co.in";

  const content = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
  `.trim();

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}