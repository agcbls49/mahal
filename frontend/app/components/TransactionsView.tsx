"use client";
import { useEffect, useState } from "react";

import { Transaction } from "../types/transaction";
import { CategoriesView } from "./CategoriesView";
import { AddTransaction } from "./AddTransaction";

export function TransactionsView() {
    const [data, setData] = useState<Transaction[]>([]);

    async function loadTransactions() {
        const response = await fetch("http://localhost:4000/transactions");
        const result = await response.json();
        setData(result);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <>
            {/* Added min-h-screen items-center justify-center p-4 to center both boxes */}
            <div className="flex min-h-screen items-center justify-center flex-col md:flex-row gap-10 p-4">
                
                {/* Transactions Box */}
                <div className="w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-black rounded-2xl p-5 text-white">
                    {/* Column Headers */}
                    <div className="grid grid-cols-4 gap-4 font-bold pb-2 mb-3 text-lg tracking-wider border-b border-teal-500">
                        <span>Amount</span>
                        <span>Description</span>
                        <span>Date</span>
                        <span>Category</span>
                    </div>
                    {/* Transactions View */}
                    <ul className="space-y-2">
                        {data.map((transaction: Transaction) => (
                            <li key={transaction.id} className="grid grid-cols-4 gap-4 items-center text-lg">
                                <span>₱{transaction.amount.toLocaleString("en-PH")}</span>
                                <span className="truncate capitalize">{transaction.description}</span>
                                <span>
                                    {new Date(transaction.eventDate).toLocaleDateString("en-PH", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                                <span>{transaction.categoryName}</span>
                            </li>
                        ))}
                    </ul>
                    <AddTransaction onTransactionAdded={loadTransactions}/>
                </div>

                {/* Category Box */}
                <CategoriesView/>
            </div>
        </>
    );
}