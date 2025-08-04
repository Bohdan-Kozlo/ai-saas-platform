"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Check } from "lucide-react";
import { useState } from "react";

interface GeneratedTitlesProps {
  titles?: string[];
}

export function GeneratedTitles({ titles }: GeneratedTitlesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (title: string, index: number) => {
    try {
      await navigator.clipboard.writeText(title);
      setCopiedIndex(index);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleCopyAll = async () => {
    if (titles) {
      const allTitles = titles
        .map((title, index) => `${index + 1}. ${title}`)
        .join("\n");
      try {
        await navigator.clipboard.writeText(allTitles);
        setCopiedIndex(COPY_ALL_INDEX);
      } catch (error) {
        console.error("Failed to copy all:", error);
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generated Blog Titles
            {titles && titles.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {titles.length} titles
              </Badge>
            )}
          </CardTitle>
          {titles && titles.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              {copiedIndex === -1 ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  Copied All!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {titles && titles.length > 0 ? (
          <div className="space-y-3">
            {titles.map((title, index) => (
              <div
                key={index}
                className="group flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-start gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0 mt-0.5"
                    >
                      {index + 1}
                    </Badge>
                    <p className="text-sm leading-relaxed font-medium">
                      {title}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={() => handleCopy(title, index)}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No titles generated yet</p>
            <p className="text-sm">
              Enter a keyword, select a category, and click &quot;Generate Blog
              Titles&quot; to get started
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
