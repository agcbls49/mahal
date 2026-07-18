export async function UserList() {
    const response = await fetch("http://localhost:4000/api", {
        cache: "no-store",
    });

    const data = await response.json();

    return (
        <ul>
            {data.users.map((user: { id: number; name: string; email: string }) => (
                <li key={user.id}>
                    {user.name} ({user.email})
                </li>
            ))}
        </ul>
    );
}