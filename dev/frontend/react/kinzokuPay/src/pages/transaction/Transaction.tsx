import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Form/InputField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card/Card";
import { TransactionRow } from "../../components/ui/transaction-row";
import { Search, Filter, Download } from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";
import {
  exportTransactionsAPI,
  fetchTransactionsAPI,
} from "../../api/transactionService";
import {
  setTransactions,
  addTransaction,
  setLoading,
  setError,
} from "../../store/slices/transactionSlice";
import { useDebounce } from "../../utils/useDebounce";
import  saveAs  from "file-saver";

const LIMIT = 20;

export function TransactionsPage() {
  const dispatch = useAppDispatch();
  const { list: transactions, loading } = useAppSelector(
    (state: any) => state.transaction
  );
  const { goToPayment } = useAppNavigation();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "sent" | "received" | "pending"
  >("all");
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const statusOptions = ["all", "sent", "received", "pending"];

  // --- Fetch transactions
  const fetchTransactions = useCallback(
    async (pageNumber = 1) => {
      try {
        dispatch(setLoading(true));

        const params = {
          filter: activeFilter,
          search: debouncedSearchTerm,
          limit: LIMIT,
          skip: (pageNumber - 1) * LIMIT,
          from: fromDate,
          to: toDate,
        };

        const { transactions: fetched, total } = await fetchTransactionsAPI(
          params
        );

        dispatch(setTransactions(fetched));
        setTotal(total);
        setPage(pageNumber);
      } catch (err: any) {
        dispatch(setError(err?.message || "Failed to load transactions"));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [activeFilter, debouncedSearchTerm, dispatch, fromDate, toDate]
  );

  // Reset and refetch whenever filters/search change
  useEffect(() => {
    fetchTransactions(1);
  }, [activeFilter, debouncedSearchTerm, fromDate, toDate]);

  // --- Stats
  const totalSent = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "sent")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalReceived = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "received")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const pendingAmount = useMemo(
    () =>
      transactions
        .filter((t) => t.status === "pending")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  // --- Export button handler
  const handleExport = async () => {
    try {
      const data = await exportTransactionsAPI({
        filter: activeFilter,
        search: debouncedSearchTerm,
        from: fromDate,
        to: toDate,
      });

      // Trigger CSV download
      const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "transactions.csv");
    } catch (err) {
      console.error("Failed to export transactions:", err);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-light text-white mb-2">Transactions</h1>
          <p className="text-slate-400">
            View and manage all your payment history.
          </p>
        </header>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            <InputField
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-10 flex items-center justify-center"
            onClick={() => setShowFilterPanel((prev) => !prev)}
          >
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {showFilterPanel && (
          <Card className="bg-slate-900/20 border-slate-800 mt-2 p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <InputField
                type="date"
                value={fromDate ?? ""}
                onChange={(e) => setFromDate(e.target.value || null)}
                className="w-36 h-10"
              />
              <InputField
                type="date"
                value={toDate ?? ""}
                onChange={(e) => setToDate(e.target.value || null)}
                className="w-36 h-10"
              />
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as any)}
                className="bg-slate-800 text-white p-2 rounded border border-slate-700 h-10"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchTransactions(1)}
                className="h-10"
              >
                Show Records
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="h-10 flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-1" /> Export Records
              </Button>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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
            </CardContent>
          </Card>
        </div>

        {/* Transaction List */}
        <section className="space-y-3 mt-4">
          {loading ? (
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-12 text-center">
                <p className="text-slate-400">Loading transactions...</p>
              </CardContent>
            </Card>
          ) : transactions.length > 0 ? (
            <>
              {transactions.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))}

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchTransactions(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <span className="text-white px-2 py-1">
                  {page} / {Math.ceil(total / LIMIT)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchTransactions(page + 1)}
                  disabled={page === Math.ceil(total / LIMIT)}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-12 text-center">
                <h3 className="text-white font-medium mb-2">
                  No transactions found
                </h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your filters
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

export default TransactionsPage;
