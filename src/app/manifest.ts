import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crafto — Build 3D games with AI",
    short_name: "Crafto",
    description: "Describe a game and watch it come to life with Crafto.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6857f5",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
