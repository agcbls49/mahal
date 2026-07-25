"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface AddCategoryProps {
    onCategoryAdded: () => void;
}

export function AddCategory({ onCategoryAdded }: AddCategoryProps) {
    // create category button 
    const [open, setOpen] = useState(false);
    // create category input
    const [categoryName, setCategoryName] = useState("");

    // function to call api and create the category
    async function handleSubmit() {
        const response = await fetch("http://localhost:4000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryName }),
        });

        if (response.ok) {
            setCategoryName("");
            setOpen(false);
            onCategoryAdded();
        }
    }

    return (
        <>
            {/* Add category button */}
            <button
                onClick={() => setOpen(true)}
                className="mt-5 w-full flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors">
                <Plus strokeWidth={3} className="w-5 h-5" />
                <span>Add a Category</span>
            </button>

            {/* If button is clicked */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-xs">
                    <div className="bg-black rounded-xl p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Add Category</h2>
                        {/* Input field gets the value */}
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full border-b rounded p-2 mb-4 focus:outline-none capitalize"
                            placeholder="Enter a category"
                        />
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