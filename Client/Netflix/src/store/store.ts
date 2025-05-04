import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/auth.slice";
import profileReducer from "./slice/profile.slice";
import browseReducer from "./slice/movies.slice";
import modalReducer from "./slice/modal.slice";
import paymentReducer from "./slice/payment.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    movies: browseReducer,
    modal: modalReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
