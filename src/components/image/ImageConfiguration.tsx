"use client";

import { useState, useActionState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ImageIcon,
  Palette,
  Camera,
  Brush,
  Shapes,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateImageAction } from "@/server-actions/image-action";
import { ImageGenerationState } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

const STYLES = [
  { id: "realistic", label: "Realistic", icon: Camera },
  { id: "anime", label: "Anime Style", icon: Sparkles },
  { id: "cartoon", label: "Cartoon Style", icon: Brush },
  { id: "fantasy", label: "Fantasy Style", icon: Palette },
  { id: "3d", label: "3D Style", icon: Shapes },
];

interface ImageConfigurationProps {
  onImageGenerated?: (state: ImageGenerationState) => void;
}

export function ImageConfiguration({
  onImageGenerated,
}: ImageConfigurationProps) {
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState<string>("realistic");

  const [state, action, isPending] = useActionState(generateImageAction, {
    success: false,
    error: undefined,
    imageUrl: undefined,
    isGenerating: false,
  });

  useEffect(() => {
    if (onImageGenerated && (state.success || state.error)) {
      onImageGenerated(state);
    }
  }, [state, onImageGenerated]);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Describe Your Image</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="A majestic dragon flying over snowy mountains at sunrise..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              className="min-h-[130px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Be as descriptive as possible for better results
            </p>
          </div>

          {/* Styles */}
          <div className="space-y-3">
            <Label>Style</Label>
            <div className="grid grid-cols-2 gap-3">
              {STYLES.map((s) => {
                const Icon = s.icon;
                const active = style === s.id;
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    disabled={isPending}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg border p-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                      active
                        ? "border-primary bg-primary/5"
                        : "hover:bg-accent",
                      isPending && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-md border text-muted-foreground bg-background transition-colors",
                        active && "border-primary text-primary bg-primary/10"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium">{s.label}</span>
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="style" value={style} />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!description || isPending}
          >
            {isPending && (
              <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {isPending ? "Generating..." : "Generate Image"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
