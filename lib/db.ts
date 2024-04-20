import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

declare global {
    var prisma: PrismaClient | undefined;   // globally declare
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !=="production") globalThis.prisma = db;

// Global.this is done cos to stop hot reload (intizilizing prisma every time )