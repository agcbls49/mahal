"use client";
import { useEffect, useState } from "react";

import { Category } from "../types/categories";
import { AddCategory } from "./AddCategory";
import { DeleteCategory } from "./DeleteCategory";
import { UpdateCategory } from "./UpdateCategory";

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
            <div className="font-bold pb-2 mb-3 text-lg tracking-wider border-b border-indigo-500">
                Categories
            </div>
            {/* Category Names */}
            <ul className="space-y-2 text-lg">
                {data.categories && data.categories.length > 0 ? (
                    data.categories.map((category: Category) => (
                        <li key={category.id}
                            className="flex items-center justify-between">
                            <span>{category.name}</span>
                            <span className="flex items-center gap-2">
                                {/* Update Category */}
                                <UpdateCategory 
                                    category={category} 
                                    onEditComplete={loadCategories}
                                />
                                {/* Delete Category */}
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
            <AddCategory onCategoryAdded={loadCategories}/>
        </div>
    );
}