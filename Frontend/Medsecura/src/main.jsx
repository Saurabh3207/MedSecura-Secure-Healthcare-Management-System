// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";
import Login from "./components/Login/Login";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
        <Login />
   
    </NextUIProvider>
  </React.StrictMode>,
);