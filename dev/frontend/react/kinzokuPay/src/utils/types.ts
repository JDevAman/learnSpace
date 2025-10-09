import { JSX, ReactNode } from "react";

export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  label: string;
  icon: JSX.ElementType;
}

export interface SupportOption {
  icon: JSX.ElementType;
  title: string;
  description: string;
  availability: string;
  action: string;
  color: string;
}

export interface MoneyFlow {
  id: string;
  type: "transfer" | "request" | "add"; // transfer = send/receive, request, add = add money
  amount: number; // in paise
  status: "pending" | "success" | "failed" | "rejected" | "cancelled";
  from?: string; // userId or email (sender)
  to?: string; // userId or email (recipient)
  description?: string;
  expiresAt?: string; // only for requests
  createdAt: string;
  finalizedAt?: string | null;
}

export interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}
