import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
body {
  background-color: #f2f5f9;
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

body{
  font-family: 'Nanum Gothic', sans-serif;
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

@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    src: local('Spoqa Han Sans Neo Bold'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2') format('woff2'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff') format('woff'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf') format('truetype');
}

@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    src: local('Spoqa Han Sans Neo Medium'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2') format('woff2'),
    url('./fonts/spoqa-han-sans/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff') format('woff'),
    url('./fonts/spoqa-han-sans/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf') format('truetype');
}

@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
    src: local('Spoqa Han Sans Neo Regular'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2') format('woff2'),
    url('./fonts/spoqa-han-sans/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff') format('woff'),
    url('./fonts/spoqa-han-sans/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf') format('truetype');
}

@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 300;
    src: local('Spoqa Han Sans Neo Light'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff2') format('woff2'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff') format('woff'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.ttf') format('truetype');
}

@font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 100;
    src: local('Spoqa Han Sans Neo Thin'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff2') format('woff2'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff') format('woff'),
    url('./fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.ttf') format('truetype');
}

@font-face {
    font-family: 'Giants-Inline';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Inline.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;
