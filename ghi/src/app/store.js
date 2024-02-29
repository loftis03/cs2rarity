import { configureStore } from "@reduxjs/toolkit";

import { CS2Rarity } from "./apiSlice";
import searchReducer from "./searchSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        [CS2Rarity.reducerPath]: CS2Rarity.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(CS2Rarity.middleware),
});

setupListeners(store.dispatch);
