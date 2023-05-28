import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { chapterApi } from "./api/chapterApi";
import authReducer from "./slices/authSlice";
import quizReducer from "./slices/quizSlice";
import storage from "redux-persist/lib/storage";
import { topicApi } from "./api/topicApi";
import { noteApi } from "./api/noteApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "quiz"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  [chapterApi.reducerPath]: chapterApi.reducer,
  [topicApi.reducerPath]: topicApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(chapterApi.middleware, topicApi.middleware, noteApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
