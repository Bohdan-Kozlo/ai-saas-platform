"use server";

import { generateArticle } from "@/lib/llm/generateArticle";
import { isAuthenticatedUser } from "@/lib/auth";

export interface ArticleGenerationState {
  success?: boolean;
  error?: string;
  content?: string;
  isGenerating?: boolean;
}

export async function generateArticleAction(
  prevState: ArticleGenerationState,
  formData: FormData
): Promise<ArticleGenerationState> {
  try {
    await isAuthenticatedUser();

    const topic = formData.get("topic") as string;
    const length = formData.get("length") as string;

    if (!topic || !length) {
      return {
        success: false,
        error: "Topic and length are required",
        isGenerating: false,
      };
    }

    if (topic.trim().length < 3) {
      return {
        success: false,
        error: "Topic must be at least 3 characters long",
        isGenerating: false,
      };
    }

    const result = await generateArticle(topic, length);

    if (result.success && result.content) {
      return {
        success: true,
        content: result.content,
        isGenerating: false,
      };
    } else {
      return {
        success: false,
        error: result.error || "Failed to generate article",
        isGenerating: false,
      };
    }
  } catch (error) {
    console.error("Article generation action error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      isGenerating: false,
    };
  }
}
