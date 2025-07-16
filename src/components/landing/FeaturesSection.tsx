import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Lightbulb,
  Image,
  Eraser,
  Scissors,
  FileSearch,
  ArrowRight,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Article Generator",
    description:
      "Create high-quality, engaging articles on any topic with AI-powered content generation.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Lightbulb,
    title: "Blog Title Generator",
    description:
      "Generate catchy, SEO-optimized blog titles that drive clicks and engagement.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Image,
    title: "Image Generator",
    description:
      "Transform text descriptions into stunning, unique images using advanced AI technology.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Eraser,
    title: "Background Remover",
    description:
      "Remove backgrounds from images instantly with precision and professional quality.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Scissors,
    title: "Image Object Remover",
    description:
      "Seamlessly remove unwanted objects from your images while maintaining natural look.",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    description:
      "Get detailed insights and suggestions to improve your resume and land your dream job.",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful AI Tools at Your Fingertips
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of AI-powered tools helps you create, edit,
            and optimize content faster than ever before.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`inline-flex p-3 rounded-lg ${feature.bgColor} w-fit mb-4`}
                  >
                    <IconComponent
                      className={`h-6 w-6 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                    />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                  >
                    Try it now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Lightning fast results
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All tools are optimized for speed and accuracy, delivering
            professional results in seconds, not hours.
          </p>
        </div>
      </div>
    </section>
  );
}
