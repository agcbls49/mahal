"use client";

import { useState } from "react";
import { TransactionsView } from "./components/TransactionsView";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    setIsDarkMode(prev => {
      const next = !prev;

      // create a class list so that dark mode works for the entire 
      // page basically changing <html> to <html class="dark"> 
      // whenever the dark mode button is clicked
      if(next) {
        document.documentElement.classList.add("dark");
      }
      else {
        document.documentElement.classList.remove("dark");
      }

      return next;
    });
  }

  return (
    <div className="caret-indigo-500 selection:bg-indigo-500 selection:text-white">
      <div className="min-h-screen items-center justify-center p-4">
        <TransactionsView isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      </div>
    </div>
  );
}
