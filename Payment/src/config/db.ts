import { prisma } from "../../prisma/prisma";

export const dbConnection = () => {
    const { DATABASE_URL} = process.env;
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is missing");
    }
  
    return prisma;
  };