import prisma from "../config/database.js";

interface CreateSenderInput {
  userId: string;
  email: string;
  name: string;
  etherealUser: string;
  etherealPassword: string;
}

export async function createSender(input: CreateSenderInput) {
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