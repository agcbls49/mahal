"use client";
import { useState, useEffect } from "react";

import { Category } from "../types/categories";
import { Plus } from "lucide-react";

interface AddTransactionProps {
    onTransactionAdded: () => void;
}

export function AddTransaction({ onTransactionAdded }: AddTransactionProps) {
    // create transaction button 
    const [open, setOpen] = useState(false);
    // create transaction input
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionDescription, setTransactionDescription] = useState("");
    const [transactionEventDate, setTransactionEventDate] = useState("");
    const [transactionCategoryName, setTransactionCategoryName] = useState("");
    // get categories already created
    const [categories, setCategories] = useState<Category[]>([]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTransactionEventDate(event.target.value); // Returns "YYYY-MM-DD"
    };

    async function loadCategories() {
        const response = await fetch("http://localhost:4000/categories");
        const data = await response.json();
        setCategories(data.categories);
    }
        useEffect(() => {
        loadCategories();
    }, []);

    // function to call api and create the category
    async function handleSubmit() {
        const response = await fetch("http://localhost:4000/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: Number(transactionAmount),
                description: transactionDescription,
                eventDate: transactionEventDate,
                categoryId: Number(transactionCategoryName),
            }),
        });

        if (response.ok) {
            setTransactionAmount("");
            setTransactionDescription("");
            setTransactionEventDate("");
            setTransactionCategoryName("");
            setOpen(false);
            onTransactionAdded();
        }
    }

    return(
        <>
            <button
                onClick={() => setOpen(true)}
                className="mt-5 w-50 flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors">
                <Plus strokeWidth={3} className="w-5 h-5" />
                <span>Add a Transaction</span>
            </button>
            
            {/* If button is clicked */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-xs">
                    <div className="bg-black rounded-xl p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
                        {/* Input field gets the value */}
                        <input
                            type="number"
                            value={transactionAmount}
                            onChange={(e) => setTransactionAmount(e.target.value)}
                            className="w-full border-b rounded p-2 mb-4 capitalize focus:outline-none"
                            placeholder="Enter Amount"
                        />
                        <input
                            type="text"
                            value={transactionDescription}
                            onChange={(e) => setTransactionDescription(e.target.value)}
                            className="w-full border-b rounded p-2 mb-4 capitalize focus:outline-none"
                            placeholder="Enter Description"
                        />
                        <input
                            type="date"
                            value={transactionEventDate}
                            onChange={handleDateChange}
                            className="w-full border-b rounded p-2 mb-4 uppercase focus:outline-none"
                        />
                        <select
                            value={transactionCategoryName}
                            onChange={(e) => setTransactionCategoryName(e.target.value)}
                            className="w-full border-b rounded p-2 mb-4 focus:outline-none bg-black text-white"
                            >
                            <option value="">Select Category</option>

                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {/* Sets category it got from the input field */}
                        <div className="flex mt-3 space-x-5 justify-end">
                            <button className="w-20 h-10 font-bold bg-teal-500 hover:bg-teal-600 rounded-lg text-white"
                                onClick={handleSubmit}>
                                Save
                            </button>

                            <button className="w-20 h-10 font-bold bg-red-500 hover:bg-red-600 rounded-lg text-white"
                                onClick={() => setOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}