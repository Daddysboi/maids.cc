import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";
import loginReducer from "./features/loginSlice";
import registerReducer from "./features/registerSlice";
import queryReducer from "./features/querySlice";
import serviceReducer from "./features/serviceSlice";
import modalReducer from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    register: registerReducer,
    service: serviceReducer,
    query: queryReducer,
    modal: modalReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.subtitle.$$typeof"],
      },
    }),
});
