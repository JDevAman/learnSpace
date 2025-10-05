import { useCallback } from "react";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/authSlice";
import { api } from "./api";
import { useAppNavigation } from "./useAppNavigation";

export function useOAuth(backendUrl: string) {
  const dispatch = useAppDispatch();
  const { goToDashboard } = useAppNavigation();

  const handleOAuth = useCallback(
    (provider: "google" | "github") => {
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const url = `${backendUrl}/api/v1/auth/${provider}`;
      const popup = window.open(
        url,
        "_blank",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const listener = (event: MessageEvent) => {
        if (event.origin !== backendUrl) return;

        if (event.data.success) {
          (async () => {
            try {
              const res = await api.get("/api/v1/user/me");
              dispatch(setUser(res.data.user));
              goToDashboard();
            } catch (err) {
              console.error("OAuth login failed", err);
            }
          })();
          window.removeEventListener("message", listener);
        }
      };

      window.addEventListener("message", listener);
    },
    [backendUrl, dispatch, goToDashboard]
  );

  return { handleOAuth };
}
