"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Transaction } from "../types/transaction";

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "../../datepicker.css";

type SortDateProps = {
    onDateSearch: (results: Transaction[]) => void;
    isDarkMode: boolean;
}

export default function SortDate({ onDateSearch, isDarkMode }: SortDateProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            loadTransactionsOnDate(date);
        }
    };

    async function loadTransactionsOnDate(date: Date) {
        // format as YYYY-MM-DD to match backend
        const formattedDate = date.toISOString().split("T")[0];

        const response = await fetch(`http://localhost:4000/transactions/date/${formattedDate}`);
        const result = await response.json();
        // don't overwrite selectedDate
        onDateSearch(result); 
    }

    return( 
        <div>
            <DatePicker 
                className={`mt-4 border border-indigo-500 rounded-md outline-none text-center text-lg max-w-40 ${isDarkMode ? 'bg-darkpurple text-white transition-colors duration-300' : 'bg-cream text-black transition-colors duration-300'}`}
                popperClassName="!important selection:bg-indigo-500"
                selected={selectedDate} 
                onChange={handleChange} 
                icon={<Calendar strokeWidth={2} className={`mt-4.5 ${isDarkMode ? 'text-white' : 'text-black'}`}/>}
                showIcon
                toggleCalendarOnIconClick
                closeOnScroll
            />
        </div>
    );
}