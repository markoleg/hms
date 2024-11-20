import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import StoryblokProvider from "@/app/components/StoryblokProvider";

export const metadata: Metadata = {
  title: "Heorhii Mynko School",
  description: "The best english school in Ukraine",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="uk">
        <body>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
