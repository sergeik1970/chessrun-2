import { Action, combineReducers } from "redux";
import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from "react-redux";
import deals from "./slices/deals";
import auth from "./slices/auth";
import posts from "./slices/posts";

const rootReducer = combineReducers({
    deals,
    auth,
    posts,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

type DispatchFunc = () => AppDispatch;
export const useDispatch: DispatchFunc = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export const wrapper = createWrapper<AppStore>(makeStore);
