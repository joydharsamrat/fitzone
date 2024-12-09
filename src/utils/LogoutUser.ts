/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFromReducer } from "@reduxjs/toolkit";
import { AppDispatch } from "../redux/features/store";

export const logoutUser = async (
  dispatch: AppDispatch,
  logout: ActionFromReducer<AppDispatch>,
  clearRefreshToken: any
) => {
  dispatch(logout());
  await clearRefreshToken().unwrap();
};
