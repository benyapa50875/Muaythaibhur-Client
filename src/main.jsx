import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
<ChakraProvider theme={theme}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </ChakraProvider>
);
