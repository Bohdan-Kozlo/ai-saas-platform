import { prisma } from "@/lib/prisma";

export async function getDashboardData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        plan: true,
        generations: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const currentPlan = user.plan?.plan || "FREE";

    const generation = user.generations;
    const usage = {
      totalUsage: generation?.totalUsage || 0,
      articleUsage: generation?.articleUsage || 0,
      blogTitleUsage: generation?.blogTitleUsage || 0,
      imageUsage: generation?.imageUsage || 0,
      backgroundUsage: generation?.backgroundUsage || 0,
      objectRemoverUsage: generation?.objectRemoverUsage || 0,
      resumeAnalyzUsage: generation?.resumeAnalyzUsage || 0,
    };

    return {
      plan: currentPlan,
      usage,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      plan: "FREE",
      usage: {
        totalUsage: 0,
        articleUsage: 0,
        blogTitleUsage: 0,
        imageUsage: 0,
        backgroundUsage: 0,
        objectRemoverUsage: 0,
        resumeAnalyzUsage: 0,
      },
    };
  }
}
