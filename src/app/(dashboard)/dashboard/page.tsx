import { isAuthenticatedUser } from "@/lib/auth";
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
  Heading,
  Image,
  Eraser,
  Scissors,
  FileCheck,
  ArrowRight,
} from "lucide-react";

const dashboardCards = [
  {
    title: "Article Generator",
    description: "Generate high-quality articles with AI",
    icon: FileText,
    href: "/dashboard/article-generator",
    color: "bg-blue-500",
    usage: "5 articles today",
  },
  {
    title: "Blog Title Generator",
    description: "Create compelling blog titles",
    icon: Heading,
    href: "/dashboard/blog-title-generator",
    color: "bg-green-500",
    usage: "12 titles generated",
  },
  {
    title: "Image Generator",
    description: "Generate stunning images with AI",
    icon: Image,
    href: "/dashboard/image-generator",
    color: "bg-purple-500",
    usage: "3 images created",
  },
  {
    title: "Background Remover",
    description: "Remove backgrounds from images",
    icon: Eraser,
    href: "/dashboard/background-remover",
    color: "bg-orange-500",
    usage: "8 backgrounds removed",
  },
  {
    title: "Object Remover",
    description: "Remove objects from images",
    icon: Scissors,
    href: "/dashboard/object-remover",
    color: "bg-red-500",
    usage: "2 objects removed",
  },
  {
    title: "Resume Analyzer",
    description: "Analyze and improve resumes",
    icon: FileCheck,
    href: "/dashboard/resume-analyzer",
    color: "bg-indigo-500",
    usage: "1 resume analyzed",
  },
];

export default async function DashboardPage() {
  await isAuthenticatedUser();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what you can do today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Plan</CardTitle>
            <Heading className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Pro Plan</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Tools Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.title}
                className="group hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {tool.usage}
                  </div>
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
