"use client";

import { useState } from "react";
import { AuthenticatedLayout } from "../../components/Layout/AuthenticatedLayout";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Form/InputField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card/Card";
import { TransactionRow } from "../../components/ui/transaction-row";
import { Search, Download, TrendingUp, TrendingDown } from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";

export function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "sent" | "received" | "pending"
  >("all");
  const { goToPayment } = useAppNavigation();
  const transactions = [
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
    {
      id: "4",
      type: "received" as const,
      amount: 2000.0,
      sender: "Acme Corp",
      description: "Salary payment",
      date: "3 days ago",
      status: "completed" as const,
    },
    {
      id: "5",
      type: "sent" as const,
      amount: 150.0,
      recipient: "Netflix",
      description: "Monthly subscription",
      date: "1 week ago",
      status: "completed" as const,
    },
    {
      id: "6",
      type: "sent" as const,
      amount: 45.2,
      recipient: "Uber",
      description: "Ride to airport",
      date: "1 week ago",
      status: "failed" as const,
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (transaction.sender &&
        transaction.sender.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.recipient &&
        transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      activeFilter === "all" ||
      transaction.type === activeFilter ||
      transaction.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: "all", label: "All Transactions" },
    { id: "sent", label: "Sent" },
    { id: "received", label: "Received" },
    { id: "pending", label: "Pending" },
  ];

  const totalSent = transactions
    .filter((t) => t.type === "sent" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalReceived = transactions
    .filter((t) => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <AuthenticatedLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-thin text-white mb-2">Transactions</h1>
          <p className="text-slate-400">
            View and manage all your payment history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-red-400 mb-1">
                ${totalSent.toFixed(2)}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                <TrendingDown className="w-3 h-3 mr-1" />
                <span>This month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-green-400 mb-1">
                ${totalReceived.toFixed(2)}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>This month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-yellow-400 mb-1">
                ${pendingAmount.toFixed(2)}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                <span>
                  {transactions.filter((t) => t.status === "pending").length}{" "}
                  transactions
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Net Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-semibold mb-1 ${
                  totalReceived - totalSent >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ${Math.abs(totalReceived - totalSent).toFixed(2)}
              </div>
              <div className="flex items-center text-slate-400 text-sm">
                {totalReceived - totalSent >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                <span>
                  {totalReceived - totalSent >= 0 ? "Positive" : "Negative"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <InputField
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id as any)}
                className={
                  activeFilter === filter.id
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                    : ""
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-white font-medium mb-2">
                  No transactions found
                </h3>
                <p className="text-slate-400 mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "You haven't made any transactions yet"}
                </p>
                <Button variant="glow" onClick={goToPayment}>
                  Make Your First Payment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Load More */}
        {filteredTransactions.length > 0 && (
          <div className="text-center">
            <Button variant="outline">Load More Transactions</Button>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
