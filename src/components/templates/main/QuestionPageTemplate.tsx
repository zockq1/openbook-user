import { RowList } from "../../atoms/layout/List";
import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";
import mock from "../../../styles/images/mock.svg";
import quiz from "../../../styles/images/quiz.svg";
import timeline from "../../../styles/images/timeline.svg";
import QuestionBox from "../../molecules/main-box/QuestionBox";
import Icon from "../../atoms/icon/Icon";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

function QuestionPageTemplate() {
  return (
    <>
      <Header />
      <MainContentLayout>
        <RowList>
          <QuestionBox
            title="퀴즈"
            link="/question/quiz/setting"
            image={quiz}
            icon={<Icon icon="question" />}
            descriptionTime="무제한"
            descriptionCount="사용자 정의"
            description="주제, 키워드 맞추기"
          ></QuestionBox>
          <QuestionBox
            title="연표 문제"
            link="/question/timeline/setting"
            image={timeline}
            icon={<Icon icon="TIMELINE_QUESTION" />}
            descriptionTime="무제한"
            descriptionCount="사용자 정의"
            description="연표 순서 맞추기"
          ></QuestionBox>
          <QuestionBox
            title="모의고사"
            link="/question/mock-exam/setting"
            image={mock}
            icon={<Icon icon="pen" />}
            descriptionTime="30분"
            descriptionCount="20문제, 모든 단원"
            description="한능검 기출문제"
          ></QuestionBox>
        </RowList>
      </MainContentLayout>
      <NavigationBar />
    </>
  );
}

export default QuestionPageTemplate;
