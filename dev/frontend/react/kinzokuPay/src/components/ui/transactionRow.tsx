import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  PlusCircle,
} from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";
import { MoneyFlow } from "../../utils/types";
import { useAppSelector } from "../../store/hooks";

interface TransactionRowProps {
  transaction: MoneyFlow; // Needed to detect sent/received for transfers
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const { goToTransactionDetails } = useAppNavigation();
  const currentUserId = useAppSelector((state) => state.auth.user.id);
  // --- Determine transaction type icon & color
  const getTypeIcon = () => {
    switch (transaction.type) {
      case "add":
        return <PlusCircle className="w-5 h-5 text-green-400" />;
      case "request":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "transfer":
        return transaction.id === currentUserId ? (
          <ArrowUpRight className="w-5 h-5 text-red-400" /> // Sent
        ) : (
          <ArrowDownLeft className="w-5 h-5 text-green-400" /> // Received
        );
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  // --- Determine status icon
  const getStatusIcon = () => {
    switch (transaction.status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-slate-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  // --- Amount styling
  const getAmountColor = () => {
    if (transaction.type === "add") return "text-green-400";
    if (transaction.type === "transfer") {
      return transaction.from === currentUserId
        ? "text-red-400"
        : "text-green-400";
    }
    if (transaction.type === "request") return "text-yellow-400";
    return "text-slate-400";
  };

  const getAmountPrefix = () => {
    if (transaction.type === "add") return "+";
    if (transaction.type === "transfer") {
      return transaction.from === currentUserId ? "-" : "+";
    }
    if (transaction.type === "request") return "";
    return "";
  };

  // --- Description
  const getDescription = () => {
    if (transaction.description && transaction.description.trim() !== "") {
      return transaction.description;
    }

    switch (transaction.type) {
      case "add":
        return "Added Money";
      case "transfer":
        return transaction.from === currentUserId
          ? "Sent Money"
          : "Received Money";
      case "request":
        return "Money Request";
      default:
        return "Transaction";
    }
  };

  const formattedDate = new Date(transaction.createdAt).toLocaleString();

  return (
    <div
      onClick={() => goToTransactionDetails(transaction.id)}
      className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors border-b border-slate-800 last:border-b-0 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center">
          {getTypeIcon()}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <p className="text-white font-medium">{getDescription()}</p>
            {getStatusIcon()}
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <span>{formattedDate}</span>
            {transaction.from && <span>• from {transaction.from}</span>}
            {transaction.to && <span>• to {transaction.to}</span>}
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${getAmountColor()}`}>
          {getAmountPrefix()}₹{transaction.amount.toFixed(2)}
        </p>
        <p className="text-xs text-slate-500 capitalize">
          {transaction.status}
        </p>
      </div>
    </div>
  );
}
