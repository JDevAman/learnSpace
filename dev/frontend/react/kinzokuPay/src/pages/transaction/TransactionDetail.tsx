import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { Home, Receipt, ArrowRight } from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";

export function TransactionDetailsPage() {
  const { id } = useParams();
  const { goToDashboard, goToPayment, goToTransactions } = useAppNavigation();
  const [showAnimation, setShowAnimation] = useState(false);

  // Mock transaction fetch — replace with API later
  const transaction = {
    id: id,
    amount: 250.0,
    recipient: "sarah@example.com",
    description: "Freelance Payment",
    date: "Jan 15, 2025 at 2:30 PM",
    fee: 0.0,
    status: "completed",
    total: 250.0,
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 bg-cyan-500/10 rounded-full mb-6 transition-all duration-1000 ${
              showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <Receipt
              className={`w-12 h-12 text-cyan-400 transition-all duration-1000 delay-300 ${
                showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
          </div>

          <h1 className="text-3xl font-semibold text-white mb-2">
            Transaction Details
          </h1>
          <p className="text-slate-400">{transaction.description}</p>
        </div>

        {/* Transaction Card */}
        <Card
          className={`bg-slate-900/50 border-slate-800 mb-8 transition-all duration-1000 delay-500 ${
            showAnimation
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Transaction ID</span>
              <span className="text-white font-mono text-sm">
                {transaction.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Recipient</span>
              <span className="text-white">{transaction.recipient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Amount</span>
              <span className="text-white font-semibold">
                ${transaction.amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fee</span>
              <span className="text-white">${transaction.fee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date</span>
              <span className="text-white">{transaction.date}</span>
            </div>
            <div className="border-t border-slate-700 pt-4 flex justify-between">
              <span className="text-slate-400 font-medium">Total</span>
              <span className="text-cyan-400 font-semibold text-xl">
                ${transaction.total}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div
          className={`space-y-4 transition-all duration-1000 delay-700 ${
            showAnimation
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <Button
            variant="glow"
            className="w-full group"
            onClick={goToDashboard}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={goToPayment}>
              Send Again
            </Button>
            <Button variant="outline" onClick={goToTransactions}>
              <Receipt className="w-4 h-4 mr-2" />
              Back to Transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
