import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./styles/global-style";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
