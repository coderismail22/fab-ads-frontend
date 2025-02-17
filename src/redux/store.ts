import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";
import categoryReducer from "./slices/categorySlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer({ key: "auth", storage }, authReducer),
  data: dataReducer,
  category: categoryReducer,
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

export const persistor = persistStore(store);

// Define RootState & AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
