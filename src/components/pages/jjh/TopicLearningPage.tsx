import TopicLearningTemplate from "../../templates/learning/TopicLearningTemplate";
import { useGetTopicQuery } from "../../../store/api/topicApi";
import { useState } from "react";
import { useGetTtoKQuestionQuery } from "../../../store/api/questionApi";
import QuestionTemplate from "../../templates/question/QuestionTemplate";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../service/useQueryString";
import useNextContent from "../../../service/useNextContent";

type SelectedContent = "Learning" | "Question";

function TopicLearningPage() {
  const { topicTitle } = useQuesryString();
  const handleNextContent = useNextContent();
  const { data: topicInfo, isLoading: isTopicInfoLoading } =
    useGetTopicQuery(topicTitle);
  const { data: TtoKQuestionList, isLoading: isTtoKQuestionListLoading } =
    useGetTtoKQuestionQuery(topicTitle, { refetchOnMountOrArgChange: true });
  const [selectedContent, setSelectedContent] =
    useState<SelectedContent>("Learning");

  const handleNextQuestion = () => {
    setSelectedContent("Question");
  };

  if (isTopicInfoLoading || isTtoKQuestionListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {selectedContent === "Learning" ? (
        topicInfo && (
          <TopicLearningTemplate
            topicTitle={topicTitle}
            topicInfo={topicInfo}
            handleNextContent={handleNextQuestion}
          />
        )
      ) : (
        <QuestionTemplate
          title={topicTitle}
          questionList={TtoKQuestionList || []}
          handleNextContent={() => {
            setSelectedContent("Learning");
            handleNextContent();
          }}
        />
      )}
    </>
  );
}
export default withAuth(TopicLearningPage);
