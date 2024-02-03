import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
body {
  background-color: #f7f7f7;
  font-family: "Spoqa Han Sans Neo";
  //background-color: #101A28
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
a{
    text-decoration: none;
    color: inherit;
}
*{
    box-sizing: border-box;
}
input, textarea { 
  -moz-user-select: auto;
  -webkit-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
}
input:focus {
  outline: none;
}

button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

#components-layout-demo-custom-trigger .trigger {
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}


@media screen and (min-width:1024px) {
  body {
    overflow-y: scroll;
  }
}


.Toastify__toast-container--top-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

path {
  fill: currentColor
}

svg {
  width: current;
  height: current;
}

`;
