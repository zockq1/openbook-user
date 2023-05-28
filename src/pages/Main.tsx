import styled from "styled-components";
import QuestionCount from "../components/QuestionCount";
import DounutChart from "../components/DounutChart";
import List from "../components/Common/List";

const Ad = styled.li`
  position: relative;
  height: 150px;
  width: 100%;

  padding-top: 40px;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
  background-color: #43477b;
  font-family: "Hanna";
  text-align: center;
  font-size: 70px;
`;

const Box = styled.li`
  position: relative;
  height: 150px;
  width: 100%;

  margin-top: 10px;

  font-weight: 700;
  font-size: 15px;
  color: #5a5a5a;
  background-color: #fff;
`;
const Title = styled.div`
  margin-top: 15px;
  margin-left: 10px;
`;

function Main() {
  return (
    <List>
      <Ad>광고</Ad>
      <Box>
        <Title>개념학습 진도</Title>
        <DounutChart color="#707070" percent={0.89} size="130px" />
      </Box>
      <QuestionCount />
      <Box>
        <Title>오답노트</Title>
      </Box>
    </List>
  );
}

export default Main;
