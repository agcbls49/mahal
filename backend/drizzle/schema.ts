import { pgTable, serial, varchar, integer, date } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
});

export const transactions = pgTable("transactions", {
    id: serial("id").primaryKey(),
    amount: integer("amount").notNull(),
    description: varchar("description", { length: 255 }),
    eventDate: date("event_date", { mode: "date" }).notNull(),
    categoryId: integer("category_id")
        .notNull()
        .references(() => categories.id),
});