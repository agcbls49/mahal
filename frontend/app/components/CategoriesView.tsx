"use client";
import { useEffect, useState } from "react";

import { Category } from "../types/categories";
import { AddCategory } from "./AddCategory";

export function CategoriesView() {
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
        <div className="w-full max-w-62.5 max-h-[80vh] overflow-y-auto bg-black rounded-2xl p-5 text-white">
            <div className="font-bold pb-2 mb-3 text-lg tracking-wider border-b border-teal-500">
                Categories
            </div>
            {/* Category Names */}
            <ul className="space-y-2 text-lg">
                {data.categories && data.categories.length > 0 ? (
                    data.categories.map((category: Category) => (
                        <li key={category.id}>
                            <span>{category.name}</span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-300 text-sm">No Categories</li>
                )}
            </ul>
            <AddCategory onCategoryAdded={loadCategories}/>
        </div>
    );
}