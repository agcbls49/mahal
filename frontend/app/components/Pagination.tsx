import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isDarkMode: boolean;
}

export function Pagination({ currentPage, totalPages, onPageChange, isDarkMode }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-2 mt-5">
            {/* if on page 1 then disable the previous button */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-70 disabled:cursor-not-allowed">
                <ArrowLeft/>
            </button>

            <span className={`text-base text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed">
                <ArrowRight/>
            </button>
        </div>
    );
}