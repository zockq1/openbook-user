import { RowList } from "../../atoms/List";
import Header from "../../organisms/Header";
import NavigationBar from "../../organisms/NavigationBar";
import mock from "../../../styles/images/mock.svg";
import quiz from "../../../styles/images/quiz.svg";
import timeline from "../../../styles/images/timeline.svg";
import QuestionBox from "../../molecules/QuestionBox";
import Icon from "../../atoms/Icon";

function QuestionPageTemplate() {
  return (
    <>
      <Header />
      <RowList>
        <QuestionBox
          title="퀴즈"
          link="/question/quiz"
          image={quiz}
          icon={<Icon category="퀴즈" />}
          descriptionTime="무제한"
          descriptionCount="사용자 정의"
          description="주제, 키워드 맞추기"
        ></QuestionBox>
        <QuestionBox
          title="연표 문제"
          link="/question/timeline"
          image={timeline}
          icon={<Icon category="연표 문제" />}
          descriptionTime="무제한"
          descriptionCount="사용자 정의"
          description="연표 순서 맞추기"
        ></QuestionBox>
        <QuestionBox
          title="모의고사"
          link="/question/mock-exam"
          image={mock}
          icon={<Icon category="모의고사" />}
          descriptionTime="30분"
          descriptionCount="20문제, 모든 단원"
          description="한능검 기출문제"
        ></QuestionBox>
      </RowList>
      <NavigationBar />
    </>
  );
}

export default QuestionPageTemplate;
