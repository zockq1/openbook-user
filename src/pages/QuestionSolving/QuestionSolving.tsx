import styled from "styled-components";
import { Link } from "react-router-dom";
import QuestionCount from "../../components/QuestionCount";
import List from "../../components/Common/List";
import ListItem from "../../components/Common/ListItem";
import Title from "../../components/Common/Title";

const QuestionLink = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`;

function QuestionSolving() {
  return (
    <List>
      <QuestionCount />
      <ListItem>
        <QuestionLink to={"/question-solving/question"}>
          <Title>추천 문제</Title>
        </QuestionLink>
      </ListItem>
      <ListItem>
        <Title>모의고사형 문제풀이</Title>
      </ListItem>
      <ListItem>
        <Title>사용자 정의 문제풀이</Title>
      </ListItem>
    </List>
  );
}

export default QuestionSolving;
