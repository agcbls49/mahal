import { ReactNode } from "react";

// this is needed so that the add transaction button can be inside the menu card
interface MenuCardProps {
    children: ReactNode;
    isDarkMode: boolean;
}

export function MenuCard({ children, isDarkMode }: MenuCardProps) {
    return(
        <div className={`mt-1 w-full max-w-3xl rounded-2xl p-5 shadow-2xl ${isDarkMode ? 'bg-darkpurple transition-colors duration-300' : 'bg-cream transition-colors duration-300'}`}>
            {children}
        </div>
    );
}