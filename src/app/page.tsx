import {
  ClientHeader,
  HeroSection,
  FeaturesSection,
  DemoSection,
  Footer,
} from "@/components/landing";

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
