export async function UserList() {
    const response = await fetch("http://localhost:4000/transactions", {
        cache: "no-store",
    });

    const data = await response.json();

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            {/* Box */}
            <div className="w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-teal-500 rounded-2xl p-5 text-black">
                {/* Column Headers */}
                <div className="grid grid-cols-4 gap-4 font-bold border-b border-black/20 pb-2 mb-3 text-lg uppercase tracking-wider">
                    <span>Amount</span>
                    <span>Description</span>
                    <span>Date</span>
                    <span>Category</span>
                </div>

                <ul className="space-y-2">
                    {data.map((transaction: { id: number; amount: number; description: string; eventDate: string; categoryName: string }) => (
                        <li key={transaction.id} className="grid grid-cols-4 gap-4 items-center text-lg">
                            <span className="font-semibold">₱{transaction.amount.toLocaleString("en-PH")}</span>
                            <span className="truncate">{transaction.description}</span>
                            <span>
                                {new Date(transaction.eventDate).toLocaleDateString("en-PH", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}
                            </span>
                            <span>{transaction.categoryName}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}