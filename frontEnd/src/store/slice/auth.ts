import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthType = {
  token: string | undefined;
  refreshToken: string | undefined;
  user: User | undefined;
};

const initialState: AuthType = { token: undefined, refreshToken: undefined, user: undefined };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: AuthType,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
    },
    setUser(state: AuthType, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state: AuthType) {
      state.user = undefined;
      state.refreshToken = undefined;
      state.token = undefined;
    },
  },
});

export default authSlice.reducer;