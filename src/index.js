import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { AirlineProvider } from "./context/airline-context";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AirlineProvider>
      <App />
    </AirlineProvider>
  </StrictMode>,
  rootElement
);
