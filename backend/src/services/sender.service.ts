import prisma from "../config/database.js";
import { AppError } from "../errors/app-error.js";

interface CreateSenderInput {
  userId: string;
  email: string;
  name: string;
  etherealUser: string;
  etherealPassword: string;
}

export async function createSender(input: CreateSenderInput) {
  const user = await prisma.user.findUnique({
    where: {
      id: input.userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return prisma.sender.create({
    data: {
      userId: input.userId,
      email: input.email,
      name: input.name,
      etherealUser: input.etherealUser,
      etherealPassword: input.etherealPassword,
    },
  });
}

export async function getSenders(userId: string) {
  return prisma.sender.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}