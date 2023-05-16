import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./styles/global-style";
import Header from "./components/Header";
import styled from "styled-components";

const BackGroundColor = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: -999;
  background-color: #e3e3e3;
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <BackGroundColor />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
