// import database config and user table from schema folder
import { db } from "./db";
import { categories, transactions } from "./drizzle/schema";

// import express data types and cors
import express, { Request, Response } from "express";
import cors from "cors";

async function main() {
    const app = express();

    // cors setup for Next.js
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());

    // show all categories (id and category) from the table
    app.get("/categories", async (_req: Request, res: Response) => {
        const data = await db.select().from(categories);
        res.json({ categories: data });
    });

    // GET all transactions
    app.get("/categories/transact", async (_req: Request, _res:Response) : Promise<void> => {
        try {
            const rows = await db.select().from(transactions);

            _res.json(rows);
        }
        catch (e:any) {
            console.log(e);
        }
    });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/categories`);
    });
}

main().catch(err => {
    console.error("Startup Error:", err);
    process.exit(1);
});