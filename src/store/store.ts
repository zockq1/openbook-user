import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { chapterApi } from "./api/chapterApi";
import authReducer from "./slices/authSlice";
import contentReducer from "./slices/contentSlice";
import storage from "redux-persist/lib/storage";
import { topicApi } from "./api/topicApi";
import { noteApi } from "./api/noteApi";
import { authApi } from "./api/authApi";
import { questionApi } from "./api/questionApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "content"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  content: contentReducer,
  [chapterApi.reducerPath]: chapterApi.reducer,
  [topicApi.reducerPath]: topicApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(
      chapterApi.middleware,
      topicApi.middleware,
      noteApi.middleware,
      authApi.middleware,
      questionApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
