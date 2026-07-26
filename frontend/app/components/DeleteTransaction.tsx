import { Trash } from "lucide-react";

interface DeleteTransactionProps {
    transactionId: number;
    onDeleteTransactionSuccess: () => void;
}

export function DeleteTransaction({ transactionId, onDeleteTransactionSuccess}: DeleteTransactionProps) {
    const handleDelete = async (e:React.MouseEvent) => {
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete?")) return;

        try {
            // use the delete from the express backend
            const response = await fetch(`http://localhost:4000/transactions/${transactionId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                onDeleteTransactionSuccess();
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