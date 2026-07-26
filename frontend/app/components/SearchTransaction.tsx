"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Transaction } from "../types/transaction";

type SearchTransaction = {
    onSearchTransaction: (searchResults: Transaction[]) => void;
}

export function SearchTransaction({ onSearchTransaction }:SearchTransaction) {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!searchInput.trim()) return;

        try {
            const response = await fetch(`http://localhost:4000/transactions/${searchInput}`);

            if(response.ok) {
                const data = await response.json();
                console.log(data);

                if (onSearchTransaction) {
                    onSearchTransaction(data);
                }
            }
        }
        catch(e: any) {
            console.error("Error searching for transaction: ", e);
        }
    }
    return(
        <div>
            <form className="flex flex-row items-center gap-2" onSubmit={handleSubmit}>
                {/* Task name input */}
                <input
                    onChange={handleSearchInput}
                    value={searchInput}
                    placeholder="Search for a Transanction or Category"
                    className={`placeholder-gray-500 outline-none border-b border-white p-2 flex-1`}
                />
                <button
                    type="submit"
                    className="font-bold text-lg bg-teal-500 text-white px-2 py-2 hover:bg-teal-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap">
                    <Search/>
                </button>
            </form>
        </div>
    );
}