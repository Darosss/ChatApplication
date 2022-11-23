import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Router>
    <App />
  </Router>
);
serviceWorkerRegistration.register();

reportWebVitals();
