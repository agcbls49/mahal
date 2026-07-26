import { Trash } from "lucide-react";

interface DeleteCategoryProps {
    categoryId: number;
    onDeleteCategorySuccess: () => void;
}

export function DeleteCategory({ categoryId, onDeleteCategorySuccess }: DeleteCategoryProps) {
    const handleDelete = async (e:React.MouseEvent) => {
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete?")) return;

        try {
            // use the delete from the express backend
            const response = await fetch(`http://localhost:4000/categories/${categoryId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                onDeleteCategorySuccess();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };
    return(
        <button className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-800 text-white rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleDelete}>
            <Trash strokeWidth={3} className="w-5 h-5" />
        </button>
    );
}