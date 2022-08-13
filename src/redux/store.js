import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import mainSlice from "./mainSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, mainSlice);

const appState = () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};

export default appState;

// import { configureStore } from "@reduxjs/toolkit";
// import mainSlice from "./mainSlice";

// export default configureStore({
//   reducer: {
//     counter: mainSlice,
//   },
// });
