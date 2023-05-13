import {PrismaClient} from '@prisma/client'

// Best practice: https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
// Only one instance of PrismaClient is ever created during the lifetime of your application. (Singleton pattern)
declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;