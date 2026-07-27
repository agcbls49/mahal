import { TransactionsView } from "./components/TransactionsView";

export default function Home() {
  return (
    <div className="caret-indigo-500 selection:bg-indigo-500 selection:text-white">
      <div className="min-h-screen items-center justify-center p-4">
        <TransactionsView/>
      </div>
    </div>
  );
}
