"use client";

import { useState, useCallback } from "react";
import { BlogTitleConfiguration } from "@/components/blog-title/BlogTitleConfiguration";
import { GeneratedTitles } from "@/components/blog-title/GeneratedTitles";
import { BlogTitleGenerationState } from "@/lib/types";

export function BlogTitleGeneratorClient() {
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);

  const handleTitlesGenerated = useCallback(
    (state: BlogTitleGenerationState) => {
      if (state.success && state.titles) {
        setGeneratedTitles(state.titles);
      } else if (state.error) {
        setGeneratedTitles([]);
      }
    },
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Configuration */}
      <div>
        <BlogTitleConfiguration onTitlesGenerated={handleTitlesGenerated} />
      </div>

      {/* Right Column - Generated Titles */}
      <div>
        <GeneratedTitles titles={generatedTitles} />
      </div>
    </div>
  );
}
