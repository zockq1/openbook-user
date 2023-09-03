import { RowList } from "../atoms/List";
import Header from "../organisms/Header";
import NavigationBar from "../organisms/NavigationBar";
import mock from "../../styles/images/mock.svg";
import quiz from "../../styles/images/quiz.svg";
import timeline from "../../styles/images/timeline.svg";
import QuizBox from "../molecules/QuizBox";
import Icon from "../atoms/Icon";

function QuestionPage() {
  return (
    <>
      <Header />
      <RowList>
        <QuizBox
          title="퀴즈"
          link=""
          image={quiz}
          icon={<Icon category="퀴즈" />}
          descriptionTime="무제한"
          descriptionCount="사용자 정의"
          description="주제, 키워드 맞추기"
        ></QuizBox>
        <QuizBox
          title="연표 문제"
          link=""
          image={timeline}
          icon={<Icon category="연표 문제" />}
          descriptionTime="무제한"
          descriptionCount="사용자 정의"
          description="연표 순서 맞추기"
        ></QuizBox>
        <QuizBox
          title="모의고사"
          link=""
          image={mock}
          icon={<Icon category="모의고사" />}
          descriptionTime="30분"
          descriptionCount="20문제"
          description="한능검 기출문제"
        ></QuizBox>
      </RowList>
      <NavigationBar />
    </>
  );
}

export default QuestionPage;
