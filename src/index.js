import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Redux Setup
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // for persisting data
import { store, persistor as persister } from "./store/store";

// subscribe

// subscribe this function is used for console the current state if there is no Redux extension there
store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
