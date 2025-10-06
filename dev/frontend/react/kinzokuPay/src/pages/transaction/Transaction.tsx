import { useEffect, useState, useCallback } from "react";
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
import { api } from "../../utils/api";

const LIMIT = 20;

export function TransactionsPage() {
  const { goToPayment } = useAppNavigation();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "sent" | "received" | "pending"
  >("all");
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await api.get("/transactions", {
          params: {
            filter: activeFilter,
            search: searchTerm,
            limit: LIMIT,
            skip: reset ? 0 : skip,
          },
        });

        // Backend should return { transactions: [], total: number }
        const fetched = response.data.transactions || [];

        if (reset) {
          setTransactions(fetched);
          setSkip(fetched.length);
        } else {
          setTransactions((prev) => [...prev, ...fetched]);
          setSkip((prev) => prev + fetched.length);
        }

        setTotal(response.data.total || 0);
        setHasMore(
          fetched.length > 0 &&
            (reset ? fetched.length : transactions.length + fetched.length) <
              response.data.total
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [activeFilter, searchTerm, skip, loading, transactions.length]
  );

  useEffect(() => {
    fetchTransactions(true); // reset on filter/search change
  }, [activeFilter, searchTerm]);

  // Stats
  const totalSent = transactions
    .filter((t) => t.type === "sent")
    .reduce((s, t) => s + t.amount, 0);
  const totalReceived = transactions
    .filter((t) => t.type === "received")
    .reduce((s, t) => s + t.amount, 0);
  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((s, t) => s + t.amount, 0);

  const filters = [
    { id: "all", label: "All" },
    { id: "sent", label: "Sent" },
    { id: "received", label: "Received" },
    { id: "pending", label: "Pending" },
  ];

  return (
    <div className="space-y-8 px-4 py-8 md:px-8 md:py-10 lg:px-12">
      <header>
        <h1 className="text-3xl font-light text-white mb-2">Transactions</h1>
        <p className="text-slate-400">
          View and manage all your payment history.
        </p>
      </header>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/30 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-red-400 mb-1">
              ₹{totalSent.toFixed(2)}
            </div>
            <div className="flex items-center text-slate-400 text-sm">
              <TrendingDown className="w-3 h-3 mr-1" /> This month
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/30 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm">
              Total Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-400 mb-1">
              ₹{totalReceived.toFixed(2)}
            </div>
            <div className="flex items-center text-slate-400 text-sm">
              <TrendingUp className="w-3 h-3 mr-1" /> This month
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/30 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-yellow-400 mb-1">
              ₹{pendingAmount.toFixed(2)}
            </div>
            <div className="text-slate-400 text-sm">
              {transactions.filter((t) => t.status === "pending").length}{" "}
              transactions
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/30 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-400 text-sm">Net Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-semibold mb-1 ${
                totalReceived - totalSent >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              ₹{Math.abs(totalReceived - totalSent).toFixed(2)}
            </div>
            <div className="flex items-center text-slate-400 text-sm">
              {totalReceived - totalSent >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {totalReceived - totalSent >= 0 ? "Positive" : "Negative"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <InputField
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
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
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Transactions List */}
      <section className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <TransactionRow key={t._id} transaction={t} />
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
                  : "You haven’t made any transactions yet"}
              </p>
              <Button variant="glow" onClick={goToPayment}>
                Make Your First Payment
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-4">
          <Button
            variant="outline"
            onClick={() => fetchTransactions()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
