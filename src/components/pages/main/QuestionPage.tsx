import { RowList } from "../../atoms/layout/List";
import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";
import mock from "../../../styles/images/mock.svg";
import quiz from "../../../styles/images/quiz.svg";
import timeline from "../../../styles/images/timeline.svg";
import QuestionBox from "../../molecules/main-box/QuestionBox";
import Icon from "../../atoms/icon/Icon";
import Layout from "../../atoms/layout/Layout";
import MainPageLayout from "../../atoms/layout/MainPageLayout";

function QuestionPage() {
  return (
    <Layout>
      <MainPageLayout>
        <Header />
        <RowList>
          <QuestionBox
            title="퀴즈"
            link="/question/quiz-list"
            image={quiz}
            icon={<Icon icon="question" size={22} />}
            descriptionTime="무제한"
            descriptionCount="사용자 정의"
            description="주제, 키워드 맞추기"
          ></QuestionBox>
          <QuestionBox
            title="연표 문제"
            link="/question/timeline-list"
            image={timeline}
            icon={<Icon icon="TIMELINE_QUESTION" size={22} />}
            descriptionTime="무제한"
            descriptionCount="사용자 정의"
            description="연표 순서 맞추기"
          ></QuestionBox>
          <QuestionBox
            title="기출문제"
            link="/question/mock-exam-list"
            image={mock}
            icon={<Icon icon="pen" size={22} />}
            descriptionTime="80분"
            descriptionCount="50문제, 모든 단원"
            description="한능검 기출문제"
          ></QuestionBox>
        </RowList>
      </MainPageLayout>
      <NavigationBar />
    </Layout>
  );
}

export default QuestionPage;
