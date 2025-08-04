"use client";

import { useState } from "react";
import { ArticleConfiguration } from "@/components/article/ArticleConfiguration";
import { GeneratedArticle } from "@/components/article/GeneratedArticle";
import { ArticleGenerationState } from "@/lib/types";

export function ArticleGeneratorClient() {
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [currentTopic, setCurrentTopic] = useState<string>("");

  const handleContentGenerated = (state: ArticleGenerationState) => {
    if (state.success && state.content) {
      setGeneratedContent(state.content);
      setCurrentTopic("Generated Article");
    } else if (state.error) {
      setGeneratedContent("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Configuration */}
      <div>
        <ArticleConfiguration onContentGenerated={handleContentGenerated} />
      </div>

      {/* Right Column - Generated Article */}
      <div>
        <GeneratedArticle content={generatedContent} topic={currentTopic} />
      </div>
    </div>
  );
}
