"use client";

import { useState } from "react";
import { Pen } from "lucide-react";

type EditCategoryProps = {
    categoryId: number;
    onEditComplete: () => void;
}

export function UpdateCategory({ categoryId, onEditComplete }: EditCategoryProps) {
    // edit category button 
    const [open, setOpen] = useState(false);
    // edit category input
    const [categoryName, setCategoryName] = useState("");

    // function to call api and edit the category
    async function handleSubmit() {
        if (categoryName.trim() === "") {
            alert("Category name is required.");
            return;
        }

        const response = await fetch(`http://localhost:4000/categories/${categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            // prevent creating empty category
            body: JSON.stringify({ categoryName: categoryName.trim() }),
        });

        if (response.ok) {
            setCategoryName("");
            setOpen(false);
            onEditComplete();
        }
    }

    return (
        <>
            {/* Add category button */}
            <button
                onClick={() => setOpen(true)}
                className="w-10 h-10 flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-300 ease-in-out cursor-pointer">
                <Pen strokeWidth={3} className="w-5 h-5" />
            </button>

            {/* If button is clicked */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-xs">
                    <div className="bg-black rounded-xl p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
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