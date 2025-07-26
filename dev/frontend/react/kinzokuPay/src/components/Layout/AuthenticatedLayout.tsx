import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useState } from "react";

export function AuthenticatedLayout({
  children,
  onNavigate,
  onLogout,
}: {
  children: React.ReactNode;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <MobileNav onMenuClick={() => setMobileOpen(true)} />
      <div className="lg:flex">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
        <main className="flex-1 lg:ml-64 min-h-screen overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
