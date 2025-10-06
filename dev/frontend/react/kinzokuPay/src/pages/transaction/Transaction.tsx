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

        const fetched = response.data.transactions || [];
        const newTotal = response.data.total || 0;

        if (reset) {
          setTransactions(fetched);
          setSkip(fetched.length);
        } else {
          setTransactions((prev) => [...prev, ...fetched]);
          setSkip((prev) => prev + fetched.length);
        }

        setTotal(newTotal);

        const currentLength = reset
          ? fetched.length
          : transactions.length + fetched.length;
        setHasMore(fetched.length === LIMIT && currentLength < newTotal);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [activeFilter, searchTerm, skip, loading, transactions.length]
  );

  useEffect(() => {
    setSkip(0);
    fetchTransactions(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, searchTerm]);

  // Stats - convert from paise to rupees
  const totalSent = transactions
    .filter((t) => t.type === "sent")
    .reduce((s, t) => s + t.amount , 0);

  const totalReceived = transactions
    .filter((t) => t.type === "received")
    .reduce((s, t) => s + t.amount , 0);

  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((s, t) => s + t.amount , 0);

  const filters = [
    { id: "all", label: "All" },
    { id: "sent", label: "Sent" },
    { id: "received", label: "Received" },
    { id: "pending", label: "Pending" },
  ];

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-light text-white mb-2">Transactions</h1>
          <p className="text-slate-400">
            View and manage all your payment history.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-normal">
                Total Sent
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-semibold text-red-400 mb-1">
                ₹{totalSent.toFixed(2)}
              </div>
              <div className="flex items-center text-slate-500 text-xs">
                <TrendingDown className="w-3 h-3 mr-1" /> This period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-normal">
                Total Received
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-semibold text-green-400 mb-1">
                ₹{totalReceived.toFixed(2)}
              </div>
              <div className="flex items-center text-slate-500 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" /> This period
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-normal">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-semibold text-yellow-400 mb-1">
                ₹{pendingAmount.toFixed(2)}
              </div>
              <div className="text-slate-500 text-xs">
                {transactions.filter((t) => t.status === "pending").length}{" "}
                transactions
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-400 text-sm font-normal">
                Net Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div
                className={`text-2xl font-semibold mb-1 ${
                  totalReceived - totalSent >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ₹{Math.abs(totalReceived - totalSent).toFixed(2)}
              </div>
              <div className="flex items-center text-slate-500 text-xs">
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
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
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>

        {/* Transactions List */}
        <section className="space-y-3">
          {loading && transactions.length === 0 ? (
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-12 text-center">
                <p className="text-slate-400">Loading transactions...</p>
              </CardContent>
            </Card>
          ) : transactions.length > 0 ? (
            <>
              {transactions.map((t) => (
                <TransactionRow key={t._id} transaction={t} />
              ))}

              {/* Load More */}
              {hasMore && (
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    onClick={() => fetchTransactions()}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-white font-medium mb-2">
                  No transactions found
                </h3>
                <p className="text-slate-400 mb-6">
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
        </section>
      </div>
    </div>
  );
}
