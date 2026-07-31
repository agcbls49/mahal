"use client";

import { useEffect, useState } from "react";
import { Transaction } from "../types/transaction";
import { MenuCard } from "./MenuCard";

import { CategoriesView } from "./CategoriesView";
import { AddTransaction } from "./AddTransaction";
import { UpdateTransaction } from "./UpdateTransaction";
import { DeleteTransaction } from "./DeleteTransaction";
import { SearchTransaction } from "./SearchTransaction";
import { Pagination } from "./Pagination";
import SortDate from "./SortDate";
import ResetView from "./ResetViewButton";
import DarkModeButton from "./DarkModeButton";

interface DarkModeProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export function TransactionsView({ isDarkMode, toggleDarkMode }: DarkModeProps) {
    const [data, setData] = useState<Transaction[]>([]);

    // Pagination feature
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(data.length / itemsPerPage);

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
                    {/* Menu Box */}
                    <div className="w-full max-w-3xl flex flex-col gap-4 "> 
                        <MenuCard isDarkMode={isDarkMode}>
                        <SearchTransaction onSearchTransaction={setData} onClearSearch={loadTransactions}/>
                        {/* Show the new transaction created */}
                        <div className="mt-2 inline-flex gap-2">
                            <span><DarkModeButton onClick={toggleDarkMode} isDarkMode={isDarkMode}/></span>
                            <span><SortDate onDateSearch={setData} isDarkMode={isDarkMode}/></span>
                            <span><Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={setCurrentPage} 
                                isDarkMode={isDarkMode}/>
                            </span>
                            <span><ResetView onReset={loadTransactions}/></span>
                            <span><AddTransaction onTransactionAdded={loadTransactions} isDarkMode={isDarkMode}/></span>
                        </div>
                    </MenuCard>
                    {/* Transactions Box */}
                    <div className={`w-full h-[37vh] rounded-2xl p-5 ${isDarkMode ? 'bg-darkpurple text-white transition-colors duration-300' : 'bg-cream text-black transition-colors duration-300'}`}>
                        <div className="h-full overflow-y-auto pr-2">
                            {/* Column Headers */}
                            <div className="grid grid-cols-[120px_1fr_120px_120px_100px] gap-4 font-bold pb-2 mb-3 text-lg tracking-wider border-b border-indigo-500">
                                <span>Amount</span>
                                <span>Description</span>
                                <span>Date</span>
                                <span>Category</span>
                                <span>Actions</span>
                            </div>
                            {/* Transactions View */}
                            <ul className="space-y-2 py-2">
                                {paginatedData.map((transaction: Transaction) => (
                                    <li key={transaction.id}
                                        className="grid grid-cols-[120px_1fr_120px_120px_100px] gap-4 items-center justify-between text-lg">
                                        <span>₱{transaction.amount.toLocaleString("en-PH")}</span>
                                        <span className="capitalize wrap-break-word">{transaction.description}</span>
                                        <span>
                                            {new Date(transaction.eventDate).toLocaleDateString("en-PH", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric"
                                            })}
                                        </span>
                                        <span>{transaction.categoryName}</span>
                                        {/* Actions Column */}
                                        <span className="flex items-center gap-2">
                                            {/* Update a transaction */}
                                            <UpdateTransaction 
                                                transaction = {transaction}
                                                onEditComplete={loadTransactions}
                                                isDarkMode={isDarkMode}
                                            />
                                            {/* Delete a transaction */}
                                            <DeleteTransaction 
                                                transactionId={transaction.id}
                                                onDeleteTransactionSuccess={loadTransactions}/>
                                        </span>
                                        
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Category Box */}
                <CategoriesView isDarkMode={isDarkMode}/>
            </div>
        </>
    );
}