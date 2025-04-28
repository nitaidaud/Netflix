import { execSync } from "child_process";
import dotenv from "dotenv";
import { PrismaClient } from "../../prisma/generated/test-client";

dotenv.config({ path: ".env.test" });

const prisma = new PrismaClient();

beforeAll(async () => {
  // Push schema to SQLite (in-memory or file-based)
  console.log("env:", process.env.DATABASE_URL);

  execSync("npx prisma db push", { stdio: "inherit" });
});

beforeEach(async () => {
  const tables = await prisma.$queryRawUnsafe<{ tablename: string }[]>(`
        SELECT tablename FROM pg_tables
        WHERE schemaname='public'
          AND tablename NOT IN ('_prisma_migrations');
      `);

  for (const { tablename } of tables) {
    try {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`,
      );
    } catch (err) {
      console.warn(`Failed to truncate table ${tablename}:`, err);
    }
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
