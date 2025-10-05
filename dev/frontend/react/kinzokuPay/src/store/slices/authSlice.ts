import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: string; name: string; email: string } | null;
  signupEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  signupEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setSignupEmail(state, action: PayloadAction<string>) {
      state.signupEmail = action.payload;
    },
  },
});

export const { setUser, logout, setSignupEmail } = authSlice.actions;
export default authSlice.reducer;
