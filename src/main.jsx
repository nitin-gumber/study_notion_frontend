import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const store = configureStore({
  reducer: rootReducer,
});

// const helmetContext = {};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
);
