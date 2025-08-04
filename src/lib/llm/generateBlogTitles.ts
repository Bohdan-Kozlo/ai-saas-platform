import openAi from "./openAi";

export async function generateBlogTitles(keyword: string, category: string) {
  try {
    const prompt = `Generate 10 creative and engaging blog titles about "${keyword}" in the "${category}" category.

Requirements:
- Each title should be catchy and click-worthy
- Include the keyword "${keyword}" naturally in most titles
- Make them SEO-friendly
- Vary the title styles (how-to, listicle, question, etc.)
- Keep titles between 40-60 characters when possible
- Make them relevant to the "${category}" category

Return the titles as a numbered list (1. Title, 2. Title, etc.)`;

    const response = await openAi.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a professional content marketer and SEO expert who creates compelling blog titles that drive traffic and engagement. Always respond with exactly 10 numbered titles.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 5000,
      temperature: 0.8,
    });

    const generatedContent = response.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No titles generated from AI");
    }

    const titles = generatedContent
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\./))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((title) => title.length > 0);

    if (titles.length === 0) {
      throw new Error("Could not parse generated titles");
    }

    return {
      success: true,
      titles: titles,
    };
  } catch (error) {
    console.error("Error generating blog titles:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate blog titles",
    };
  }
}
