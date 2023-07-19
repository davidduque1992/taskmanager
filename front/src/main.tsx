import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import App from "./App.tsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <CircularProgress />
          </div>
        }
      >
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
