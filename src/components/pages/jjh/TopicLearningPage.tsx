import { useNavigate, useParams } from "react-router-dom";
import TopicLearningTemplate from "../../templates/learning/TopicLearningTemplate";
import { useGetTopicQuery } from "../../../store/api/topicApi";
import { useState } from "react";
import { useGetTtoKQuestionQuery } from "../../../store/api/questionApi";
import { useGetContentListQuery } from "../../../store/api/chapterApi";
import QuestionTemplate from "../../templates/question/QuestionTemplate";
import { useUpdateProgressMutation } from "../../../store/api/chapterApi";
import withAuth from "../../../hoc/withAuth";

type SelectedContent = "Learning" | "Question";

function TopicLearningPage() {
  const navigate = useNavigate();
  const { chapter, topic } = useParams();
  const { data: topicInfo, isLoading: isTopicInfoLoading } = useGetTopicQuery(
    String(topic)
  );
  const { data: TtoKQuestionList, isLoading: isTtoKQuestionListLoading } =
    useGetTtoKQuestionQuery(String(topic));
  const { data: contentList, isLoading: isContentListLoading } =
    useGetContentListQuery(Number(chapter));
  const [updateProgres] = useUpdateProgressMutation();
  const [selectedContent, setSelectedContent] =
    useState<SelectedContent>("Learning");

  const handleNextQuestion = () => {
    setSelectedContent("Question");
  };

  if (isContentListLoading || isTopicInfoLoading || isTtoKQuestionListLoading) {
    return <div>Loading...</div>;
  }

  const handleNextContent = () => {
    contentList?.forEach((item, index, arr) => {
      if (item.title === topic) {
        const nextContent = arr[index + 1].content;
        const nextTopic = arr[index + 1].title;
        if (nextContent === "주제 학습") {
          updateProgres({
            content: "주제 학습",
            title: nextTopic,
            state: "Open",
          });
          setSelectedContent("Learning");
          navigate(`/jeong-ju-haeng/${chapter}/topic-learning/${nextTopic}`);
        } else if (nextContent === "단원 마무리 문제") {
          updateProgres({
            content: "단원 마무리 문제",
            title: String(chapter),
            state: "Open",
          });
          navigate(`/jeong-ju-haeng/${chapter}/final-learning/`);
        }
      }
    });
  };

  return (
    <>
      {selectedContent === "Learning" ? (
        topicInfo && (
          <TopicLearningTemplate
            topicTitle={String(topic)}
            topicInfo={topicInfo}
            handleNextContent={handleNextQuestion}
            handleBackPage={() => navigate(`/jeong-ju-haeng/${chapter}`)}
          />
        )
      ) : (
        <QuestionTemplate
          handleBackPage={() => navigate(`/jeong-ju-haeng/${chapter}`)}
          title={topic}
          questionList={TtoKQuestionList || []}
          handleNextContent={handleNextContent}
          category="주제별 문제"
        />
      )}
    </>
  );
}
export default withAuth(TopicLearningPage);
