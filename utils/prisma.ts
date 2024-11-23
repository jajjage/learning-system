import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

prisma
  .$connect()
  .then(() => console.log("Successfully connected to the database"))
  .catch((e: any) => {
    console.error("Failed to connect to the database", e);
    process.exit(1);
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
