import type { MetadataRoute } from "next";
import { siteUrl } from "./helpers/siteUrl";

// Add /blog back here once it has real posts (it is noindex until then).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}/og-image.png`],
    },
  ];
}
