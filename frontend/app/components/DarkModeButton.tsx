import { Moon, Sun } from "lucide-react";

type DarkModeButtonProps = {
    isDarkMode: boolean;
    onClick: () => void;
};

export default function({ isDarkMode, onClick }: DarkModeButtonProps) {
    return(
        <button onClick={onClick}
            className="mt-4 w-25 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors">
            {isDarkMode ? <Moon strokeWidth={3} className="w-5 h-5"/> : <Sun strokeWidth={3} className="w-5 h-5"/> }
            <span>Mode</span>
        </button>
    );
}