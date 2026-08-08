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
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
        ssl: false,
    },
    verbose: true,
    strict: true,
} satisfies Config;