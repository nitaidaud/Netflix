import { PrismaClient } from "../../prisma/generated/test-client";

const prisma = new PrismaClient();

export async function createTestUser() {
  return await prisma.user.create({
    data: {
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "hashedpassword123",
    },
  });
}
