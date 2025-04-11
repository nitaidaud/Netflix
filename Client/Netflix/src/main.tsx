import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/query-client.ts";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </QueryClientProvider>,
);
