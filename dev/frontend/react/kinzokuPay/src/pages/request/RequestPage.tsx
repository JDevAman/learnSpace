import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { Card, CardContent } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { ArrowUpRight, ArrowDownLeft, Check, X } from "lucide-react";
import {
  fetchRequestsAPI,
  acceptRequestAPI,
  rejectRequestAPI,
} from "../../api/requestService";
import {
  updateMoneyFlow,
  setMoneyFlows,
} from "../../store/slices/moneyFlowSlice";

export function RequestsPage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.user.id);
  const balance = useAppSelector((state: RootState) => state.moneyFlow.balance);
  const moneyFlows = useAppSelector((state: RootState) => state.moneyFlow.list);

  const [filter, setFilter] = useState<"all" | "incoming" | "outgoing">("all");
  const [loading, setLoading] = useState(false);

  // --- Fetch requests from API
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchRequestsAPI();
        // store only request-type flows in moneyFlowSlice
        dispatch(
          setMoneyFlows(data.map((req) => ({ ...req, type: "request" })))
        );
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  // --- Filtered requests
  const filteredRequests = useMemo(() => {
    const requests = moneyFlows.filter((t) => t.type === "request");
    if (filter === "all") return requests;
    return requests.filter((r) =>
      filter === "incoming" ? r.to === userId : r.from === userId
    );
  }, [moneyFlows, filter, userId]);

  const pendingCount = filteredRequests.filter(
    (r) => r.status === "pending"
  ).length;
  const totalRequested = filteredRequests.reduce((sum, r) => sum + r.amount, 0);

  // --- Handlers
  const handleAccept = async (id: string) => {
    try {
      await acceptRequestAPI(id);
      dispatch(updateMoneyFlow({ id, status: "success" }));
    } catch (err) {
      console.error("Accept failed:", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectRequestAPI(id);
      dispatch(updateMoneyFlow({ id, status: "rejected" }));
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await rejectRequestAPI(id); // same endpoint for simplicity
      dispatch(updateMoneyFlow({ id, status: "cancelled" }));
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">Requests</h1>
          <p className="text-slate-400">
            {pendingCount} pending · ₹{(totalRequested ).toFixed(2)} total
            requested
          </p>
        </div>
        <div className="text-slate-400">
          <span className="text-sm">Balance:</span>{" "}
          <span className="text-cyan-400 font-medium">
            ₹{(balance ).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-800 pb-2">
        {["all", "incoming", "outgoing"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`capitalize text-sm px-3 py-1 rounded-md ${
              filter === tab
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {loading ? (
          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="p-12 text-center text-slate-400">
              Loading requests...
            </CardContent>
          </Card>
        ) : filteredRequests.length === 0 ? (
          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="p-12 text-center text-slate-400">
              No {filter} requests found
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((req) => {
            const isIncoming = req.to === userId;
            const displayEmail = isIncoming ? req.from : req.to;

            return (
              <Card
                key={req.id}
                className="border-slate-800 bg-slate-900/40 flex justify-between items-center px-5 py-4"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      isIncoming
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {isIncoming ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{displayEmail}</p>
                    <p className="text-slate-400 text-sm">
                      {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg text-white font-semibold">
                    ₹{(req.amount ).toFixed(2)}
                  </p>
                  <p
                    className={`text-xs ${
                      req.status === "success"
                        ? "text-green-400"
                        : req.status === "pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {req.status}
                  </p>
                </div>

                {req.status === "pending" && (
                  <div className="flex gap-2 ml-4">
                    {isIncoming ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-400 border-green-400"
                          onClick={() => handleAccept(req.id)}
                        >
                          <Check className="w-4 h-4 mr-1" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-400 border-red-400"
                          onClick={() => handleReject(req.id)}
                        >
                          <X className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-400 border-red-400"
                        onClick={() => handleCancel(req.id)}
                      >
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RequestsPage;
