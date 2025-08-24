"use server";

import { isAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import openAi from "@/lib/llm/openAi";
import { ImageGenerationState } from "@/lib/types";

const STYLE_PROMPTS: Record<string, string> = {
  realistic: "highly detailed, photorealistic, 8k, natural lighting",
  anime: "vibrant anime illustration, clean lines, studio ghibli inspired",
  cartoon: "colorful cartoon illustration, bold outlines, flat shading",
  fantasy: "epic fantasy concept art, dramatic lighting, mystical atmosphere",
  "3d": "high quality 3D render, global illumination, octane render style",
};

export async function generateImageAction(
  prevState: ImageGenerationState,
  formData: FormData
): Promise<ImageGenerationState> {
  try {
    const { user } = await isAuthenticatedUser();

    const description = (formData.get("description") as string) || "";
    const style = (formData.get("style") as string) || "realistic";

    if (!description.trim()) {
      return {
        success: false,
        error: "Description is required",
        isGenerating: false,
      };
    }

    if (description.length < 5) {
      return {
        success: false,
        error: "Description must be at least 5 characters",
        isGenerating: false,
      };
    }

    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS["realistic"];

    const prompt = `${description}. Style: ${stylePrompt}`;

    const response = await openAi.images.generate({
      model: "imagen-4.0-fast-generate-001",
      prompt,
      size: "1024x1024",
      response_format: "b64_json",
      n: 1,
    });

    const imageData = response.data?.[0];
    let imageUrl: string | undefined;
    if (imageData?.url) {
      imageUrl = imageData.url;
    } else if (imageData?.b64_json) {
      imageUrl = `data:image/png;base64,${imageData.b64_json}`;
    }

    if (!imageUrl) {
      return {
        success: false,
        error: "Failed to generate image",
        isGenerating: false,
      };
    }

    await prisma.generation.update({
      where: { userId: user.id },
      data: {
        totalUsage: { increment: 1 },
        imageUsage: { increment: 1 },
      },
    });

    return {
      success: true,
      imageUrl,
      isGenerating: false,
    };
  } catch (error) {
    console.error("Image generation action error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      isGenerating: false,
    };
  }
}
