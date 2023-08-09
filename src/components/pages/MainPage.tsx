import styled from "styled-components";
import QuestionCount from "../atoms/QuestionCount";
import DounutChart from "../atoms/DounutChart";
import Header from "../organisms/Header";
import { Link } from "react-router-dom";

const LinkBox = styled(Link)`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
`;

interface ItemProps {
  height?: string;
}

const Title = styled.div`
  margin-top: 15px;
  margin-left: 10px;
`;

const ListItem = styled.li<ItemProps>`
  height: ${(props) => props.height || "100px"};
  position: relative;
  width: 100%;
  margin-top: 10px;
  font-weight: 700;
  font-size: 15px;
  color: #5a5a5a;
  background-color: #fff;
`;

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
    <div>
      <Header />
      <List>
        <Ad>광고</Ad>
        <ListItem height="150px">
          <Title>개념학습 진도</Title>
          <DounutChart color="#707070" percent={0.89} size="130px" />
        </ListItem>
        <QuestionCount />
        <ListItem height="150px">
          <LinkBox to="/jeong-ju-haeng-list">
            <Title>정주행</Title>
          </LinkBox>
        </ListItem>
      </List>
    </div>
  );
}

export default Main;
