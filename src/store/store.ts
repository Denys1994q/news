import { configureStore } from "@reduxjs/toolkit";

import newsSlice from '../components/cardsList/newsSlice'
// import randomPokemonsSlice from "../components/random-pokemons/randomPokemonsSlice";
// import searchPokemonsSlice from "../components/search/searchPokemonsSlice";

export const store = configureStore({
    reducer: {
        newsSlice
        // randomPokemonsSlice,
        // searchPokemonsSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
})