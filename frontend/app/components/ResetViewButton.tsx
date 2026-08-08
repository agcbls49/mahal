import { RotateCcw } from "lucide-react";

type ResetViewProps = {
    onReset: () => void;
}

export default function ResetView({ onReset }: ResetViewProps) {
    
    return(
        <button onClick={onReset} className="mt-4 w-25 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors">
            <RotateCcw strokeWidth={3} className="w-5 h-5"/>
            <span>View</span>
        </button>
    );
}