import type React from "react";

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
import { Send, Download, Eye, ArrowRight, CheckCircle } from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";

export function PaymentPage() {
  const { goToSuccess } = useAppNavigation();
  const [activeTab, setActiveTab] = useState<"pay" | "request" | "balance">(
    "pay"
  );
  const [paymentData, setPaymentData] = useState({
    recipient: "",
    amount: "",
    note: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToSuccess();
  };

  const tabs = [
    { id: "pay", label: "Send Payment", icon: Send },
    { id: "request", label: "Request Money", icon: Download },
    { id: "balance", label: "Check Balance", icon: Eye },
  ];

  const ActiveIcon = tabs.find((tab) => tab.id === activeTab)?.icon;
  return (
    <AuthenticatedLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-thin text-white mb-2">Payments</h1>
          <p className="text-slate-400">
            Send money, request payments, or check your balance
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-900/50 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-400 shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Form */}
          <Card className="bg-slate-900/30 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                {ActiveIcon && (
                  <div className="w-5 h-5 mr-2 text-cyan-400">
                    <ActiveIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                )}
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeTab === "pay" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <InputField
                    type="email"
                    label="Send to"
                    placeholder="Enter email or username"
                    value={paymentData.recipient}
                    onChange={(e) =>
                      handleInputChange("recipient", e.target.value)
                    }
                    required
                  />

                  <InputField
                    type="number"
                    label="Amount"
                    placeholder="0.00"
                    value={paymentData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    required
                  />

                  <InputField
                    type="text"
                    label="Note (optional)"
                    placeholder="What's this for?"
                    value={paymentData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                  />

                  <Button type="submit" variant="glow" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send ${paymentData.amount || "0.00"}
                  </Button>
                </form>
              )}

              {activeTab === "request" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <InputField
                    type="email"
                    label="Request from"
                    placeholder="Enter email or username"
                    value={paymentData.recipient}
                    onChange={(e) =>
                      handleInputChange("recipient", e.target.value)
                    }
                    required
                  />

                  <InputField
                    type="number"
                    label="Amount"
                    placeholder="0.00"
                    value={paymentData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    required
                  />

                  <InputField
                    type="text"
                    label="Note (optional)"
                    placeholder="What's this for?"
                    value={paymentData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                  />

                  <Button type="submit" variant="glow" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Request ${paymentData.amount || "0.00"}
                  </Button>
                </form>
              )}

              {activeTab === "balance" && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Available Balance
                    </h3>
                    <p className="text-4xl font-thin text-cyan-400 mb-4">
                      $12,847.50
                    </p>
                    <p className="text-slate-400">Last updated: Just now</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <p className="text-slate-400 text-sm mb-1">Pending In</p>
                      <p className="text-green-400 font-semibold">$750.00</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <p className="text-slate-400 text-sm mb-1">Pending Out</p>
                      <p className="text-yellow-400 font-semibold">$125.50</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary/Info Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-slate-900/30 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Available Balance</span>
                  <span className="text-white font-semibold">$12,847.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">This Month Sent</span>
                  <span className="text-red-400 font-semibold">$2,450.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">This Month Received</span>
                  <span className="text-green-400 font-semibold">
                    $4,120.00
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Recipients */}
            <Card className="bg-slate-900/30 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Recent Recipients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "Sarah Chen",
                    email: "sarah@example.com",
                    avatar: "SC",
                  },
                  {
                    name: "Mike Johnson",
                    email: "mike@example.com",
                    avatar: "MJ",
                  },
                  {
                    name: "Emily Davis",
                    email: "emily@example.com",
                    avatar: "ED",
                  },
                ].map((recipient, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() =>
                      handleInputChange("recipient", recipient.email)
                    }
                  >
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-medium text-sm">
                        {recipient.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {recipient.name}
                      </p>
                      <p className="text-slate-400 text-sm truncate">
                        {recipient.email}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-medium text-sm mb-1">
                      Secure Transaction
                    </p>
                    <p className="text-slate-300 text-sm">
                      All payments are encrypted and protected by bank-level
                      security.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
