import { ReactNode } from "react";

interface MenuCardProps {
    children: ReactNode;
}

export function MenuCard({ children }: MenuCardProps) {
    return(
        <div className="mt-1 w-full max-w-3xl bg-black rounded-2xl p-5">
            {children}
        </div>
    );
}