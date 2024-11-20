import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import StoryblokProvider from "@/app/components/StoryblokProvider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Heorhii Mynko School",
  description: "The best english school in Ukraine",
  openGraph: {
    images: "/hms.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
const font = Inter({ weight: "300", subsets: ["cyrillic", "latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="uk">
        <body className={font.className}>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
