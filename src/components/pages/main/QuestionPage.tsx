import { RowList } from "../../atoms/layout/List";
import Header from "../../unit/ui/Header";
import NavigationBar from "../../unit/ui/NavigationBar";
import mock from "../../../styles/images/mock.svg";
import quiz from "../../../styles/images/quiz.svg";
import timeline from "../../../styles/images/timeline.svg";
import QuestionBox from "../../unit/ui/main-box/QuestionBox";
import Icon from "../../atoms/icon/Icon";
import Layout from "../../atoms/layout/Layout";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import usePreventScroll from "../../../hooks/usePreventScroll";

function QuestionPage() {
  usePreventScroll();

  return (
    <Layout>
      <Header />
      <MainPageLayout>
        <RowList>
          <QuestionBox
            title="퀴즈"
            link="/question/quiz-list"
            image={quiz}
            icon={<Icon icon="question" size={22} />}
          ></QuestionBox>
          <QuestionBox
            title="연표 문제"
            link="/question/timeline-list"
            image={timeline}
            icon={<Icon icon="TIMELINE_QUESTION" size={22} />}
          ></QuestionBox>
          <QuestionBox
            title="기출문제"
            link="/question/mock-exam-list"
            image={mock}
            icon={<Icon icon="pen" size={22} />}
          ></QuestionBox>
        </RowList>
      </MainPageLayout>
      <NavigationBar />
    </Layout>
  );
}

export default QuestionPage;
