import "dotenv/config";
// Adapter PostgreSQL, doc : https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/postgresql
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});

export const prisma = new PrismaClient({
  adapter,
});
