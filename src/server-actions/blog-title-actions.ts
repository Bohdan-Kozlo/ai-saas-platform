"use server";

import { generateBlogTitles } from "@/lib/llm/generateBlogTitles";
import { isAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlogTitleGenerationState } from "@/lib/types";

export async function generateBlogTitlesAction(
  prevState: BlogTitleGenerationState,
  formData: FormData
): Promise<BlogTitleGenerationState> {
  try {
    const { user } = await isAuthenticatedUser();

    const keyword = formData.get("keyword") as string;
    const category = formData.get("category") as string;

    if (!keyword || !category) {
      return {
        success: false,
        error: "Keyword and category are required",
        isGenerating: false,
      };
    }

    if (keyword.trim().length < 2) {
      return {
        success: false,
        error: "Keyword must be at least 2 characters long",
        isGenerating: false,
      };
    }
    const result = await generateBlogTitles(keyword, category);

    if (result.success && result.titles) {
      await prisma.generation.upsert({
        where: { userId: user.id },
        update: {
          totalUsage: { increment: 1 },
          blogTitleUsage: { increment: 1 },
        },
        create: {
          userId: user.id,
          totalUsage: 1,
          blogTitleUsage: 1,
        },
      });

      return {
        success: true,
        titles: result.titles,
        isGenerating: false,
      };
    } else {
      return {
        success: false,
        error: result.error || "Failed to generate blog titles",
        isGenerating: false,
      };
    }
  } catch (error) {
    console.error("Blog title generation action error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      isGenerating: false,
    };
  }
}
