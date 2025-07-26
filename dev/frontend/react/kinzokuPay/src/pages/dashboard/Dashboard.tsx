import { AuthenticatedLayout } from "../../components/Layout/AuthenticatedLayout";
import { Button } from "../../components/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card/Card";
import { TransactionRow } from "../../components/ui/transaction-row";
import {
  Send,
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import { DashboardPageProps } from "../../utils/types";

export function DashboardPage({ onNavigate, onLogout }: DashboardPageProps) {
  const recentTransactions = [
    {
      id: "1",
      type: "received" as const,
      amount: 1250.0,
      sender: "Sarah Chen",
      description: "Freelance project payment",
      date: "2 hours ago",
      status: "completed" as const,
    },
    {
      id: "2",
      type: "sent" as const,
      amount: 75.5,
      recipient: "Mike Johnson",
      description: "Dinner split",
      date: "1 day ago",
      status: "completed" as const,
    },
    {
      id: "3",
      type: "pending" as const,
      amount: 500.0,
      recipient: "Emily Davis",
      description: "Rent payment",
      date: "2 days ago",
      status: "pending" as const,
    },
  ];

  return (
    <AuthenticatedLayout onNavigate={onNavigate} onLogout={onLogout}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-thin text-white mb-2">
            Welcome back, Alex
          </h1>
          <p className="text-slate-400">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 mb-2">Available Balance</p>
                <p className="text-4xl font-thin text-white mb-4">$12,847.50</p>
                <div className="flex items-center text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-cyan-400" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate("payment")}
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 bg-slate-900/30 border-slate-800 hover:border-cyan-500/50"
              onClick={() => onNavigate("payment")}
            >
              <Send className="w-6 h-6 text-cyan-400" />
              <span>Send Money</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 bg-slate-900/30 border-slate-800 hover:border-cyan-500/50"
              onClick={() => onNavigate("payment")}
            >
              <Download className="w-6 h-6 text-cyan-400" />
              <span>Request Money</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 bg-slate-900/30 border-slate-800 hover:border-cyan-500/50"
              onClick={() => onNavigate("transactions")}
            >
              <Eye className="w-6 h-6 text-cyan-400" />
              <span>View Transactions</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white mb-1">
                $4,250
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+8.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white mb-1">
                $2,150
              </div>
              <div className="flex items-center text-red-400 text-sm">
                <TrendingDown className="w-3 h-3 mr-1" />
                <span>-3.1%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white mb-1">
                $6,400
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+15.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white mb-1">47</div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+12.0%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Recent Transactions
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("transactions")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
