import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./styles/global-style";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

function App() {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
