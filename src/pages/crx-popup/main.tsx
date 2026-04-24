import "virtual:uno.css";
import "../globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import CrxPopup from "./index";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <CrxPopup />
  </StrictMode>
);
