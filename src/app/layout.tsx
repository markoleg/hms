import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import StoryblokProvider from "@/app/components/StoryblokProvider";
import { Roboto, Philosopher } from "next/font/google";
import clsx from "clsx";
import { Header } from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";


export const metadata: Metadata = {
  metadataBase: new URL("https://hms-english.com"),
  title: "HMS | Heorhii Mynko School",
  description: "HMS — це провідна школа англійської. Ми працюємо за комунікативною методикою, яка дозволяє швидко і ефективно засвоювати мову.",
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


export const revalidate = 3600; // Set revalidate time here (1 hour)

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
        <GoogleAnalytics gaId="G-NQQ9HE6MVF" />
      </html>
    </StoryblokProvider>
  );
}
