import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <Logo size="lg" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Transform Your Content with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Power
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create stunning articles, generate captivating blog titles, produce
            amazing images, and enhance your content with our comprehensive AI
            toolkit. Fast, simple, and powerful.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                View Features
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
              No credit card required
            </div>
            <div>•</div>
            <div>Free trial included</div>
            <div>•</div>
            <div>Cancel anytime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
