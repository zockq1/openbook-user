import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./styles/global-style";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const BackGroundColor = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -999;
  background-color: #f2f5f9;
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BackGroundColor />
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
