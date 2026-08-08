import { db } from "../db";
import { transactions, categories } from "./schema";

async function seed() {
    console.log("Seeding database...");

    await db.delete(categories);
    await db.delete(transactions);
    
    await db.insert(categories).values([
        { id: 1, name: "Rent" },
        { id: 2, name: "Groceries" },
        { id: 3, name: "Healthcare" },
        { id: 4, name: "Transportation" },
        { id: 5, name: "Subscription" },
        { id: 6, name: "Gift" },
        { id: 7, name: "Gas" },
        { id: 8, name: "Data Plan" },
    ]);

    await db.insert(transactions).values([
        {id: 1, amount: 11500, description: "Apartment", eventDate: new Date("2026-07-01"), categoryId: 1},
        {id: 2, amount: 1340, description: "Grocery Shopping", eventDate: new Date("2026-07-15"), categoryId: 2},
        {id: 3, amount: 583, description: "Netflix + Spotify", eventDate: new Date("2026-07-05"), categoryId: 3},
        {id: 4, amount: 1000, description: "Dental Cleaning", eventDate: new Date("2026-07-28"), categoryId: 4},
        {id: 5, amount: 1020, description: "Gas + Parking", eventDate: new Date("2026-07-10"), categoryId: 5},
        {id: 6, amount: 11500, description: "Apartment", eventDate: new Date("2026-05-05"), categoryId: 1},
        {id: 7, amount: 2298, description: "Monthly Internet and Mobile Data", eventDate: new Date("2026-07-01"), categoryId: 8},
        {id: 8, amount: 200, description: "Birthday", eventDate: new Date("2026-08-08"), categoryId: 6},
        {id: 9, amount: 500, description: "Gas", eventDate: new Date("2026-06-09"), categoryId: 7},
    ]);

    console.log("Seed completed!");
};

// added for docker to work
seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });