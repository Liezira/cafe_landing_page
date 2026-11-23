import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMALL GAPS Coffee BSD | Daily Comfort Coffee & All-Day Dining",
  description:
    "A modern hideaway on the 2nd floor of Hotel Starlet BSD. Warm timber, dark industrial tones, 5-minute Gaps Latte, and easy WhatsApp table reservations.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14110F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh w-full overflow-x-hidden antialiased selection:bg-[#E5A970]/30 selection:text-[#FAF7F2]">
        {children}
      </body>
    </html>
  );
}
