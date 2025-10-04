import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";
import transactionReducer from "./slices/transactionSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
    transaction: transactionReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
