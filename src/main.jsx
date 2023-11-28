// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { HashRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import AuthContextProvider from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <HashRouter>
  <BrowserRouter>
    <AuthContextProvider>
      <NextUIProvider darkmode="class">
        <App />
      </NextUIProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </HashRouter>
);
