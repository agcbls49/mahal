"use client";
import { useEffect, useState } from "react";

import { Category } from "../types/categories";
import { AddCategory } from "./AddCategory";
import { DeleteCategory } from "./DeleteCategory";
import { UpdateCategory } from "./UpdateCategory";

type CategoriesViewProps = {
    isDarkMode: boolean;
}

export function CategoriesView({ isDarkMode }: CategoriesViewProps) {
    const [data, setData] = useState<{ categories: Category[] }>({ categories: [] });

    async function loadCategories() {
        const response = await fetch("http://localhost:4000/categories");
        const result = await response.json();
        setData(result);
    }

    useEffect(() => {
        loadCategories();
    }, []);

return (
    <div
        className={`w-full max-w-70 h-125 rounded-2xl p-5 flex flex-col shadow-2xl ${
            isDarkMode
                ? "bg-darkpurple text-white transition-colors duration-300"
                : "bg-cream text-black transition-colors duration-300"
        }`}
    >
        <div className="font-bold pb-2 mb-3 text-lg tracking-wider border-b border-indigo-500">
            Categories
        </div>

        {/* Scrollable list */}
        <ul className="flex-1 overflow-y-auto pr-3 space-y-2 text-lg">
            {data.categories.length > 0 ? (
                data.categories.map((category) => (
                    <li
                        key={category.id}
                        className="flex items-center justify-between"
                    >
                        {/* so the long entries be shortened and would have ... */}
                        <span className="truncate">{category.name}</span>

                        <span className="flex items-center gap-2">
                            <UpdateCategory
                                category={category}
                                onEditComplete={loadCategories}
                                isDarkMode={isDarkMode}
                            />

                            <DeleteCategory
                                categoryId={category.id}
                                onDeleteCategorySuccess={loadCategories}
                            />
                        </span>
                    </li>
                ))
            ) : (
                <li className="text-gray-300 text-sm">No Categories</li>
            )}
        </ul>

        <AddCategory
            onCategoryAdded={loadCategories}
            isDarkMode={isDarkMode}
        />
    </div>
);
}