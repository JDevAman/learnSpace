import { useNavigate } from "react-router-dom";
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),
    goToSignIn: () => navigate("/auth/signin"),
    goToSignUp: () => navigate("/auth/signup"),
    goToDashboard: () => navigate("/dashboard"),
    goToPayment: () => navigate("/payment"),
    goToTransactions: () => navigate("/transaction"),
    goToSuccess: () => navigate("/success"),
    goToSupport: () => navigate("/support"),
    goToForgotPassword: () => navigate("/auth/forgot-password"),
    logout: () => navigate("/"),
  };
}
