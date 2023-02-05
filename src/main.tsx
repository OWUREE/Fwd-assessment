import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

const Transactions = lazy(() => import("./Pages/ListTransactions"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<h1> Loading.... </h1>}>
        <Routes>
          <Route path="/list" element={<Transactions />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
