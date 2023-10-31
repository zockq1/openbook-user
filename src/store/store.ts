import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { chapterApi } from "./api/chapterApi";
import authReducer from "./slices/authSlice";
import keywordReducer from "./slices/keywordSlice";
import storage from "redux-persist/lib/storage";
import { topicApi } from "./api/topicApi";
import { noteApi } from "./api/noteApi";
import { authApi } from "./api/authApi";
import { questionApi } from "./api/questionApi";
import { timelineApi } from "./api/timelineApi";
import { jjhApi } from "./api/jjhApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["content", "auth", "keyword"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  keyword: keywordReducer,
  [chapterApi.reducerPath]: chapterApi.reducer,
  [topicApi.reducerPath]: topicApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
  [timelineApi.reducerPath]: timelineApi.reducer,
  [jjhApi.reducerPath]: jjhApi.reducer,
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
      questionApi.middleware,
      timelineApi.middleware,
      jjhApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
