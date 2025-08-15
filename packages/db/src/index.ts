
import { PrismaClient } from "./generated/prisma/index.js";

// Create a global Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =  new PrismaClient();



// Export the Prisma client
export { PrismaClient } from "./generated/prisma/index.js";

