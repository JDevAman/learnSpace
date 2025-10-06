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
import { useAppNavigation } from "../../utils/useAppNavigation";

export function DashboardPage() {
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

  const { goToPayment, goToTransactions } = useAppNavigation();

  return (
    <div className="min-h-screen w-full bg-black px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome Section */}
      <section>
        <h1 className="text-3xl font-light text-white mb-2">
          Welcome back, Alex
        </h1>
        <p className="text-slate-400 text-sm">
          Here's what's happening with your account today.
        </p>
      </section>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 shadow-md">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-slate-400 mb-2">Available Balance</p>
              <p className="text-4xl font-thin text-white mb-3">$12,847.50</p>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <DollarSign className="w-8 h-8 text-cyan-400" />
              </div>
              <Button variant="outline" size="sm" onClick={goToPayment}>
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-24 flex-col space-y-2 bg-slate-900/30 border-slate-800 hover:border-cyan-500/50"
            onClick={goToPayment}
          >
            <Send className="w-6 h-6 text-cyan-400" />
            <span>Send Money</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex-col space-y-2 bg-slate-900/30 border-slate-800 hover:border-cyan-500/50"
            onClick={goToPayment}
          >
            <Download className="w-6 h-6 text-cyan-400" />
            <span>Request Money</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex-col space-y-2 bg-slate-900/30 border-slate-800 hover:border-cyan-500/50"
            onClick={goToTransactions}
          >
            <Eye className="w-6 h-6 text-cyan-400" />
            <span>View Transactions</span>
          </Button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "This Month",
            value: "$4,250",
            change: "+8.2%",
            positive: true,
          },
          {
            title: "Sent",
            value: "$2,150",
            change: "-3.1%",
            positive: false,
          },
          {
            title: "Received",
            value: "$6,400",
            change: "+15.3%",
            positive: true,
          },
          {
            title: "Transactions",
            value: "47",
            change: "+12.0%",
            positive: true,
          },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white mb-1">
                {stat.value}
              </div>
              <div
                className={`flex items-center text-sm ${
                  stat.positive ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.positive ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                <span>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Recent Transactions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Recent Transactions
          </h2>
          <Button variant="outline" size="sm" onClick={goToTransactions}>
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
    </div>
  );
}
