"use client";
import { useState, useEffect } from "react";

import { Category } from "../types/categories";
import { Plus } from "lucide-react";

interface AddTransactionProps {
    onTransactionAdded: () => void;
    isDarkMode: boolean;
}

export function AddTransaction({ onTransactionAdded, isDarkMode }: AddTransactionProps) {
    // create transaction button 
    const [open, setOpen] = useState(false);
    // create transaction input
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionDescription, setTransactionDescription] = useState("");
    const [transactionEventDate, setTransactionEventDate] = useState("");
    const [transactionCategoryName, setTransactionCategoryName] = useState("");
    // get categories already created
    const [categories, setCategories] = useState<Category[]>([]);

    // clear all entries when close or save button is clicked
    function resetForm() {
        setTransactionAmount("");
        setTransactionDescription("");
        setTransactionEventDate("");
        setTransactionCategoryName("");
    }

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

    // function to call api and create the transaction
    async function handleSubmit() {
        if (transactionAmount.trim() === "" || transactionDescription.trim() === "" || transactionEventDate.trim() === "" || transactionCategoryName.trim() === "") {
            alert("All fields are required.");
            return;
        }

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
            resetForm();
            setOpen(false);
            onTransactionAdded();
        }
    }

    return(
        <>
            <button
                onClick={async () => {
                    // reload so that the newly added category shows up on the modal
                    await loadCategories();
                    setOpen(true);
                }}
                className="mt-4 w-35 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors">
                <Plus strokeWidth={3} className="w-5 h-5" />
                <span>Transaction</span>
            </button>
            
            {/* If button is clicked */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-xs">
                    <div className={`rounded-xl p-6 w-96 ${isDarkMode ? 'bg-darkpurple text-white' : 'bg-cream text-black'}`}>
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
                            className={`w-full border-b rounded p-2 mb-4 focus:outline-none ${isDarkMode ? 'bg-darkpurple text-white' : 'bg-cream text-black'}`}>
                            <option value="">Select Category</option>

                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {/* Sets category it got from the input field */}
                        <div className="flex mt-3 space-x-5 justify-end">
                            <button className="w-20 h-10 font-bold bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white"
                                onClick={handleSubmit}>
                                Save
                            </button>

                            <button className="w-20 h-10 font-bold bg-red-500 hover:bg-red-600 rounded-lg text-white"
                                onClick={() => { 
                                    resetForm();
                                    setOpen(false);
                                }}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}