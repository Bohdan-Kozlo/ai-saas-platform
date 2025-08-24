"use client";

import { useState, useCallback } from "react";
import { ImageConfiguration } from "@/components/image/ImageConfiguration";
import { GeneratedImage } from "@/components/image/GeneratedImage";
import { ImageGenerationState } from "@/lib/types";

export function ImageGeneratorClient() {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [isGenerating, setIsGenerating] = useState(false); // derived from action state updates

  const handleImageGenerated = useCallback((state: ImageGenerationState) => {
    if (state.imageUrl && state.success) {
      setImageUrl(state.imageUrl);
    }
    setIsGenerating(false);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <ImageConfiguration onImageGenerated={handleImageGenerated} />
      </div>
      <div>
        <GeneratedImage imageUrl={imageUrl} isGenerating={isGenerating} />
      </div>
    </div>
  );
}
