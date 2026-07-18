import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
    schema: "./drizzle/schema.ts",
    /*
        npx drizzle-kit generate - creates SQL files from schema.ts (ex. ALTER, CREATE)
        npx drizzle-kit migrate - runs SQL files on the database. 
    */
    out: "./drizzle/migrations/",
    dialect: "postgresql",
    dbCredentials: {
        host: process.env.DATABASE_HOST!,
        port: parseInt(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_NAME!,
        ssl: false,
    },
    verbose: true,
    strict: true,
} satisfies Config;