import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginComponent from "./components/LoginComponent";


const container = document.getElementById("root");
const productsComponent = createRoot(container);
productsComponent.render(
  <div>
    <LoginComponent />
  </div>
);