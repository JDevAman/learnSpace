import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { Home, Receipt, ArrowRight } from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";
import { api } from "../../utils/api"; // use your axios/api instance
import { Transaction } from "../../utils/types";

export function TransactionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { goToDashboard, goToPayment, goToTransactions } = useAppNavigation();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(`/transactions/${id}`);
        setTransaction(res.data);
      } catch (err) {
        console.error("Error fetching transaction", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();

    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (!transaction)
    return (
      <p className="text-white text-center mt-10">Transaction not found</p>
    );

  // Convert amount from paise to rupees
  const amountInRupees = (transaction.amount ).toFixed(2);
  const feeInRupees = (transaction.fee ).toFixed(2);
  const totalInRupees = (transaction.total ).toFixed(2);

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
          <p className="text-slate-400">
            {transaction.description || "No description"}
          </p>
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
                ₹{amountInRupees}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fee</span>
              <span className="text-white">₹{feeInRupees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date</span>
              <span className="text-white">
                {new Date(transaction.date).toLocaleString()}
              </span>
            </div>
            <div className="border-t border-slate-700 pt-4 flex justify-between">
              <span className="text-slate-400 font-medium">Total</span>
              <span className="text-cyan-400 font-semibold text-xl">
                ₹{totalInRupees}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Status</span>
              <span
                className={`font-semibold px-2 py-1 rounded-full text-sm capitalize ${
                  transaction.status === "completed"
                    ? "bg-green-500/20 text-green-400"
                    : transaction.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : transaction.status === "failed" ||
                      transaction.status === "rejected"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-slate-500/20 text-slate-300"
                }`}
              >
                {transaction.status}
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
            <Home className="w-4 h-4 mr-2" /> Back to Dashboard
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={goToPayment}>
              Send Again
            </Button>
            <Button variant="outline" onClick={goToTransactions}>
              <Receipt className="w-4 h-4 mr-2" /> Back to Transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
