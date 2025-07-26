import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";

export default async function ArticleGeneratorPage() {
  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            This feature is currently under development. Stay tuned!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled>Generate Article</Button>
        </CardContent>
      </Card>
    </div>
  );
}
