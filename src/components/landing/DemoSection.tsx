import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

const processSteps = [
  {
    step: "1",
    title: "Choose Your Tool",
    description: "Select from our suite of AI-powered content creation tools",
  },
  {
    step: "2",
    title: "Input Your Requirements",
    description: "Provide simple instructions or upload your content",
  },
  {
    step: "3",
    title: "Get Instant Results",
    description: "Receive professional-quality output in seconds",
  },
];

export function DemoSection() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Stats Section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100"
          >
            Trusted by thousands
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built for Speed and Simplicity
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform is designed with a minimalist interface that
            prioritizes fast interaction and delivers results instantly.
          </p>
        </div>
        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-x-6" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
            >
              Start Creating Now
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              No setup required • Start in seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
