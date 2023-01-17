import { configureStore } from "@reduxjs/toolkit";

import newsSlice from '../slices/newsSlice'
import articleSlice from '../slices/articleSlice'

export const store = configureStore({
    reducer: {
        newsSlice,
        articleSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
})