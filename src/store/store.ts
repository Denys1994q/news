import { configureStore } from "@reduxjs/toolkit";

import newsSlice from '../slices/newsSlice'
import articleSlice from '../slices/articleSlice'

const store = configureStore({
    reducer: {
        newsSlice,
        articleSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch