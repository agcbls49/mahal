import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
    schema: "./drizzle/schema.ts",
    // where the migration files are going to be put

    /*  Migrations are needed as when the schema.ts is 
        changed the actual MySQL database still has the old structure */
    /*
        npx drizzle-kit generate - creates SQL files from schema.ts (ex. ALTER, CREATE)
        npx drizzle-kit migrate - runs SQL files on the database. 
    */
    out: "./drizzle/migrations/",
    dialect: "mysql",
    dbCredentials: {
        host: process.env.DATABASE_HOST!,
        port: parseInt(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_NAME!,
    },
    verbose: true,
    strict: true,
} satisfies Config;