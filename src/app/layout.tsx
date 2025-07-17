import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI SaaS Platform - Transform Your Content with AI",
  description:
    "Create stunning articles, generate blog titles, produce amazing images, remove backgrounds, and analyze resumes with our comprehensive AI toolkit. Fast, simple, and powerful.",
  keywords: [
    "AI",
    "content creation",
    "article generator",
    "image generator",
    "background remover",
    "resume analyzer",
  ],
  openGraph: {
    title: "AI SaaS Platform - Transform Your Content with AI",
    description:
      "Create stunning articles, generate blog titles, produce amazing images, remove backgrounds, and analyze resumes with our comprehensive AI toolkit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
