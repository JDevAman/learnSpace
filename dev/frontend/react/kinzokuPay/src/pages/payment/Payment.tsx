import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Form/InputField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Card/Card";
import { Send, Download, Eye, Plus } from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";
import { regex } from "../../../shared/validators";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToast } from "../../store/slices/uiSlice";
import { api } from "../../utils/api";
import { setAddMoneyAmount, setBalance } from "../../store/slices/paymentSlice";

export function PaymentPage() {
  const { goToSuccess } = useAppNavigation();
  const dispatch = useAppDispatch();
  const addMoneyAmount = useAppSelector(
    (state) => state.payment.addMoneyAmount
  );

  const [activeTab, setActiveTab] = useState<
    "pay" | "request" | "balance" | "add"
  >("pay");
  const [loading, setLoading] = useState(false);
  const balance = useAppSelector((state) => state.payment.balance);

  const [paymentData, setPaymentData] = useState({
    recipient: "",
    amount: "",
    note: "",
  });

  const [errors, setErrors] = useState({
    recipient: "",
    amount: "",
  });

  // Input validation
  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));

    if (field === "recipient") {
      if (!value.trim())
        setErrors((e) => ({ ...e, recipient: "Email is required" }));
      else if (!regex.email.test(value.trim()))
        setErrors((e) => ({ ...e, recipient: "Invalid email address" }));
      else setErrors((e) => ({ ...e, recipient: "" }));
    }

    if (field === "amount") {
      let sanitized = value.replace(/[^\d.]/g, "");
      const parts = sanitized.split(".");
      if (parts.length > 2) sanitized = parts[0] + "." + parts[1];
      if (parts[1]?.length > 2)
        sanitized = parts[0] + "." + parts[1].slice(0, 2);
      setPaymentData((prev) => ({ ...prev, amount: sanitized }));
      if (!sanitized)
        setErrors((e) => ({ ...e, amount: "Amount is required" }));
      else if (!regex.amount.test(sanitized))
        setErrors((e) => ({
          ...e,
          amount: "Enter a valid amount (up to 2 decimals)",
        }));
      else setErrors((e) => ({ ...e, amount: "" }));
    }
  };

  const handleAddMoneyChange = (value: string) => {
    // Sanitize input
    let sanitized = value.replace(/[^\d.]/g, "");
    const parts = sanitized.split(".");
    if (parts.length > 2) sanitized = parts[0] + "." + parts[1];
    if (parts[1]?.length > 2) sanitized = parts[0] + "." + parts[1].slice(0, 2);

    dispatch(setAddMoneyAmount(parseFloat(sanitized)));
  };

  const isFormValid =
    !errors.recipient &&
    !errors.amount &&
    paymentData.recipient.trim().length > 0 &&
    paymentData.amount.trim().length > 0;

  // Submit send/request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      dispatch(
        addToast({
          title: "Invalid input",
          description: "Please fix form errors before proceeding.",
          variant: "destructive",
        })
      );
      return;
    }

    setLoading(true);
    const endpoint =
      activeTab === "pay" ? "/payments/transfer" : "/payments/request";

    try {
      const payload = {
        ...paymentData,
        amount: Math.round(parseFloat(paymentData.amount) * 100),
      };
      await api.post(endpoint, payload);
      dispatch(
        addToast({
          title:
            activeTab === "pay"
              ? "Payment Sent Successfully"
              : "Request Sent Successfully",
          description:
            activeTab === "pay"
              ? `Money sent to ${paymentData.recipient}`
              : `Request sent to ${paymentData.recipient}`,
        })
      );
      goToSuccess();
      setPaymentData({ recipient: "", amount: "", note: "" });
    } catch (err: any) {
      dispatch(
        addToast({
          title: "Error",
          description:
            err.response?.data?.message ||
            "Something went wrong. Try again later.",
          variant: "destructive",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  // Check balance
  const handleCheckBalance = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/payments/balance");
      dispatch(setBalance(data.balance / 100)); // Redux updated
    } catch {
      dispatch(
        addToast({
          title: "Error",
          description: "Failed to fetch balance.",
          variant: "destructive",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  // Add money
  const handleAddMoney = async () => {
    if (!addMoneyAmount || isNaN(Number(addMoneyAmount))) return;
    setLoading(true);
    try {
      await api.put("/payments/add-money", {
        amount: Math.round(Number(addMoneyAmount) * 100),
      });
      dispatch(
        addToast({
          title: "Money Added",
          description: `₹${addMoneyAmount} added to your account.`,
        })
      );
      dispatch(setAddMoneyAmount(0));
      handleCheckBalance();
    } catch {
      dispatch(
        addToast({
          title: "Error",
          description: "Failed to add money.",
          variant: "destructive",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "pay", label: "Send Payment", icon: Send },
    { id: "request", label: "Request Money", icon: Download },
    { id: "add", label: "Add Money", icon: Plus },
  ];

  const ActiveIcon = tabs.find((tab) => tab.id === activeTab)?.icon;

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-light text-white mb-2">Payments</h1>
          <p className="text-slate-400">
            Send money, request payments, check balance, or add funds.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-900/50 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[100px] flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-400 shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Send / Request / Add */}
          <Card className="bg-slate-900/30 border-slate-800 lg:col-span-2 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                {ActiveIcon && (
                  <ActiveIcon className="w-5 h-5 mr-2 text-cyan-400" />
                )}
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeTab === "pay" || activeTab === "request" ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <InputField
                    type="email"
                    label={activeTab === "pay" ? "Send to" : "Request from"}
                    placeholder="Enter email"
                    value={paymentData.recipient}
                    onChange={(e) =>
                      handleInputChange("recipient", e.target.value)
                    }
                    error={errors.recipient}
                    required
                  />
                  <InputField
                    type="text"
                    label="Amount"
                    placeholder="0.00"
                    value={paymentData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    error={errors.amount}
                    required
                  />
                  <InputField
                    type="text"
                    label="Note (optional)"
                    placeholder="What's this for?"
                    value={paymentData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant={isFormValid ? "glow" : "default"}
                    className="w-full"
                    disabled={!isFormValid || loading}
                  >
                    {loading
                      ? "Processing..."
                      : activeTab === "pay"
                      ? `Send ₹${paymentData.amount || "0.00"}`
                      : `Request ₹${paymentData.amount || "0.00"}`}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6 py-4">
                  <InputField
                    type="number"
                    label="Add Money"
                    placeholder="0.00"
                    value={addMoneyAmount}
                    onChange={(e) => handleAddMoneyChange(e.target.value)}
                  />
                  <Button
                    onClick={handleAddMoney}
                    disabled={!addMoneyAmount || loading}
                    variant="glow"
                    className="w-full"
                  >
                    {loading
                      ? "Processing..."
                      : `Add ₹${addMoneyAmount || "0.00"}`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right: Balance Card */}
          <Card className="bg-slate-900/30 border-slate-800 lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Eye className="w-5 h-5 mr-2 text-cyan-400" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center space-y-6 py-8">
              <p className="text-5xl md:text-6xl font-thin text-cyan-400">
                ₹{balance !== null ? balance.toFixed(2) : "—"}
              </p>
              <Button
                onClick={handleCheckBalance}
                disabled={loading}
                variant="glow"
                className="w-full"
              >
                {loading ? "Fetching..." : "Refresh Balance"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
