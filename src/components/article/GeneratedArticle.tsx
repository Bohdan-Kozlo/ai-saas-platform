"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Download } from "lucide-react";

interface GeneratedArticleProps {
  content?: string;
  topic?: string;
}

export function GeneratedArticle({ content, topic }: GeneratedArticleProps) {
  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
    }
  };

  const handleDownload = () => {
    if (content) {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `article-${topic || "generated"}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generated Article
          </CardTitle>
          {content && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {content ? (
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {content}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No article generated yet</p>
            <p className="text-sm">
              Configure your article settings and click &quot;Generate
              Article&quot; to get started
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
