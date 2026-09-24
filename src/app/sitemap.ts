import { site } from "@content";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const ROUTES = ["/", "/data/", "/data/thesis/", "/yoga/", "/about/", "/contact/"];

export default function sitemap(): MetadataRoute.Sitemap {
    return ROUTES.map((route) => ({ url: new URL(route, site.identity.url).toString() }));
}
