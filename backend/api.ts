// import database config and user table from schema folder
import { db } from "./db";
import { users } from "./drizzle/schema";

// import express data types and cors
import express, { Request, Response } from "express";
import cors from "cors";

async function main() {
    const app = express();

    // cors setup for Next.js
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());

    // show all users from the table users
    app.get("/api", async (_req: Request, res: Response) => {
        const data = await db.select().from(users);
        res.json({ users: data });
    });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/api`);
    });
}

main().catch(err => {
    console.error("Startup Error:", err);
    process.exit(1);
});