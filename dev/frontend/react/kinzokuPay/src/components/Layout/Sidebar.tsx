import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CreditCard,
  History,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  ChevronUp,
  X,
} from "lucide-react";
import { cn } from "../../utils/utils";
import { Button } from "../Button/Button";
import { SidebarProps } from "../../utils/types";

const navigation = [
  { name: "Dashboard", href: "dashboard", icon: LayoutDashboard },
  { name: "Payment", href: "payment", icon: CreditCard },
  { name: "Transactions", href: "transactions", icon: History },
];

export function Sidebar({
  mobileOpen = false,
  setMobileOpen,
  onNavigate,
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main && window.innerWidth >= 1024) {
      main.style.marginLeft = collapsed ? "4rem" : "16rem";
    }
  }, [collapsed]);

  const handleNavClick = () => {
    setMobileOpen?.(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <div
        className={cn(
          "bg-slate-900/95 backdrop-blur-sm border-r border-slate-800 transition-all duration-300 flex flex-col",
          "lg:fixed lg:inset-y-0 lg:left-0 lg:z-30",
          collapsed ? "lg:w-16" : "lg:w-64",
          "fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw]",
          mobileOpen
            ? "flex translate-x-0"
            : "hidden lg:flex -translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 flex-shrink-0">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-cyan-500/10 rounded-lg">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="font-bold text-white">KinzokuPay</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="p-1.5 hidden lg:flex"
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen?.(false)}
                className="p-1.5 lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      onNavigate(item.href);
                      handleNavClick();
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors",
                      collapsed && "lg:justify-center"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className={cn(collapsed && "lg:hidden")}>
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-800 relative flex-shrink-0">
            <div
              className={cn(
                "",
                collapsed && "lg:flex lg:flex-col lg:items-center"
              )}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={cn(
                  "flex items-center w-full rounded-lg hover:bg-slate-800 transition-colors p-2",
                  collapsed ? "lg:justify-center" : "space-x-3"
                )}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div
                  className={cn(
                    "flex-1 min-w-0 text-left",
                    collapsed && "lg:hidden"
                  )}
                >
                  <p className="text-sm font-medium text-white truncate">
                    Alex Chen
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    alex@example.com
                  </p>
                </div>
                <ChevronUp
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform flex-shrink-0",
                    dropdownOpen && "rotate-180",
                    collapsed && "lg:hidden"
                  )}
                />
              </button>

              {dropdownOpen && (
                <div
                  className={cn(
                    "absolute bottom-full mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 min-w-[160px]",
                    collapsed
                      ? "lg:left-1/2 lg:transform lg:-translate-x-1/2"
                      : "left-4 right-4"
                  )}
                >
                  <div className="py-2">
                    <button
                      onClick={() => {
                        onNavigate("profile");
                        setDropdownOpen(false);
                        handleNavClick();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setDropdownOpen(false);
                        handleNavClick();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
