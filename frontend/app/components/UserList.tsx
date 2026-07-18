export async function UserList() {
    const response = await fetch("http://localhost:4000/api", {
        cache: "no-store",
    });

    const data = await response.json();

    return (
        // show id and category = example is: 1 (Food)
        <ul>
            {data.categories.map((category: { id: number; name: string; }) => (
                <li key={category.id}>
                    {category.id} ({category.name})
                </li>
            ))}
        </ul>
    );
}