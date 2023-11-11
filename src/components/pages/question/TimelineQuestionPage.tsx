import { useNavigate } from "react-router-dom";
import { useGetTimelineQuery } from "../../../store/api/timelineApi";
import useQuesryString from "../../../service/useQueryString";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TimelineQuestion from "../../unit/timeline/presenter/TimelineQuestion.presenter";

function TimelineQuestionPage() {
  const { timelineId, title } = useQuesryString();
  const navigate = useNavigate();
  const { data: dateList } = useGetTimelineQuery(timelineId);

  if (!dateList) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <TitleBox icon="TIMELINE_QUESTION" category={title} />
      <MainContentLayout>
        <TimelineQuestion
          dateList={[...dateList].sort(() => Math.random() - 0.5)}
          onNextContent={() => navigate(-1)}
          id={timelineId}
        />
      </MainContentLayout>
    </Layout>
  );
}

export default TimelineQuestionPage;
