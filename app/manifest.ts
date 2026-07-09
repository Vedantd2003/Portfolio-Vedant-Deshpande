import type { MetadataRoute } from "next";
import { personal } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.name} — Full-Stack AI Developer`,
    short_name: personal.name,
    description: personal.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#030712",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
