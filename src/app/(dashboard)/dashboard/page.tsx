import { isAuthenticatedUser } from "@/lib/auth";
import { getDashboardData } from "@/data/get-dashboard-data";
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

export default async function DashboardPage() {
  const session = await isAuthenticatedUser();
  const dashboardData = await getDashboardData(session.user.id);

  const dashboardCards = [
    {
      title: "Article Generator",
      description: "Generate high-quality articles with AI",
      icon: FileText,
      href: "/article-generator",
      color: "bg-blue-500",
      usage: `${dashboardData.usage.articleUsage} articles generated`,
    },
    {
      title: "Blog Title Generator",
      description: "Create compelling blog titles",
      icon: Heading,
      href: "/blog-title-generator",
      color: "bg-green-500",
      usage: `${dashboardData.usage.blogTitleUsage} titles generated`,
    },
    {
      title: "Image Generator",
      description: "Generate stunning images with AI",
      icon: Image,
      href: "/image-generator",
      color: "bg-purple-500",
      usage: `${dashboardData.usage.imageUsage} images created`,
    },
    {
      title: "Background Remover",
      description: "Remove backgrounds from images",
      icon: Eraser,
      href: "/background-remover",
      color: "bg-orange-500",
      usage: `${dashboardData.usage.backgroundUsage} backgrounds removed`,
    },
    {
      title: "Object Remover",
      description: "Remove objects from images",
      icon: Scissors,
      href: "/object-remover",
      color: "bg-red-500",
      usage: `${dashboardData.usage.objectRemoverUsage} objects removed`,
    },
    {
      title: "Resume Analyzer",
      description: "Analyze and improve resumes",
      icon: FileCheck,
      href: "/resume-analyzer",
      color: "bg-indigo-500",
      usage: `${dashboardData.usage.resumeAnalyzUsage} resumes analyzed`,
    },
  ];

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
            <div className="text-2xl font-bold">
              {dashboardData.usage.totalUsage}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Plan</CardTitle>
            <Heading className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.plan} Plan</div>
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
