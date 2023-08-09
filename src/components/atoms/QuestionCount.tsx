import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styled from "styled-components";

const Text = styled.div`
  position: absolute;
  bottom: 20px;
  right: 40%;
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

const SolvedCountRate = styled.div`
  position: absolute;
  bottom: 20px;
  right: 50%;
  font-size: 60px;
  font-weight: 800;
`;

const WrongCount = styled.div`
  position: absolute;
  top: 110px;
  right: 10%;
  font-size: 20px;
`;

const CorrectCount = styled.div`
  position: absolute;
  top: 80px;
  right: 10%;
  font-size: 20px;
`;

function QuestionCount() {
  const { solved, wrong, correct } = useSelector(
    (state: RootState) => state.quiz
  );
  return (
    <ListItem height="150px">
      <Title>푼 문제 수</Title>
      <SolvedCountRate>{solved}</SolvedCountRate>
      <Text>문제</Text>
      <CorrectCount>정답 : {correct}</CorrectCount>
      <WrongCount>오답 : {wrong}</WrongCount>
    </ListItem>
  );
}

export default QuestionCount;
