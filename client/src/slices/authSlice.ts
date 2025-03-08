import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        sessionStorage.setItem("token", action.payload);
      } else {
        sessionStorage.removeItem("token");
      }
    },
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
