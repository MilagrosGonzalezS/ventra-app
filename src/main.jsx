// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <NextUIProvider darkMode="class">
        <App />
    </NextUIProvider>
  </HashRouter>
);
