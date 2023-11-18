import withAuth from "../../../hoc/withAuth";
import useNextContent from "../../../service/useNextContent";
import useQuesryString from "../../../service/useQueryString";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TimelineQuestion from "../../unit/timeline/presenter/TimelineQuestion.presenter";
import Loading from "../../unit/skeleton/LoadingUI";

function TimelineQuestionPage() {
  const { handleNextContent } = useNextContent();
  const { timelineId, title, jjhNumber, contentNumber } = useQuesryString();
  const { data: dateList } = useGetTimelineQuery(timelineId);

  if (!dateList) {
    return (
      <Layout>
        <TitleBox icon="question" category="퀴즈" />
        <MainContentLayout>
          <Loading image="question" />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="TIMELINE_QUESTION" category={title} />
      <MainContentLayout>
        <TimelineQuestion
          dateList={[...dateList].sort(() => Math.random() - 0.5)}
          onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
          id={timelineId}
        />
      </MainContentLayout>
    </Layout>
  );
}
export default withAuth(TimelineQuestionPage);
