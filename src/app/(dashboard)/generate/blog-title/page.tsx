import { isAuthenticatedUser } from "@/lib/auth";
import { FileText } from "lucide-react";
import { BlogTitleGeneratorClient } from "@/components/blog-title/BlogTitleGeneratorClient";

export default async function BlogTitleGeneratorPage() {
  await isAuthenticatedUser();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-green-500 text-white">
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Blog Title Generator</h1>
          <p className="text-muted-foreground">
            Generate engaging and SEO-friendly blog titles with AI assistance
          </p>
        </div>
      </div>

      <BlogTitleGeneratorClient />
    </div>
  );
}
