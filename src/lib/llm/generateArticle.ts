import openAi from "./openAi";

export async function generateArticle(title: string, length: string) {
  try {
    const wordCounts = {
      short: 500,
      medium: 1000,
      long: 2000,
      extended: 3000,
    };

    const wordCount = wordCounts[length as keyof typeof wordCounts] || 1000;

    const prompt = `Write a comprehensive article about "${title}". 
    
Requirements:
- Length: approximately ${wordCount} words
- Include a compelling title
- Structure with clear sections (Introduction, Main Content with subheadings, Conclusion)
- Write in a professional and engaging tone
- Include relevant examples and insights
- Make it informative and valuable for readers

Please format the article with proper markdown formatting including headings, bullet points, and emphasis where appropriate.`;

    const response = await openAi.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a professional content writer who creates high-quality, engaging articles on various topics. Always respond with well-structured, informative content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 4500,
    });

    const generatedContent = response.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No content generated from AI");
    }

    return {
      success: true,
      content: generatedContent,
    };
  } catch (error) {
    console.error("Error generating article:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate article",
    };
  }
}
