import "virtual:uno.css";
import "./pages/globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import DefaultLayout from "./layouts/default";
import HomePage from "./pages/index";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  </StrictMode>
);
