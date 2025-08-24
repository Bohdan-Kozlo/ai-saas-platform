"use client"

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, Download, Copy, Loader2 } from "lucide-react";

interface GeneratedImageProps {
  imageUrl?: string;
  isGenerating?: boolean;
}

export function GeneratedImage({
  imageUrl,
  isGenerating = false,
}: GeneratedImageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!imageUrl) return;
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "generated-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Generated Image
          </CardTitle>
          {imageUrl && !isGenerating && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? "Copied" : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Generating your image...</p>
            <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : imageUrl ? (
          <div className="relative">
            <Image
              src={imageUrl}
              alt="Generated"
              width={1024}
              height={1024}
              className="w-full h-auto rounded-lg border bg-muted object-cover"
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No image generated yet</p>
            <p className="text-sm">
              Describe your image and choose a style to generate a new picture
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
