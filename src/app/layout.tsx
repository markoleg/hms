import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import StoryblokProvider from "@/app/components/StoryblokProvider";
import { Roboto, Philosopher } from "next/font/google";
import { Header } from "./components/Header/Header";
import clsx from "clsx";
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://hms-seven.vercel.app"),
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
const font = Roboto({ weight: "400", subsets: ["cyrillic", "latin"] });
const font2 = Philosopher({
  weight: "400",
  subsets: ["cyrillic", "latin"],
  variable: "--font-heads",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="uk">
        <body className={clsx(font.className, font2.variable)}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}
