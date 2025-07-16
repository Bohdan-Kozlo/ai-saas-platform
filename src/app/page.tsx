import { Metadata } from "next";
import {
  ClientHeader,
  HeroSection,
  FeaturesSection,
  DemoSection,
  Footer,
} from "@/components/landing";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ClientHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
      </main>
      <Footer />
    </div>
  );
}
