import styled from "styled-components";
import { Link } from "react-router-dom";
import QuestionCount from "../../components/QuestionCount";
import List from "../../styles/Common/ListStyle";

const Title = styled.div`
  margin-top: 15px;
  margin-left: 10px;
`;

const RecommendedQuestion = styled.div`
  position: relative;
  height: 100px;
  width: 100%;

  margin-top: 10px;

  font-weight: 700;
  font-size: 15px;
  color: #5a5a5a;
  background-color: #fff;
`;
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
      <RecommendedQuestion>
        <QuestionLink to={"/question-solving/question"}>
          <Title>추천 문제</Title>
        </QuestionLink>
      </RecommendedQuestion>
      <RecommendedQuestion>
        <Title>모의고사형 문제풀이</Title>
      </RecommendedQuestion>
      <RecommendedQuestion>
        <Title>사용자 정의 문제풀이</Title>
      </RecommendedQuestion>
    </List>
  );
}

export default QuestionSolving;
