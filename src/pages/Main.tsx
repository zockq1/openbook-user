import styled from "styled-components";
import QuestionCount from "../components/QuestionCount";
import DounutChart from "../components/DounutChart";
import List from "../components/Common/List";
import ListItem from "../components/Common/ListItem";
import Title from "../components/Common/Title";

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

function Main() {
  return (
    <List>
      <Ad>광고</Ad>
      <ListItem height="150px">
        <Title>개념학습 진도</Title>
        <DounutChart color="#707070" percent={0.89} size="130px" />
      </ListItem>
      <QuestionCount />
      <ListItem height="150px">
        <Title>오답노트</Title>
      </ListItem>
    </List>
  );
}

export default Main;
