import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Form/InputField";
import { AuthCard } from "../../components/Card/AuthCard";
import { Github, ChromeIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAppNavigation } from "../../utils/useAppNavigation";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/authSlice";
import { TabButton } from "../../components/Button/TabButton";
import { api } from "../../utils/api";
import { openOAuthPopup } from "../../utils/oauthPopup";

type Tab = "signin" | "signup";

export function AuthPage() {
  const { goToDashboard, goToSignIn, goToSignUp, goHome } = useAppNavigation();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("signin");
  const dispatch = useAppDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Separate state per input to reduce unnecessary re-renders
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update active tab based on URL
  useEffect(() => {
    const tab: Tab = pathname.includes("signup") ? "signup" : "signin";
    setActiveTab(tab);
  }, [pathname]);

  // Memoized tab click handler
  const handleTabClick = useCallback(
    (tab: Tab) => {
      if (tab === activeTab) return;
      tab === "signin" ? goToSignIn() : goToSignUp();
      setActiveTab(tab);
    },
    [activeTab, goToSignIn, goToSignUp]
  );

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await api.post(`/api/v1/user/${activeTab}`, {
          userName: email,
          password,
          ...(activeTab === "signup" && {
            firstName,
            lastName,
            confirmPassword,
          }),
        });
        dispatch(setUser(res.data.user));
        goToDashboard();
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [
      activeTab,
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      dispatch,
      goToDashboard,
    ]
  );

  // Memoized card titles to avoid new objects each render
  const cardTitle = useMemo(
    () => (activeTab === "signin" ? "Welcome Back" : "Create Account"),
    [activeTab]
  );
  const cardSubtitle = useMemo(
    () =>
      activeTab === "signin"
        ? "Sign in to your account"
        : "Join KinzokuPay today",
    [activeTab]
  );

  // Memoized OAuth handlers
  const handleOAuth = useCallback(
    (provider: "google" | "github") => {
      const url = `${backendUrl}/api/v1/auth/${provider}`;
      openOAuthPopup(url, async () => {
        const res = await api.get("/api/v1/user/me");
        dispatch(setUser(res.data.user));
        goToDashboard();
      });
    },
    [backendUrl, dispatch, goToDashboard]
  );

  return (
    <div className="min-h-screen bg-black flex items-start justify-center p-8">
      <div className="w-full max-w-md">
        <div className="flex bg-slate-900/50 rounded-lg mb-8">
          <TabButton
            tab="signin"
            activeTab={activeTab}
            onClick={handleTabClick}
            label="Sign In"
          />
          <TabButton
            tab="signup"
            activeTab={activeTab}
            onClick={handleTabClick}
            label="Sign Up"
          />
        </div>

        <AuthCard title={cardTitle} subtitle={cardSubtitle}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  type="text"
                  label="First Name"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <InputField
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            )}

            <InputField
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {activeTab === "signup" && (
              <InputField
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              variant="glow"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : activeTab === "signin"
                ? "Sign In"
                : "Create Account"}
            </Button>

            {/* OAuth */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleOAuth("google")}
              >
                <ChromeIcon className="w-5 h-5 mr-2" /> Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleOAuth("github")}
              >
                <Github className="w-5 h-5 mr-2" /> GitHub
              </Button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={goHome}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Forgot Password ?
              </button>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
