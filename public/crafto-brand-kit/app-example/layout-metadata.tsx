import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crafto",
  description: "Build games from your prompt.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "Crafto",
    description: "Build games from your prompt.",
    images: ["/brand/crafto-og.png"],
  },
};
