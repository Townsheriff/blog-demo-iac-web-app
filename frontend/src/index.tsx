import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.createElement("div");
const root = createRoot(container!);

document.body.append(container);

root.render(<App />);
