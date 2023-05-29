import QuestionCount from "../../components/QuestionCount";
import List from "../../components/Common/List";
import ListItem from "../../components/Common/ListItem";
import Title from "../../components/Common/Title";
import LinkBox from "../../components/Common/LinkBox";

function QuestionSolvingPage() {
  return (
    <List>
      <QuestionCount />
      <ListItem>
        <LinkBox to={"/question-solving/question"}>
          <Title>추천 문제</Title>
        </LinkBox>
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

export default QuestionSolvingPage;
