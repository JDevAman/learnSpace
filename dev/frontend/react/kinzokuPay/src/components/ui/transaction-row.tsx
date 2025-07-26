import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from "lucide-react"
import { Transaction } from "../../utils/types"


interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const getStatusIcon = () => {
    switch (transaction.status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const getTypeIcon = () => {
    if (transaction.type === "sent") {
      return <ArrowUpRight className="w-5 h-5 text-red-400" />
    } else if (transaction.type === "received") {
      return <ArrowDownLeft className="w-5 h-5 text-green-400" />
    } else {
      return <Clock className="w-5 h-5 text-yellow-400" />
    }
  }

  const getAmountColor = () => {
    if (transaction.type === "sent") return "text-red-400"
    if (transaction.type === "received") return "text-green-400"
    return "text-yellow-400"
  }

  const getAmountPrefix = () => {
    if (transaction.type === "sent") return "-"
    if (transaction.type === "received") return "+"
    return ""
  }

  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors border-b border-slate-800 last:border-b-0">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center">{getTypeIcon()}</div>
        <div>
          <div className="flex items-center space-x-2">
            <p className="text-white font-medium">{transaction.description}</p>
            {getStatusIcon()}
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <span>{transaction.date}</span>
            {transaction.sender && <span>• from {transaction.sender}</span>}
            {transaction.recipient && <span>• to {transaction.recipient}</span>}
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${getAmountColor()}`}>
          {getAmountPrefix()}${transaction.amount.toFixed(2)}
        </p>
        <p className="text-xs text-slate-500 capitalize">{transaction.status}</p>
      </div>
    </div>
  )
}
