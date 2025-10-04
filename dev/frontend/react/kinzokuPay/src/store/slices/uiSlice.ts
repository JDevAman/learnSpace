import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: string; name: string; email: string } | null;
  token?: string;
}

const initialState: AuthState = {
  user: null,
};

const uiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = undefined;
    },
  },
});

export const { setUser, setToken, logout } = uiSlice.actions;
export default uiSlice.reducer;
