import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TUserAuth } from "../../../interface";

type TAuthState = {
  user: null | TUserAuth;
  token: null | string;
};

const userData = localStorage.getItem("user");
const tokenData = localStorage.getItem("accessToken");

const initialState: TAuthState = {
  user: userData ? JSON.parse(userData) : null,
  token: tokenData || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const getToken = (state: RootState) => state.auth.token;
export const getCurrentUser = (state: RootState) => state.auth.user;
