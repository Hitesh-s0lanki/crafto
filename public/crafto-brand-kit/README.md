# Crafto Logo Kit — Next.js

This folder is ready to copy into a Next.js project.

## Recommended files

- `public/logo.png` — default full transparent Crafto logo.
- `public/brand/crafto-logo-transparent.png` — full logo, transparent background.
- `public/brand/crafto-logo-transparent.webp` — smaller modern-browser version.
- `public/brand/crafto-icon.png` — icon-only transparent asset.
- `public/brand/crafto-wordmark.png` — wordmark-only asset.
- `public/brand/crafto-og.png` — 1200×630 social/Open Graph image.
- `public/favicon.ico` — multi-size favicon.
- `public/icons/apple-touch-icon.png` — iOS home-screen icon.
- `public/icons/icon-192.png` and `icon-512.png` — PWA/manifest icons.

## Next.js App Router

Copy the `public` folder into the root of your Next.js app.

Use the logo:

```tsx
import Image from "next/image";

export function CraftoLogo() {
  return (
    <Image
      src="/brand/crafto-logo-transparent.png"
      alt="Crafto"
      width={420}
      height={300}
      priority
    />
  );
}
```

For a compact navigation/header icon:

```tsx
<Image src="/brand/crafto-icon.png" alt="Crafto" width={40} height={40} />
```

## Metadata example

Add this to `app/layout.tsx`:

```tsx
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
```

## Notes

These assets are derived from the approved generated Crafto logo. PNG/WebP are production-ready raster assets. No fake vector SVG is included; converting a raster image into an SVG wrapper would not create a true scalable vector logo.
