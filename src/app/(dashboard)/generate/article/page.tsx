import { ArticleGeneratorClient } from "@/components/article/ArticleGeneratorClient";
import { isAuthenticatedUser } from "@/lib/auth";
import { FileText } from "lucide-react";

export default async function ArticleGeneratorPage() {
  await isAuthenticatedUser();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500 text-white">
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Article Generator</h1>
          <p className="text-muted-foreground">
            Generate high-quality articles with AI assistance
          </p>
        </div>
      </div>

      <ArticleGeneratorClient />
    </div>
  );
}
