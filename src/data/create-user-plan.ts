import { prisma } from "@/lib/prisma";

export async function createUserPlan(userId: string) {
  const userPlan = await prisma.plan.findFirst({
    where: {
      userId: userId,
    },
  });

  if (userPlan) {
    return userPlan;
  }

  const newUserPlan = await prisma.plan.create({
    data: {
      userId: userId,
      startedAt: new Date(),
    },
  });

  return newUserPlan;
}
