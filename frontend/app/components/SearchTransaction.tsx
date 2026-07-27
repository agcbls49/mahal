"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Transaction } from "../types/transaction";

type SearchTransaction = {
    onSearchTransaction: (searchResults: Transaction[]) => void;
    onClearSearch: () => void;
}

export function SearchTransaction({ onSearchTransaction, onClearSearch }: SearchTransaction) {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    // as user types the search will work accordingly
    // runs the search automatically as the user types, with a 300ms debounce
    useEffect(() => {
        // if empty, clear search and skip fetching
        if (searchInput.trim() === "") {
            onClearSearch();
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:4000/transactions/search/${searchInput}`);

                if (response.ok) {
                    const data = await response.json();
                    onSearchTransaction(data);
                }
            } catch (e: any) {
                console.error("Error searching for transaction: ", e);
            }
        }, 300); // wait 300ms after the user stops typing

        return () => clearTimeout(timeout); // cancel previous timer on every keystroke
    }, [searchInput]);

    return(
        <div>
            <form className="flex flex-row items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                    onChange={handleSearchInput}
                    value={searchInput}
                    placeholder="Search for a Transanction or Category"
                    className={`placeholder-gray-500 outline-none border-b border-indigo-500 p-2 flex-1`}
                />
                <button
                    type="submit"
                    className="font-bold text-lg bg-indigo-500 text-white px-2 py-2 hover:bg-indigo-600 rounded-md transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap">
                    <Search/>
                </button>
            </form>
        </div>
    );
}