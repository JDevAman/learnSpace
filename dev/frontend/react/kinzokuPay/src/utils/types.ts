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

export interface Transaction {
  id: string;
  type: "sent" | "received" | "pending";
  amount: number;
  sender?: string;
  recipient?: string;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface PaymentPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export interface DashboardPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export interface AuthenticatedLayoutProps {
  children: ReactNode;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}
