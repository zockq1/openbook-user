import styled, { keyframes } from "styled-components";
import Layout from "../atoms/Layout";
import { Link } from "react-router-dom";
import Header from "../organisms/Header";
import NavigationBar from "../organisms/NavigationBar";

const Box = styled(Link)`
  position: relative;
  width: auto;
  height: 150px;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

const Progress = styled.div`
  display: flex;
  position: absolute;
  bottom: 12px;
  justify-content: flex-start;
  align-items: center;

  border-radius: 100px;
  padding: 0 5px;
  height: 20px;
  width: calc(100% - 24px);
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: inset ${({ theme }) => theme.shadow.defaultShadow};
`;

const Load = keyframes`
  0% { width: 0; }
  100% { width: var(--progress-width, 0); }
`;

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
  --progress-width: ${({ percentage }) => `${percentage}%`};
  animation: ${Load} 1s normal forwards;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.blue};
  height: 10px;
  width: 0;
`;

const progress = {
  total: 30,
  complete: 19,
};

function Main() {
  const { total, complete } = progress;
  return (
    <Layout>
      <Header />
      <Box to="jeong-ju-haeng">
        <Progress>
          <ProgressBar percentage={(complete / total) * 100} />
        </Progress>
      </Box>
      <NavigationBar />
    </Layout>
  );
}

export default Main;
