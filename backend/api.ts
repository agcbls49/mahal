// import database config and user table from schema folder
import { db } from "./db";
import { categories, transactions } from "./drizzle/schema";
import { eq } from "drizzle-orm";

// import express data types and cors
import express, { Request, Response } from "express";
import cors from "cors";

async function main() {
    const app = express();

    // cors setup for Next.js
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());

    // GET ALL CATEGORIES (id and category) from the table
    app.get("/categories", async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await db.select().from(categories);
            res.json({ categories: data });
        } catch (e: any) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // GET ALL TRANSACTIONS
    app.get("/transactions", async (req: Request, res: Response): Promise<void> => {
        try {
            const rows = await db.select().from(transactions);
            res.json(rows);
        } catch (e: any) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // GET a SINGLE CATEGORY entry by id
    app.get("/categories/:id", async (req, res) => {
        const id = Number(req.params.id);

        try {
            const categoriesData = await db.select().from(categories);

            const category = categoriesData.find(c => c.id === id);

            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            return res.json(category);
        } catch (e: any) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // GET ALL TRANSACTIONS FOR ONE CATEGORY
    app.get("/transactions/categories/:id", async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        try {
            const transactionsData = await db.select().from(transactions).where(eq(transactions.categoryId, id));

            if (transactionsData.length === 0) {
                return res.status(404).json({ message: "Transaction not found" });
            }

            return res.json(transactionsData);
        } catch (e: any) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // GET a SINGLE TRANSACTION entry by id
    app.get("/transactions/:id", async (req, res) => {
        const id = Number(req.params.id);

        try {
            const transactionsData = await db.select().from(transactions);

            const transaction = transactionsData.find(t => t.id === id);

            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }

            return res.json(transaction);
        } catch (e: any) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
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