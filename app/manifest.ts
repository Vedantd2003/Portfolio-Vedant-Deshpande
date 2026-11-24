import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — AI Developer & Creative Technologist`,
    short_name: profile.name,
    description: profile.statement,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
