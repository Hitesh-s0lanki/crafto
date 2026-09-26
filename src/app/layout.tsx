import { ClerkProvider } from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL

export const metadata: Metadata = {
  metadataBase: new URL(
    deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"
  ),
  title: {
    default: "Crafto — Build 3D games with AI",
    template: "%s · Crafto",
  },
  description:
    "Describe a game and watch it come to life. Crafto is an agentic three.js game builder that plans the scene, writes the code, and streams playable worlds from plain English.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Crafto — Build 3D games with AI",
    description: "Describe a game and watch it come to life with Crafto.",
    siteName: "Crafto",
    images: [
      {
        url: "/brand/crafto-og.png",
        width: 1200,
        height: 630,
        alt: "Crafto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafto — Build 3D games with AI",
    description: "Describe a game and watch it come to life with Crafto.",
    images: ["/brand/crafto-og.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ClerkProvider appearance={{ theme: shadcn }}>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
