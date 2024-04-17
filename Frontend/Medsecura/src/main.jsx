// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "../app";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(
   <React.StrictMode>
        <NextUIProvider>
        <Router>
            <App />
            <ToastContainer />
        </Router>
        </NextUIProvider>
    </React.StrictMode>
);
