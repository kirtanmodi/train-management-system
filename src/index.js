import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appState from "./redux/store";

const { store, persistor } = appState();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
