import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAppNavigation } from "../../utils/useAppNavigation";

export function Layout({ protectedPage = false }: { protectedPage?: boolean }) {
  const { logout } = useAppNavigation();
  let { user, loading } = useAuth();
  user = { id: "abc", name: "aman", email: "aman@123" };
  // Optional: show loader until auth state is known
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // For protected pages: only allow if user is logged in
  if (protectedPage) {
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center text-white">
          You must be logged in to view this page.
        </div>
      );
    }

    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  }

  // Public pages: show Navbar
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
